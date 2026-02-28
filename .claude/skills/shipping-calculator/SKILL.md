---
name: shipping-calculator
description: Calculate shipping costs based on weight, distance, and service tier
---

# Shipping Cost Calculator Skill

You are a shipping cost calculator. When invoked, you calculate shipping costs based on the following inputs:

## Required Inputs
1. **Weight** (pounds, 1-150 lbs)
2. **Distance** (miles, minimum 1 mile)
3. **Service Tier** (one of: Economy, Standard, Express)

## Shipping Cost Calculation Formula

Use these base rates per pound per 100 miles:

### Distance Brackets
- 1-100 miles: $0.50
- 101-300 miles: $0.75
- 301-600 miles: $1.00
- 601-1000 miles: $1.35
- 1001-2000 miles: $1.75
- 2001+ miles: $2.25

### Service Tier Multipliers
- Economy: 0.80 (20% discount, 7-10 business days)
- Standard: 1.0 (no adjustment, 3-5 business days)
- Express: 1.50 (50% premium, 1-2 business days)

### Calculation Steps

1. Determine distance bracket base rate
2. Calculate distance units: `distance_units = distance / 100`
3. Apply service tier multiplier: `adjusted_rate = base_rate * tier_multiplier`
4. Calculate shipping cost: `shipping_cost = weight * distance_units * adjusted_rate`
5. Add base handling fee: `total_cost = shipping_cost + 5.00`

## Output Format

Provide results in this exact format:

```
SHIPPING COST CALCULATION
===========================
Input Summary:
  Weight: [weight] lbs
  Distance: [distance] miles
  Service Tier: [service_tier]

Calculation Details:
  Base Rate (per lb per 100 mi): $[base_rate]
  Service Tier Multiplier: [multiplier]
  Adjusted Rate: $[adjusted_rate]
  Base Handling Fee: $5.00

TOTAL SHIPPING COST: $[total_cost] (formatted to 2 decimals)
Estimated Delivery: [delivery_estimate]
```

## Validation Rules

- Weight must be between 1-150 lbs
- Distance must be at least 1 mile
- Service tier must be exactly one of the three options (case-insensitive)
- If any validation fails, explain the error clearly

## Example

**Input:** Weight=25 lbs, Distance=450 miles, Service Tier=Standard

**Calculation:**
- Distance bracket 301-600: base rate = $1.00
- Distance units = 450 / 100 = 4.5
- Service multiplier = 1.0
- Adjusted rate = 1.00 * 1.0 = $1.00
- Shipping cost = 25 * 4.5 * 1.00 = $112.50
- Total = 112.50 + 5.00 = $117.50

**Output:**
```
SHIPPING COST CALCULATION
===========================
Input Summary:
  Weight: 25 lbs
  Distance: 450 miles
  Service Tier: Standard

Calculation Details:
  Base Rate (per lb per 100 mi): $1.00
  Service Tier Multiplier: 1.0
  Adjusted Rate: $1.00
  Base Handling Fee: $5.00

TOTAL SHIPPING COST: $117.50
Estimated Delivery: 3-5 business days
```
