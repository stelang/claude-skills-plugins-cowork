# Shipping Calculator Skill Test Cases

Use these test cases to verify the shipping-calculator skill is working correctly.

## How to Test

In Claude Code, invoke the skill with each test case:

```
Use the shipping-calculator skill to calculate shipping cost for:
- Weight: [weight] lbs
- Distance: [distance] miles
- Service Tier: [tier]
```

---

## Test Case 1: Local Delivery, Economy Tier

**Input:**
- Weight: 10 lbs
- Distance: 50 miles
- Service Tier: Economy

**Expected Results:**
- Base Rate: $0.50 (distance bracket 1-100 miles)
- Service Tier Multiplier: 0.80
- Adjusted Rate: $0.40
- Distance Units: 0.5
- Shipping Cost: $2.00
- Handling Fee: $5.00
- Total Cost: $7.00
- Delivery: 7-10 business days

**Why this matters:** Tests shortest distance bracket with economy tier - should produce lowest shipping cost.

---

## Test Case 2: Regional Delivery, Standard Tier

**Input:**
- Weight: 25 lbs
- Distance: 450 miles
- Service Tier: Standard

**Expected Results:**
- Base Rate: $1.00 (distance bracket 301-600 miles)
- Service Tier Multiplier: 1.0
- Adjusted Rate: $1.00
- Distance Units: 4.5
- Shipping Cost: $112.50
- Handling Fee: $5.00
- Total Cost: $117.50
- Delivery: 3-5 business days

**Why this matters:** Tests middle distance bracket with standard tier - most common scenario.

---

## Test Case 3: Long Distance, Express Tier

**Input:**
- Weight: 15 lbs
- Distance: 1200 miles
- Service Tier: Express

**Expected Results:**
- Base Rate: $1.75 (distance bracket 1001-2000 miles)
- Service Tier Multiplier: 1.50
- Adjusted Rate: $2.625
- Distance Units: 12
- Shipping Cost: $472.50
- Handling Fee: $5.00
- Total Cost: $477.50
- Delivery: 1-2 business days

**Why this matters:** Tests long distance with premium service tier - high-cost scenario.

---

## Test Case 4: Heavy Package, Cross-Country

**Input:**
- Weight: 100 lbs
- Distance: 2800 miles
- Service Tier: Standard

**Expected Results:**
- Base Rate: $2.25 (distance bracket 2001+ miles)
- Service Tier Multiplier: 1.0
- Adjusted Rate: $2.25
- Distance Units: 28
- Shipping Cost: $6,300.00
- Handling Fee: $5.00
- Total Cost: $6,305.00
- Delivery: 3-5 business days

**Why this matters:** Tests maximum distance bracket with heavy package.

---

## Test Case 5: Boundary - Minimum Weight

**Input:**
- Weight: 1 lb
- Distance: 100 miles
- Service Tier: Standard

**Expected Results:**
- Base Rate: $0.50 (distance bracket 1-100 miles)
- Service Tier Multiplier: 1.0
- Adjusted Rate: $0.50
- Distance Units: 1.0
- Shipping Cost: $0.50
- Handling Fee: $5.00
- Total Cost: $5.50
- Delivery: 3-5 business days

**Why this matters:** Tests minimum weight boundary (1 lb).

---

## Test Case 6: Boundary - Maximum Weight

**Input:**
- Weight: 150 lbs
- Distance: 500 miles
- Service Tier: Standard

**Expected Results:**
- Base Rate: $1.00 (distance bracket 301-600 miles)
- Service Tier Multiplier: 1.0
- Adjusted Rate: $1.00
- Distance Units: 5.0
- Shipping Cost: $750.00
- Handling Fee: $5.00
- Total Cost: $755.00
- Delivery: 3-5 business days

**Why this matters:** Tests maximum weight boundary (150 lbs).

---

## Test Case 7: Boundary - Distance Bracket Edge

**Input:**
- Weight: 20 lbs
- Distance: 300 miles
- Service Tier: Economy

**Expected Results:**
- Base Rate: $0.75 (distance bracket 101-300 miles)
- Service Tier Multiplier: 0.80
- Adjusted Rate: $0.60
- Distance Units: 3.0
- Shipping Cost: $36.00
- Handling Fee: $5.00
- Total Cost: $41.00
- Delivery: 7-10 business days

**Why this matters:** Tests upper boundary of 101-300 mile bracket.

---

## Test Case 8: Short Distance, Express

**Input:**
- Weight: 5 lbs
- Distance: 200 miles
- Service Tier: Express

**Expected Results:**
- Base Rate: $0.75 (distance bracket 101-300 miles)
- Service Tier Multiplier: 1.50
- Adjusted Rate: $1.125
- Distance Units: 2.0
- Shipping Cost: $11.25
- Handling Fee: $5.00
- Total Cost: $16.25
- Delivery: 1-2 business days

**Why this matters:** Tests express tier on shorter distance - premium for speed.

---

## Error Test Cases

### Error Test 1: Weight Too Light

**Input:**
- Weight: 0 lbs
- Distance: 100 miles
- Service Tier: Standard

**Expected:** Error message explaining weight must be between 1-150 lbs.

---

### Error Test 2: Weight Too Heavy

**Input:**
- Weight: 200 lbs
- Distance: 100 miles
- Service Tier: Standard

**Expected:** Error message explaining weight must be between 1-150 lbs.

---

### Error Test 3: Distance Too Short

**Input:**
- Weight: 10 lbs
- Distance: 0 miles
- Service Tier: Standard

**Expected:** Error message explaining distance must be at least 1 mile.

---

### Error Test 4: Invalid Service Tier

**Input:**
- Weight: 20 lbs
- Distance: 500 miles
- Service Tier: Premium

**Expected:** Error message explaining valid service tiers are: Economy, Standard, Express.

---

### Error Test 5: Case Insensitivity Check

**Input:**
- Weight: 20 lbs
- Distance: 500 miles
- Service Tier: STANDARD

**Expected:** Should work correctly (case-insensitive matching).

**Expected Results:**
- Total Cost: $105.00
- Delivery: 3-5 business days

---

## Verification Checklist

After running all test cases, verify:

- [ ] All successful test cases produce correct calculations
- [ ] Distance units = distance / 100
- [ ] Adjusted rate = base_rate × tier_multiplier
- [ ] Shipping cost = weight × distance_units × adjusted_rate
- [ ] Total cost = shipping_cost + 5.00
- [ ] All error cases produce clear error messages
- [ ] Service tier matching is case-insensitive
- [ ] Output formatting is consistent
- [ ] Dollar amounts are formatted to 2 decimal places
- [ ] Delivery estimates match service tier

---

## Quick Reference: Expected Total Costs

For easy verification:

| Weight | Distance | Service Tier | Expected Total Cost | Delivery Time      |
|--------|----------|--------------|--------------------|--------------------|
| 10 lbs | 50 mi    | Economy      | $7.00              | 7-10 business days |
| 25 lbs | 450 mi   | Standard     | $117.50            | 3-5 business days  |
| 15 lbs | 1200 mi  | Express      | $477.50            | 1-2 business days  |
| 100 lbs| 2800 mi  | Standard     | $6,305.00          | 3-5 business days  |
| 1 lb   | 100 mi   | Standard     | $5.50              | 3-5 business days  |
| 150 lbs| 500 mi   | Standard     | $755.00            | 3-5 business days  |
| 20 lbs | 300 mi   | Economy      | $41.00             | 7-10 business days |
| 5 lbs  | 200 mi   | Express      | $16.25             | 1-2 business days  |
| 20 lbs | 500 mi   | Standard     | $105.00            | 3-5 business days  |

---

## Distance Bracket Reference

For understanding which bracket applies:

| Distance Range  | Base Rate | Description           |
|-----------------|-----------|----------------------|
| 1-100 miles     | $0.50     | Local delivery       |
| 101-300 miles   | $0.75     | Regional delivery    |
| 301-600 miles   | $1.00     | Inter-regional       |
| 601-1000 miles  | $1.35     | Long-distance        |
| 1001-2000 miles | $1.75     | Cross-country        |
| 2001+ miles     | $2.25     | Coast-to-coast       |

---

*Note: All rates and formulas in this skill are simplified for educational purposes and do not reflect actual shipping carrier pricing.*
