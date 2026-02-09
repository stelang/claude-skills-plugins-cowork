#!/usr/bin/env node

/**
 * Premium Calculator MCP Server
 *
 * This MCP server provides insurance premium calculation tools with access to:
 * - Rate tables (JSON)
 * - Underwriting guidelines (JSON)
 * - Premium calculation with external data
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
interface AgeBracket {
  minAge: number;
  maxAge: number;
  baseRate: number;
  description: string;
}

interface HealthClass {
  multiplier: number;
  description: string;
  requirements: string[];
}

interface RateTables {
  version: string;
  effectiveDate: string;
  ageBrackets: AgeBracket[];
  healthClasses: {
    [key: string]: HealthClass;
  };
  minimumCoverage: number;
  maximumCoverage: number;
}

// Cache for rate tables and guidelines
let rateTables: RateTables | null = null;
let underwritingGuidelines: any = null;

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
 * Load underwriting guidelines from JSON file
 */
async function loadUnderwritingGuidelines(): Promise<any> {
  if (underwritingGuidelines) return underwritingGuidelines;

  const filePath = path.join(DATA_DIR, "underwriting-guidelines.json");
  const content = await fs.readFile(filePath, "utf-8");
  underwritingGuidelines = JSON.parse(content);
  return underwritingGuidelines;
}

/**
 * Calculate premium based on age, coverage, and health class
 */
function calculatePremium(
  age: number,
  coverage: number,
  healthClass: string,
  rateTables: RateTables
): {
  monthlyPremium: number;
  annualPremium: number;
  baseRate: number;
  healthMultiplier: number;
  adjustedRate: number;
} {
  // Find age bracket
  const bracket = rateTables.ageBrackets.find(
    (b) => age >= b.minAge && age <= b.maxAge
  );

  if (!bracket) {
    throw new Error(`Age ${age} is outside acceptable range (18-80)`);
  }

  // Get health class multiplier
  const healthClassKey = healthClass.toLowerCase();
  const healthInfo = rateTables.healthClasses[healthClassKey];

  if (!healthInfo) {
    throw new Error(
      `Invalid health class: ${healthClass}. Must be one of: ${Object.keys(
        rateTables.healthClasses
      ).join(", ")}`
    );
  }

  // Calculate premium
  const coverageInThousands = coverage / 1000;
  const baseRate = bracket.baseRate;
  const healthMultiplier = healthInfo.multiplier;
  const adjustedRate = baseRate * healthMultiplier;
  const monthlyPremium = coverageInThousands * adjustedRate;
  const annualPremium = monthlyPremium * 12;

  return {
    monthlyPremium,
    annualPremium,
    baseRate,
    healthMultiplier,
    adjustedRate,
  };
}

/**
 * Get underwriting recommendation based on risk factors
 */
function getUnderwritingRecommendation(
  age: number,
  coverage: number,
  riskFactors: {
    smoker?: string;
    bmi?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    occupation?: string;
    hobbies?: string[];
  },
  guidelines: any
): {
  recommendedClass: string;
  requiredTests: string[];
  additionalAdjustments: number;
  notes: string[];
} {
  const notes: string[] = [];
  let recommendedClass = "standard";
  let additionalAdjustments = 1.0;
  let requiredTests: string[] = [];

  // Determine coverage-based requirements
  if (coverage < 500000) {
    requiredTests = guidelines.coverageSpecificRules.under_500k.requiredTests || [];
  } else if (coverage <= 1000000) {
    requiredTests = guidelines.coverageSpecificRules["500k_to_1m"].requiredTests;
  } else if (coverage <= 3000000) {
    requiredTests = guidelines.coverageSpecificRules["1m_to_3m"].requiredTests;
  } else {
    requiredTests = guidelines.coverageSpecificRules.over_3m.requiredTests;
  }

  // Check smoking status
  if (riskFactors.smoker === "current") {
    recommendedClass = "substandard";
    notes.push("Current smoker - substandard classification required");
  } else if (riskFactors.smoker === "former_recent") {
    notes.push("Recent former smoker - may qualify for standard");
  } else if (riskFactors.smoker === "former_longterm") {
    notes.push("Long-term non-smoker - preferred class eligible");
  }

  // Check BMI
  if (riskFactors.bmi) {
    if (riskFactors.bmi >= 40) {
      recommendedClass = "substandard";
      additionalAdjustments *= 1.25;
      notes.push("BMI over 40 - substandard with additional surcharge");
    } else if (riskFactors.bmi >= 35) {
      if (recommendedClass !== "substandard") {
        recommendedClass = "substandard";
      }
      notes.push("BMI 35-40 - substandard classification");
    } else if (riskFactors.bmi >= 30) {
      notes.push("BMI 30-35 - standard classification");
    } else if (riskFactors.bmi >= 18.5 && riskFactors.bmi < 25) {
      notes.push("Normal BMI - preferred class eligible");
    }
  }

  // Check blood pressure
  if (riskFactors.bloodPressure) {
    const { systolic, diastolic } = riskFactors.bloodPressure;
    if (systolic >= 140 || diastolic >= 90) {
      recommendedClass = "substandard";
      notes.push("Stage 2 hypertension - substandard classification");
    } else if (systolic >= 130 || diastolic >= 80) {
      notes.push("Stage 1 hypertension - standard classification");
    }
  }

  // Check occupation
  if (riskFactors.occupation) {
    const occLower = riskFactors.occupation.toLowerCase();
    for (const [risk, info] of Object.entries(guidelines.occupationRatings)) {
      if ((info as any).examples.some((ex: string) => occLower.includes(ex.toLowerCase()))) {
        additionalAdjustments *= (info as any).adjustment;
        if ((info as any).adjustment > 1.0) {
          notes.push(`${risk.replace('_', ' ')} occupation - ${((info as any).adjustment - 1) * 100}% surcharge`);
        }
      }
    }
  }

  // Check hobbies
  if (riskFactors.hobbies && riskFactors.hobbies.length > 0) {
    for (const hobby of riskFactors.hobbies) {
      const hobbyLower = hobby.toLowerCase();
      if (guidelines.hobbies.extreme_sports.examples.some((ex: string) => hobbyLower.includes(ex.toLowerCase()))) {
        additionalAdjustments *= guidelines.hobbies.extreme_sports.adjustment;
        notes.push(`Extreme sports hobby - ${(guidelines.hobbies.extreme_sports.adjustment - 1) * 100}% surcharge`);
      }
    }
  }

  return {
    recommendedClass,
    requiredTests,
    additionalAdjustments,
    notes,
  };
}

// Create MCP server
const server = new Server(
  {
    name: "premium-calculator",
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
        description: "Insurance premium rate tables with age brackets and health class multipliers",
      },
      {
        uri: "file:///underwriting-guidelines",
        mimeType: "application/json",
        name: "Underwriting Guidelines",
        description: "Complete underwriting guidelines including risk factors and requirements",
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

  if (uri === "file:///underwriting-guidelines") {
    const guidelines = await loadUnderwritingGuidelines();
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(guidelines, null, 2),
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
        name: "calculate_premium",
        description: "Calculate insurance premium using current rate tables and health classifications",
        inputSchema: {
          type: "object",
          properties: {
            age: {
              type: "number",
              description: "Applicant age (18-80)",
              minimum: 18,
              maximum: 80,
            },
            coverage: {
              type: "number",
              description: "Coverage amount in dollars (minimum $50,000)",
              minimum: 50000,
            },
            healthClass: {
              type: "string",
              description: "Health classification: preferred, standard, or substandard",
              enum: ["preferred", "standard", "substandard"],
            },
          },
          required: ["age", "coverage", "healthClass"],
        },
      },
      {
        name: "get_underwriting_recommendation",
        description: "Get underwriting recommendation and required tests based on risk factors",
        inputSchema: {
          type: "object",
          properties: {
            age: {
              type: "number",
              description: "Applicant age",
            },
            coverage: {
              type: "number",
              description: "Coverage amount in dollars",
            },
            riskFactors: {
              type: "object",
              description: "Risk factors for underwriting assessment",
              properties: {
                smoker: {
                  type: "string",
                  enum: ["current", "former_recent", "former_longterm", "never"],
                  description: "Smoking status",
                },
                bmi: {
                  type: "number",
                  description: "Body Mass Index",
                },
                bloodPressure: {
                  type: "object",
                  properties: {
                    systolic: { type: "number" },
                    diastolic: { type: "number" },
                  },
                },
                occupation: {
                  type: "string",
                  description: "Current occupation",
                },
                hobbies: {
                  type: "array",
                  items: { type: "string" },
                  description: "List of hobbies/activities",
                },
              },
            },
          },
          required: ["age", "coverage", "riskFactors"],
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
    if (name === "calculate_premium") {
      const { age, coverage, healthClass } = args as {
        age: number;
        coverage: number;
        healthClass: string;
      };

      const tables = await loadRateTables();

      // Validate inputs
      if (age < 18 || age > 80) {
        throw new Error("Age must be between 18 and 80");
      }

      if (coverage < tables.minimumCoverage) {
        throw new Error(`Coverage must be at least $${tables.minimumCoverage.toLocaleString()}`);
      }

      if (coverage > tables.maximumCoverage) {
        throw new Error(`Coverage cannot exceed $${tables.maximumCoverage.toLocaleString()}`);
      }

      const result = calculatePremium(age, coverage, healthClass, tables);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                input: { age, coverage, healthClass },
                result: {
                  monthlyPremium: result.monthlyPremium.toFixed(2),
                  annualPremium: result.annualPremium.toFixed(2),
                  baseRate: result.baseRate,
                  healthMultiplier: result.healthMultiplier,
                  adjustedRate: result.adjustedRate,
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

    if (name === "get_underwriting_recommendation") {
      const { age, coverage, riskFactors } = args as {
        age: number;
        coverage: number;
        riskFactors: any;
      };

      const guidelines = await loadUnderwritingGuidelines();
      const recommendation = getUnderwritingRecommendation(
        age,
        coverage,
        riskFactors,
        guidelines
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                input: { age, coverage, riskFactors },
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
                ageBrackets: tables.ageBrackets.length,
                healthClasses: Object.keys(tables.healthClasses),
                coverageRange: {
                  minimum: tables.minimumCoverage,
                  maximum: tables.maximumCoverage,
                },
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
  console.error("Premium Calculator MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
