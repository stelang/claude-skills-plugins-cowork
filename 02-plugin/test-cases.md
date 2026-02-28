# Shipping Calculator MCP Plugin - Test Cases

This document provides comprehensive test cases for the Shipping Calculator MCP Plugin.

## Prerequisites

Before testing, ensure:
- [x] Plugin is built (`npm run build` completed)
- [x] Configuration file updated with correct absolute path
- [ ] Claude Code/Desktop restarted to load MCP server
- [ ] MCP server appears in list of available servers

## Test Suite

### 1. Configuration & Setup Tests

#### Test 1.1: Verify MCP Server is Loaded
**Prompt:**
```
List available MCP servers
```

**Expected Result:**
- `shipping-calculator` appears in the list
- Server shows as active/running

---

### 2. Rate Table Info Tests

#### Test 2.1: Get Rate Table Information
**Prompt:**
```
Use the shipping-calculator MCP server to show me information about the current rate tables
```

**Expected Result:**
```json
{
  "success": true,
  "version": "2026-Q1",
  "effectiveDate": "2026-01-01",
  "distanceBrackets": 6,
  "serviceTiers": ["economy", "standard", "express"],
  "weightRange": {
    "minimum": 1,
    "maximum": 150
  },
  "baseHandlingFee": 5.00
}
```

---

### 3. Basic Shipping Cost Calculation Tests

#### Test 3.1: Local Delivery (Economy)
**Prompt:**
```
Calculate shipping cost using the shipping-calculator MCP server for:
- Weight: 10 lbs
- Distance: 50 miles
- Service Tier: economy
```

**Expected Result:**
- Distance bracket: 1-100 miles (baseRate: $0.50)
- Economy multiplier: 0.80
- Shipping cost: 10 lbs × (50/100) × 0.50 × 0.80 = $2.00
- Total cost: $2.00 + $5.00 handling = $7.00
- Delivery estimate: "7-10 business days"

#### Test 3.2: Regional Delivery (Standard)
**Prompt:**
```
Calculate shipping cost using the shipping-calculator for:
- Weight: 25 lbs
- Distance: 200 miles
- Service Tier: standard
```

**Expected Result:**
- Distance bracket: 101-300 miles (baseRate: $0.75)
- Standard multiplier: 1.0
- Shipping cost: 25 × (200/100) × 0.75 × 1.0 = $37.50
- Total cost: $37.50 + $5.00 = $42.50
- Delivery estimate: "3-5 business days"

#### Test 3.3: Long Distance (Express)
**Prompt:**
```
Calculate shipping cost using the shipping-calculator for:
- Weight: 15 lbs
- Distance: 1500 miles
- Service Tier: express
```

**Expected Result:**
- Distance bracket: 1001-2000 miles (baseRate: $1.75)
- Express multiplier: 1.50
- Shipping cost: 15 × (1500/100) × 1.75 × 1.50 = $590.625
- Total cost: ~$595.63
- Delivery estimate: "1-2 business days"

#### Test 3.4: Maximum Distance (Coast-to-Coast)
**Prompt:**
```
Calculate shipping cost for:
- Weight: 50 lbs
- Distance: 3000 miles
- Service Tier: standard
```

**Expected Result:**
- Distance bracket: 2001-5000 miles (baseRate: $2.25)
- Standard multiplier: 1.0
- Shipping cost: 50 × (3000/100) × 2.25 × 1.0 = $3,375
- Total cost: $3,380

---

### 4. Shipping Recommendation Tests

#### Test 4.1: Fragile Package
**Prompt:**
```
Get shipping recommendation using the shipping-calculator for:
- Weight: 20 lbs
- Package Characteristics:
  - Fragility: fragile
  - Perishability: non_perishable
  - Size: standard
  - Hazmat: none
  - Destination: commercial
```

**Expected Result:**
- Recommended tier: "standard" or better
- Surcharge: $15.00 (fragile)
- Requirements: ["Extra padding required", "Fragile stickers on all sides", ...]
- Notes about fragile handling

#### Test 4.2: Perishable Package (Express Required)
**Prompt:**
```
Get shipping recommendation for:
- Weight: 30 lbs
- Package Characteristics:
  - Fragility: standard
  - Perishability: perishable
  - Size: standard
  - Hazmat: none
  - Destination: residential
```

**Expected Result:**
- Recommended tier: "express" (REQUIRED)
- Surcharges: $25.00 (perishable) + $5.00 (residential) = $30.00
- Requirements: ["Express shipping required", "Temperature-controlled packaging", "Delivery within 48 hours mandatory"]
- Note: "Express shipping REQUIRED for perishable items"

#### Test 4.3: Heavy Package
**Prompt:**
```
Get shipping recommendation for:
- Weight: 75 lbs
- Package Characteristics:
  - Fragility: standard
  - Perishability: non_perishable
  - Size: standard
  - Hazmat: none
  - Destination: residential
```

**Expected Result:**
- Recommended tier: any
- Surcharges: $10.00 (heavy weight) + $5.00 (residential) = $15.00
- Notes: "Heavy packages, may require team lift"

#### Test 4.4: Very Heavy Package
**Prompt:**
```
Get shipping recommendation for:
- Weight: 120 lbs
- Package Characteristics:
  - Fragility: robust
  - Perishability: non_perishable
  - Size: standard
  - Hazmat: none
  - Destination: commercial
```

**Expected Result:**
- Recommended tier: any
- Surcharge: $25.00 (very heavy)
- Requirements: ["Team lift required", "Delivery to threshold only", "Commercial address preferred"]

#### Test 4.5: Hazardous Materials (Flammable)
**Prompt:**
```
Get shipping recommendation for:
- Weight: 40 lbs
- Package Characteristics:
  - Fragility: standard
  - Perishability: non_perishable
  - Size: standard
  - Hazmat: flammable
  - Destination: commercial
```

**Expected Result:**
- Recommended tier: "economy" (ground only)
- Surcharge: $75.00 (hazmat)
- Requirements: ["Special permits required", "Ground transportation only", "Hazmat certification needed", "Additional insurance mandatory"]
- Note: "Ground transportation ONLY for hazardous materials"

#### Test 4.6: Rural Delivery
**Prompt:**
```
Get shipping recommendation for:
- Weight: 15 lbs
- Package Characteristics:
  - Fragility: standard
  - Perishability: non_perishable
  - Size: standard
  - Hazmat: none
  - Destination: rural
```

**Expected Result:**
- Surcharge: $20.00 (rural)
- Notes: "Remote or rural delivery address"
- Delivery time adjustment: "+2-3 business days"

#### Test 4.7: PO Box Delivery
**Prompt:**
```
Get shipping recommendation for:
- Weight: 10 lbs
- Package Characteristics:
  - Fragility: standard
  - Perishability: non_perishable
  - Size: standard
  - Hazmat: none
  - Destination: po_box
```

**Expected Result:**
- Recommended tier: "economy_or_standard"
- Restrictions: ["Express shipping not available", "Size restrictions apply"]

#### Test 4.8: Oversized Package
**Prompt:**
```
Get shipping recommendation for:
- Weight: 45 lbs
- Package Characteristics:
  - Fragility: standard
  - Perishability: non_perishable
  - Size: oversized
  - Hazmat: none
  - Destination: commercial
```

**Expected Result:**
- Surcharge: $50.00 (oversized)
- Notes about special handling for large items

#### Test 4.9: Complex Multi-Factor Package
**Prompt:**
```
Get shipping recommendation for:
- Weight: 85 lbs
- Package Characteristics:
  - Fragility: fragile
  - Perishability: non_perishable
  - Size: oversized
  - Hazmat: none
  - Destination: rural
```

**Expected Result:**
- Recommended tier: "standard" (due to fragile)
- Total surcharges: $15.00 (fragile) + $10.00 (heavy) + $50.00 (oversized) + $20.00 (rural) = $95.00
- Combined requirements from all factors
- Multiple notes about handling

---

### 5. Edge Case & Error Handling Tests

#### Test 5.1: Weight Below Minimum
**Prompt:**
```
Calculate shipping cost for:
- Weight: 0.5 lbs
- Distance: 100 miles
- Service Tier: standard
```

**Expected Result:**
- Error: "Weight must be between 1 and 150 lbs"

#### Test 5.2: Weight Above Maximum
**Prompt:**
```
Calculate shipping cost for:
- Weight: 200 lbs
- Distance: 500 miles
- Service Tier: standard
```

**Expected Result:**
- Error: "Weight must be between 1 and 150 lbs"

#### Test 5.3: Invalid Service Tier
**Prompt:**
```
Calculate shipping cost for:
- Weight: 20 lbs
- Distance: 300 miles
- Service Tier: premium
```

**Expected Result:**
- Error: "Invalid service tier: premium. Must be one of: economy, standard, express"

#### Test 5.4: Zero Distance
**Prompt:**
```
Calculate shipping cost for:
- Weight: 20 lbs
- Distance: 0 miles
- Service Tier: standard
```

**Expected Result:**
- Error: "Distance must be at least 1 mile"

#### Test 5.5: Distance Beyond Maximum Bracket
**Prompt:**
```
Calculate shipping cost for:
- Weight: 20 lbs
- Distance: 6000 miles
- Service Tier: standard
```

**Expected Result:**
- Error: "Distance 6000 is outside acceptable range"

#### Test 5.6: Minimum Valid Weight
**Prompt:**
```
Calculate shipping cost for:
- Weight: 1 lb
- Distance: 100 miles
- Service Tier: economy
```

**Expected Result:**
- Success with calculated cost

#### Test 5.7: Maximum Valid Weight
**Prompt:**
```
Calculate shipping cost for:
- Weight: 150 lbs
- Distance: 100 miles
- Service Tier: standard
```

**Expected Result:**
- Success with calculated cost
- Should include very heavy weight surcharge

---

### 6. Resource Access Tests

#### Test 6.1: Read Rate Tables Resource
**Prompt:**
```
Read the rate-tables resource from the shipping-calculator MCP server and show me the distance brackets
```

**Expected Result:**
- Complete JSON structure of rate tables
- 6 distance brackets visible
- All service tier details
- Version: "2026-Q1"

#### Test 6.2: Read Shipping Rules Resource
**Prompt:**
```
Read the shipping-rules resource from the shipping-calculator and explain the hazmat requirements
```

**Expected Result:**
- Complete shipping rules JSON
- Hazmat section showing flammable and corrosive options
- Requirements clearly listed

#### Test 6.3: Analyze Rate Progression
**Prompt:**
```
Read the rate-tables resource and analyze how the base rates change across distance brackets
```

**Expected Result:**
- Claude should analyze and explain:
  - Local (1-100 mi): $0.50
  - Regional (101-300 mi): $0.75 (+50%)
  - Inter-regional (301-600 mi): $1.00 (+33%)
  - Long-distance (601-1000 mi): $1.35 (+35%)
  - Cross-country (1001-2000 mi): $1.75 (+30%)
  - Coast-to-coast (2001-5000 mi): $2.25 (+29%)

---

### 7. Integration & Real-World Scenarios

#### Test 7.1: Complete Quote Calculation
**Prompt:**
```
I need to ship a 60 lb fragile package 800 miles to a residential address. First get a recommendation, then calculate the total cost using standard shipping.
```

**Expected Steps:**
1. Get recommendation: fragile ($15) + heavy ($10) + residential ($5) = $30 surcharges
2. Calculate shipping: 60 lbs × (800/100) × $1.35 × 1.0 = $648
3. Total: $648 + $5 (handling) + $30 (surcharges) = $683

#### Test 7.2: Compare Service Tiers
**Prompt:**
```
Compare the cost of shipping a 30 lb package 1200 miles using all three service tiers (economy, standard, express)
```

**Expected Result:**
- Economy: 30 × (1200/100) × $1.75 × 0.80 = $504 + $5 = $509
- Standard: 30 × (1200/100) × $1.75 × 1.0 = $630 + $5 = $635
- Express: 30 × (1200/100) × $1.75 × 1.50 = $945 + $5 = $950
- Claude should present comparison with delivery estimates

#### Test 7.3: Perishable Rush Shipment
**Prompt:**
```
I need to ship 25 lbs of perishable food 400 miles. What's my only option and what will it cost?
```

**Expected Result:**
- Recommendation shows express REQUIRED
- Calculate express cost: 25 × (400/100) × $1.00 × 1.50 = $150
- Add perishable surcharge: $25
- Total: $150 + $5 + $25 = $180
- Delivery: 1-2 business days

---

## Test Results Tracking

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| 1.1 | Server loaded | ⬜ Pending | |
| 2.1 | Rate table info | ⬜ Pending | |
| 3.1 | Local economy | ⬜ Pending | |
| 3.2 | Regional standard | ⬜ Pending | |
| 3.3 | Long distance express | ⬜ Pending | |
| 3.4 | Coast-to-coast | ⬜ Pending | |
| 4.1 | Fragile package | ⬜ Pending | |
| 4.2 | Perishable package | ⬜ Pending | |
| 4.3 | Heavy package | ⬜ Pending | |
| 4.4 | Very heavy package | ⬜ Pending | |
| 4.5 | Hazmat flammable | ⬜ Pending | |
| 4.6 | Rural delivery | ⬜ Pending | |
| 4.7 | PO Box | ⬜ Pending | |
| 4.8 | Oversized | ⬜ Pending | |
| 4.9 | Multi-factor complex | ⬜ Pending | |
| 5.1-5.7 | Edge cases | ⬜ Pending | |
| 6.1-6.3 | Resources | ⬜ Pending | |
| 7.1-7.3 | Integration | ⬜ Pending | |

## Notes

- ✅ = Passed
- ⬜ = Pending
- ❌ = Failed
- ⚠️ = Partial/Issues

## Testing Tips

1. **Before testing**: Restart Claude Code/Desktop after any configuration changes
2. **Server verification**: Always verify the server is loaded first (Test 1.1)
3. **Resource tests**: Resources give Claude context to reason about the data
4. **Error handling**: Make sure error messages are clear and helpful
5. **Calculation verification**: Double-check math manually for spot checks
6. **Real-world scenarios**: Test 7.x scenarios are most important for practical use

## Manual Calculation Formula

For reference, the shipping cost formula is:

```
shippingCost = weight × (distance / 100) × baseRate × tierMultiplier
totalCost = shippingCost + handlingFee + surcharges
```

Where:
- `weight`: Package weight in lbs (1-150)
- `distance`: Shipping distance in miles (determines bracket)
- `baseRate`: From distance bracket in rate tables
- `tierMultiplier`: economy=0.80, standard=1.0, express=1.50
- `handlingFee`: $5.00 (fixed)
- `surcharges`: From package characteristics (recommendations)
