#!/usr/bin/env node

/**
 * Shipping Cost Calculator MCP Server
 *
 * This MCP server provides shipping cost calculation tools with access to:
 * - Rate tables (JSON)
 * - Shipping rules (JSON)
 * - Shipping cost calculation with external data
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory path
const DATA_DIR = path.join(__dirname, "..", "data");

// Type definitions
interface DistanceBracket {
  minDistance: number;
  maxDistance: number;
  baseRate: number;
  description: string;
}

interface ServiceTier {
  multiplier: number;
  description: string;
  deliveryEstimate: string;
  features: string[];
}

interface RateTables {
  version: string;
  effectiveDate: string;
  distanceBrackets: DistanceBracket[];
  serviceTiers: {
    [key: string]: ServiceTier;
  };
  minimumWeight: number;
  maximumWeight: number;
  baseHandlingFee: number;
}

// Cache for rate tables and shipping rules
let rateTables: RateTables | null = null;
let shippingRules: any = null;

/**
 * Load rate tables from JSON file
 */
async function loadRateTables(): Promise<RateTables> {
  if (rateTables) return rateTables;

  const filePath = path.join(DATA_DIR, "rate-tables.json");
  const content = await fs.readFile(filePath, "utf-8");
  rateTables = JSON.parse(content);
  return rateTables!;
}

/**
 * Load shipping rules from JSON file
 */
async function loadShippingRules(): Promise<any> {
  if (shippingRules) return shippingRules;

  const filePath = path.join(DATA_DIR, "shipping-rules.json");
  const content = await fs.readFile(filePath, "utf-8");
  shippingRules = JSON.parse(content);
  return shippingRules;
}

/**
 * Calculate shipping cost based on weight, distance, and service tier
 */
function calculateShippingCost(
  weight: number,
  distance: number,
  serviceTier: string,
  rateTables: RateTables
): {
  totalCost: number;
  shippingCost: number;
  baseRate: number;
  tierMultiplier: number;
  adjustedRate: number;
  handlingFee: number;
  deliveryEstimate: string;
} {
  // Find distance bracket
  const bracket = rateTables.distanceBrackets.find(
    (b) => distance >= b.minDistance && distance <= b.maxDistance
  );

  if (!bracket) {
    throw new Error(`Distance ${distance} is outside acceptable range`);
  }

  // Get service tier multiplier
  const tierKey = serviceTier.toLowerCase();
  const tierInfo = rateTables.serviceTiers[tierKey];

  if (!tierInfo) {
    throw new Error(
      `Invalid service tier: ${serviceTier}. Must be one of: ${Object.keys(
        rateTables.serviceTiers
      ).join(", ")}`
    );
  }

  // Calculate shipping cost
  const distanceUnits = distance / 100;
  const baseRate = bracket.baseRate;
  const tierMultiplier = tierInfo.multiplier;
  const adjustedRate = baseRate * tierMultiplier;
  const shippingCost = weight * distanceUnits * adjustedRate;
  const handlingFee = rateTables.baseHandlingFee;
  const totalCost = shippingCost + handlingFee;

  return {
    totalCost,
    shippingCost,
    baseRate,
    tierMultiplier,
    adjustedRate,
    handlingFee,
    deliveryEstimate: tierInfo.deliveryEstimate,
  };
}

/**
 * Get shipping recommendation based on package characteristics
 */
function getShippingRecommendation(
  weight: number,
  packageCharacteristics: {
    fragility?: string;
    perishability?: string;
    size?: string;
    hazmat?: string;
    destination?: string;
  },
  rules: any
): {
  recommendedTier: string;
  totalSurcharges: number;
  requirements: string[];
  notes: string[];
} {
  const notes: string[] = [];
  let recommendedTier = "standard";
  let totalSurcharges = 0;
  let requirements: string[] = [];

  // Check weight tier
  if (weight > 100) {
    const tier = rules.weightTiers.very_heavy;
    totalSurcharges += tier.surcharge || 0;
    notes.push(tier.description);
    if (tier.requirements) {
      requirements.push(...tier.requirements);
    }
  } else if (weight > 50) {
    const tier = rules.weightTiers.heavy;
    totalSurcharges += tier.surcharge || 0;
    notes.push(tier.description);
  }

  // Check fragility
  if (packageCharacteristics.fragility === "fragile") {
    const fragile = rules.packageCharacteristics.fragility.fragile;
    totalSurcharges += fragile.surcharge;
    notes.push(fragile.description);
    if (fragile.tierRecommendation !== "any") {
      recommendedTier = "standard";
      notes.push("Standard or Express tier recommended for fragile items");
    }
    if (fragile.requirements) {
      requirements.push(...fragile.requirements);
    }
  }

  // Check perishability
  if (packageCharacteristics.perishability === "perishable") {
    const perishable = rules.packageCharacteristics.perishability.perishable;
    totalSurcharges += perishable.surcharge;
    recommendedTier = "express";
    notes.push(perishable.description);
    notes.push("Express shipping REQUIRED for perishable items");
    if (perishable.requirements) {
      requirements.push(...perishable.requirements);
    }
  }

  // Check size
  if (packageCharacteristics.size === "oversized") {
    const oversized = rules.packageCharacteristics.size.oversized;
    totalSurcharges += oversized.surcharge;
    notes.push(oversized.description);
  }

  // Check hazmat
  if (packageCharacteristics.hazmat && packageCharacteristics.hazmat !== "none") {
    const hazmatType = rules.packageCharacteristics.hazmat[packageCharacteristics.hazmat];
    if (hazmatType) {
      totalSurcharges += hazmatType.surcharge;
      recommendedTier = "economy";  // Ground only
      notes.push(hazmatType.description);
      notes.push("Ground transportation ONLY for hazardous materials");
      if (hazmatType.requirements) {
        requirements.push(...hazmatType.requirements);
      }
    }
  }

  // Check destination
  if (packageCharacteristics.destination) {
    const dest = rules.destinationFactors[packageCharacteristics.destination];
    if (dest) {
      totalSurcharges += dest.surcharge || 0;
      notes.push(dest.description);
      if (dest.restrictions) {
        requirements.push(...dest.restrictions);
      }
    }
  }

  return {
    recommendedTier,
    totalSurcharges,
    requirements,
    notes,
  };
}

// Create MCP server
const server = new Server(
  {
    name: "shipping-calculator",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "file:///rate-tables",
        mimeType: "application/json",
        name: "Rate Tables",
        description: "Shipping rate tables with distance brackets and service tier multipliers",
      },
      {
        uri: "file:///shipping-rules",
        mimeType: "application/json",
        name: "Shipping Rules",
        description: "Complete shipping rules including package characteristics and surcharges",
      },
    ],
  };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "file:///rate-tables") {
    const tables = await loadRateTables();
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(tables, null, 2),
        },
      ],
    };
  }

  if (uri === "file:///shipping-rules") {
    const rules = await loadShippingRules();
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(rules, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "calculate_shipping_cost",
        description: "Calculate shipping cost using current rate tables and service tiers",
        inputSchema: {
          type: "object",
          properties: {
            weight: {
              type: "number",
              description: "Package weight in pounds (1-150 lbs)",
              minimum: 1,
              maximum: 150,
            },
            distance: {
              type: "number",
              description: "Shipping distance in miles (minimum 1)",
              minimum: 1,
            },
            serviceTier: {
              type: "string",
              description: "Service tier: economy, standard, or express",
              enum: ["economy", "standard", "express"],
            },
          },
          required: ["weight", "distance", "serviceTier"],
        },
      },
      {
        name: "get_shipping_recommendation",
        description: "Get shipping recommendations and surcharges based on package characteristics",
        inputSchema: {
          type: "object",
          properties: {
            weight: {
              type: "number",
              description: "Package weight in pounds",
            },
            packageCharacteristics: {
              type: "object",
              description: "Package characteristics for assessment",
              properties: {
                fragility: {
                  type: "string",
                  enum: ["fragile", "standard", "robust"],
                  description: "Package fragility level",
                },
                perishability: {
                  type: "string",
                  enum: ["perishable", "non_perishable"],
                  description: "Whether package contains perishable items",
                },
                size: {
                  type: "string",
                  enum: ["standard", "oversized"],
                  description: "Package size classification",
                },
                hazmat: {
                  type: "string",
                  enum: ["none", "flammable", "corrosive"],
                  description: "Hazardous materials classification",
                },
                destination: {
                  type: "string",
                  enum: ["commercial", "residential", "rural", "po_box"],
                  description: "Destination type",
                },
              },
            },
          },
          required: ["weight", "packageCharacteristics"],
        },
      },
      {
        name: "get_rate_table_info",
        description: "Get information about current rate tables including version and effective date",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "calculate_shipping_cost") {
      const { weight, distance, serviceTier } = args as {
        weight: number;
        distance: number;
        serviceTier: string;
      };

      const tables = await loadRateTables();

      // Validate inputs
      if (weight < tables.minimumWeight || weight > tables.maximumWeight) {
        throw new Error(`Weight must be between ${tables.minimumWeight} and ${tables.maximumWeight} lbs`);
      }

      if (distance < 1) {
        throw new Error("Distance must be at least 1 mile");
      }

      const result = calculateShippingCost(weight, distance, serviceTier, tables);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                input: { weight, distance, serviceTier },
                result: {
                  totalCost: result.totalCost.toFixed(2),
                  shippingCost: result.shippingCost.toFixed(2),
                  handlingFee: result.handlingFee.toFixed(2),
                  baseRate: result.baseRate,
                  tierMultiplier: result.tierMultiplier,
                  adjustedRate: result.adjustedRate,
                  deliveryEstimate: result.deliveryEstimate,
                },
                rateTableVersion: tables.version,
                effectiveDate: tables.effectiveDate,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (name === "get_shipping_recommendation") {
      const { weight, packageCharacteristics } = args as {
        weight: number;
        packageCharacteristics: any;
      };

      const rules = await loadShippingRules();
      const recommendation = getShippingRecommendation(
        weight,
        packageCharacteristics,
        rules
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                input: { weight, packageCharacteristics },
                recommendation,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (name === "get_rate_table_info") {
      const tables = await loadRateTables();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                version: tables.version,
                effectiveDate: tables.effectiveDate,
                distanceBrackets: tables.distanceBrackets.length,
                serviceTiers: Object.keys(tables.serviceTiers),
                weightRange: {
                  minimum: tables.minimumWeight,
                  maximum: tables.maximumWeight,
                },
                baseHandlingFee: tables.baseHandlingFee,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
            },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Shipping Cost Calculator MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
