# Example: Electronics Express Shipping Quote

This is a saved example of the three-agent team coordinating to generate a shipping quote for an electronics package.

## Scenario
- **Package:** Laptop computer
- **Weight:** 15 lbs
- **Dimensions:** 20×16×8 inches
- **Distance:** 1200 miles
- **Service Tier:** Express

## Agent Coordination Flow

### Agent 1: Package Assessment Agent
**Input:** Raw package details
**Processing:**
- Calculated dimensional weight: 18.4 lbs (vs 15 lbs actual)
- Identified as fragile electronics
- Recommended signature confirmation
- Determined surcharges: $15 fragile + $5 signature

**Output Data Structure:**
```json
{
  "assessment_id": "PKG-2026-003-001",
  "billable_weight": 18.4,
  "fragile": true,
  "signature_required": true,
  "surcharges": {"fragile_handling": 15.00, "signature_confirmation": 5.00},
  "total_surcharges": 20.00,
  "approved": true
}
```

### Agent 2: Cost Calculation Agent
**Input:** Assessment data from Agent 1
**Processing:**
- Applied 1001-2000 mile bracket rate: $1.75/lb/100mi
- Express multiplier: 1.50
- Base shipping: 18.4 lbs × 12 units × $1.75 × 1.50 = $579.60
- Added surcharges from assessment
- Compared three carrier options

**Output Data Structure:**
```json
{
  "calculation_id": "CALC-2026-003-001",
  "base_shipping": 579.60,
  "handling_fee": 5.00,
  "surcharges": 20.00,
  "total_cost": 604.60,
  "transit_time": "1-2 business days",
  "carrier_options": [
    {"name": "FastShip Express", "cost": 604.60, "recommended": true}
  ]
}
```

### Agent 3: Quote Generation Agent
**Input:** Cost data from Agent 2
**Processing:**
- Formatted professional quote document
- Emphasized insurance recommendations for electronics
- Included special handling requirements
- Added terms and conditions
- Provided clear next steps

**Output:** Complete customer-ready quote (see demonstration output)

## Final Quote Details

**Total Cost:** $604.60
- Base shipping: $579.60
- Base handling: $5.00
- Fragile handling: $15.00
- Signature confirmation: $5.00

**Delivery:** 1-2 business days (Express)
**Insurance Recommended:** Premium Electronics Insurance ($28.00)

## Key Insights

1. **Dimensional Weight Impact:** Assessment agent caught that dimensional weight (18.4 lbs) exceeds actual weight (15 lbs), ensuring accurate billing
2. **Specialized Knowledge:** Each agent contributed domain expertise
3. **Data Quality:** Structured handoffs prevented data loss
4. **Professional Output:** Customer-ready without manual formatting

## Time Savings
- **Manual Process:** 12-16 minutes
- **Agent Teams:** 5-10 seconds
- **Savings:** 97%
