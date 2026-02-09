# Premium Calculator Skill Test Cases

Use these test cases to verify the premium-calculator skill is working correctly.

## How to Test

In Claude Code, invoke the skill with each test case:

```
Use the premium-calculator skill to calculate a quote for:
- Age: [age]
- Coverage: $[coverage]
- Health Class: [health_class]
```

---

## Test Case 1: Young Adult, Preferred Health

**Input:**
- Age: 25
- Coverage: $250,000
- Health Class: Preferred

**Expected Results:**
- Base Rate: $0.15 (age bracket 18-30)
- Health Multiplier: 0.85
- Adjusted Rate: $0.1275
- Monthly Premium: $31.88
- Annual Premium: $382.50

**Why this matters:** Tests lowest age bracket with best health class - should produce lowest rates.

---

## Test Case 2: Middle-Aged, Standard Health

**Input:**
- Age: 45
- Coverage: $500,000
- Health Class: Standard

**Expected Results:**
- Base Rate: $0.45 (age bracket 41-50)
- Health Multiplier: 1.0
- Adjusted Rate: $0.45
- Monthly Premium: $225.00
- Annual Premium: $2,700.00

**Why this matters:** Tests middle age bracket with standard health - most common scenario.

---

## Test Case 3: Senior, Substandard Health

**Input:**
- Age: 68
- Coverage: $100,000
- Health Class: Substandard

**Expected Results:**
- Base Rate: $1.50 (age bracket 61-70)
- Health Multiplier: 1.35
- Adjusted Rate: $2.025
- Monthly Premium: $202.50
- Annual Premium: $2,430.00

**Why this matters:** Tests high-risk scenario - older age plus substandard health.

---

## Test Case 4: High Coverage, Preferred

**Input:**
- Age: 40
- Coverage: $1,000,000
- Health Class: Preferred

**Expected Results:**
- Base Rate: $0.25 (age bracket 31-40)
- Health Multiplier: 0.85
- Adjusted Rate: $0.2125
- Monthly Premium: $212.50
- Annual Premium: $2,550.00

**Why this matters:** Tests large coverage amount calculation.

---

## Test Case 5: Boundary - Youngest Age

**Input:**
- Age: 18
- Coverage: $50,000
- Health Class: Standard

**Expected Results:**
- Base Rate: $0.15 (age bracket 18-30)
- Health Multiplier: 1.0
- Adjusted Rate: $0.15
- Monthly Premium: $7.50
- Annual Premium: $90.00

**Why this matters:** Tests minimum age boundary (18).

---

## Test Case 6: Boundary - Oldest Age

**Input:**
- Age: 80
- Coverage: $50,000
- Health Class: Standard

**Expected Results:**
- Base Rate: $2.50 (age bracket 71-80)
- Health Multiplier: 1.0
- Adjusted Rate: $2.50
- Monthly Premium: $125.00
- Annual Premium: $1,500.00

**Why this matters:** Tests maximum age boundary (80).

---

## Test Case 7: Boundary - Minimum Coverage

**Input:**
- Age: 30
- Coverage: $50,000
- Health Class: Standard

**Expected Results:**
- Base Rate: $0.15 (age bracket 18-30)
- Health Multiplier: 1.0
- Adjusted Rate: $0.15
- Monthly Premium: $7.50
- Annual Premium: $90.00

**Why this matters:** Tests minimum coverage amount ($50,000).

---

## Error Test Cases

### Error Test 1: Age Too Young

**Input:**
- Age: 15
- Coverage: $100,000
- Health Class: Standard

**Expected:** Error message explaining age must be between 18-80.

---

### Error Test 2: Age Too Old

**Input:**
- Age: 85
- Coverage: $100,000
- Health Class: Standard

**Expected:** Error message explaining age must be between 18-80.

---

### Error Test 3: Coverage Too Low

**Input:**
- Age: 40
- Coverage: $25,000
- Health Class: Preferred

**Expected:** Error message explaining minimum coverage is $50,000.

---

### Error Test 4: Invalid Health Class

**Input:**
- Age: 40
- Coverage: $100,000
- Health Class: Premium

**Expected:** Error message explaining valid health classes are: Preferred, Standard, Substandard.

---

### Error Test 5: Case Insensitivity Check

**Input:**
- Age: 40
- Coverage: $100,000
- Health Class: PREFERRED

**Expected:** Should work correctly (case-insensitive matching).

**Expected Results:**
- Monthly Premium: $21.25
- Annual Premium: $255.00

---

## Verification Checklist

After running all test cases, verify:

- [ ] All successful test cases produce correct calculations
- [ ] Monthly premium = (coverage/1000) × adjusted_rate
- [ ] Annual premium = monthly × 12
- [ ] All error cases produce clear error messages
- [ ] Health class matching is case-insensitive
- [ ] Output formatting is consistent
- [ ] Dollar amounts are formatted to 2 decimal places
- [ ] Coverage amounts display with comma separators

---

## Quick Reference: Expected Monthly Premiums

For easy verification:

| Age | Coverage   | Health Class  | Expected Monthly |
|-----|------------|---------------|------------------|
| 25  | $250,000   | Preferred     | $31.88          |
| 45  | $500,000   | Standard      | $225.00         |
| 68  | $100,000   | Substandard   | $202.50         |
| 40  | $1,000,000 | Preferred     | $212.50         |
| 18  | $50,000    | Standard      | $7.50           |
| 80  | $50,000    | Standard      | $125.00         |
| 30  | $50,000    | Standard      | $7.50           |
| 40  | $100,000   | Preferred     | $21.25          |

---

*Note: All rates and formulas in this skill are simplified for educational purposes and do not reflect actual insurance industry pricing.*
