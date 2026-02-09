# Premium Calculator Plugin - Usage Examples

This document provides comprehensive examples of using the Premium Calculator MCP Plugin with Claude Code.

## Table of Contents

1. [Basic Premium Calculation](#basic-premium-calculation)
2. [Underwriting Recommendations](#underwriting-recommendations)
3. [Resource Access](#resource-access)
4. [Complex Scenarios](#complex-scenarios)
5. [Error Handling](#error-handling)

---

## Basic Premium Calculation

### Example 1: Young Preferred Applicant

**User Prompt:**
```
Use the premium-calculator plugin to calculate a quote for:
- Age: 28
- Coverage: $500,000
- Health Class: preferred
```

**Expected Result:**
```json
{
  "success": true,
  "input": {
    "age": 28,
    "coverage": 500000,
    "healthClass": "preferred"
  },
  "result": {
    "monthlyPremium": "63.75",
    "annualPremium": "765.00",
    "baseRate": 0.15,
    "healthMultiplier": 0.85,
    "adjustedRate": 0.1275
  },
  "rateTableVersion": "2026-Q1",
  "effectiveDate": "2026-01-01"
}
```

**Calculation Breakdown:**
- Age 28 → Bracket 18-30 → Base rate $0.15
- Preferred class → Multiplier 0.85
- Adjusted rate: 0.15 × 0.85 = $0.1275 per $1,000
- Monthly: ($500,000 / 1,000) × $0.1275 = $63.75
- Annual: $63.75 × 12 = $765.00

---

### Example 2: Middle-Aged Standard Applicant

**User Prompt:**
```
Calculate premium using the MCP plugin:
- Age: 45
- Coverage: $750,000
- Health Class: standard
```

**Expected Result:**
```json
{
  "monthlyPremium": "337.50",
  "annualPremium": "4050.00",
  "baseRate": 0.45,
  "healthMultiplier": 1.0,
  "adjustedRate": 0.45
}
```

---

### Example 3: Senior Substandard Applicant

**User Prompt:**
```
Get a quote for:
- Age: 68
- Coverage: $250,000
- Health Class: substandard
```

**Expected Result:**
```json
{
  "monthlyPremium": "506.25",
  "annualPremium": "6075.00",
  "baseRate": 1.50,
  "healthMultiplier": 1.35,
  "adjustedRate": 2.025
}
```

**Calculation:**
- Age 68 → Bracket 61-70 → Base rate $1.50
- Substandard → Multiplier 1.35
- Adjusted rate: 1.50 × 1.35 = $2.025
- Monthly: 250 × $2.025 = $506.25

---

## Underwriting Recommendations

### Example 4: Healthy Non-Smoker

**User Prompt:**
```
Get underwriting recommendation from the premium-calculator plugin for:
- Age: 35
- Coverage: $1,000,000
- Risk Factors:
  - Smoker: never
  - BMI: 23.5
  - Blood Pressure: 118/76
  - Occupation: software engineer
  - Hobbies: running, reading
```

**Expected Result:**
```json
{
  "success": true,
  "recommendation": {
    "recommendedClass": "preferred",
    "requiredTests": [
      "comprehensive blood panel",
      "EKG",
      "urinalysis",
      "blood pressure",
      "height/weight"
    ],
    "additionalAdjustments": 1.0,
    "notes": [
      "Long-term non-smoker - preferred class eligible",
      "Normal BMI - preferred class eligible",
      "Normal blood pressure - preferred class eligible"
    ]
  }
}
```

---

### Example 5: Moderate Risk with Occupational Surcharge

**User Prompt:**
```
Assess underwriting for:
- Age: 42
- Coverage: $2,000,000
- Risk Factors:
  - Smoker: former_recent (quit 2 years ago)
  - BMI: 31
  - Blood Pressure: 132/84
  - Occupation: electrician
  - Hobbies: hiking
```

**Expected Result:**
```json
{
  "success": true,
  "recommendation": {
    "recommendedClass": "standard",
    "requiredTests": [
      "comprehensive blood panel",
      "EKG",
      "urinalysis",
      "blood pressure",
      "height/weight"
    ],
    "additionalAdjustments": 1.05,
    "notes": [
      "Recent former smoker - may qualify for standard",
      "BMI 30-35 - standard classification",
      "Stage 1 hypertension - standard classification",
      "moderate_risk occupation - 5% surcharge"
    ]
  }
}
```

**Impact on Premium:**
```
Base premium × 1.05 occupational adjustment = Final premium
```

---

### Example 6: High Risk Multiple Factors

**User Prompt:**
```
Evaluate underwriting for:
- Age: 55
- Coverage: $500,000
- Risk Factors:
  - Smoker: current
  - BMI: 36
  - Blood Pressure: 145/92
  - Occupation: police officer
  - Hobbies: none
```

**Expected Result:**
```json
{
  "success": true,
  "recommendation": {
    "recommendedClass": "substandard",
    "requiredTests": [
      "comprehensive blood panel",
      "EKG",
      "urinalysis",
      "blood pressure",
      "height/weight"
    ],
    "additionalAdjustments": 1.15,
    "notes": [
      "Current smoker - substandard classification required",
      "BMI 35-40 - substandard classification",
      "Stage 2 hypertension - substandard classification",
      "high_risk occupation - 15% surcharge"
    ]
  }
}
```

---

### Example 7: Extreme Sports Hobbyist

**User Prompt:**
```
Get recommendation for:
- Age: 30
- Coverage: $800,000
- Risk Factors:
  - Smoker: never
  - BMI: 24
  - Blood Pressure: 115/72
  - Occupation: teacher
  - Hobbies: skydiving, rock climbing
```

**Expected Result:**
```json
{
  "success": true,
  "recommendation": {
    "recommendedClass": "standard",
    "requiredTests": [
      "comprehensive blood panel",
      "EKG",
      "urinalysis",
      "blood pressure",
      "height/weight"
    ],
    "additionalAdjustments": 1.25,
    "notes": [
      "Long-term non-smoker - preferred class eligible",
      "Normal BMI - preferred class eligible",
      "Extreme sports hobby - 25% surcharge"
    ]
  }
}
```

**Note:** Even though health indicators suggest preferred class, extreme sports may keep them at standard with surcharge.

---

## Resource Access

### Example 8: Read Rate Tables

**User Prompt:**
```
Read the rate-tables resource from the premium-calculator plugin and show me:
1. All age brackets
2. All health classes
3. Coverage limits
```

**Claude's Response (after reading resource):**

Based on the rate tables (version 2026-Q1, effective 2026-01-01):

**Age Brackets:**
1. 18-30: $0.15 per $1,000 per month (Young adult bracket)
2. 31-40: $0.25 per $1,000 per month (Early career bracket)
3. 41-50: $0.45 per $1,000 per month (Mid-career bracket)
4. 51-60: $0.85 per $1,000 per month (Pre-retirement bracket)
5. 61-70: $1.50 per $1,000 per month (Retirement age bracket)
6. 71-80: $2.50 per $1,000 per month (Senior bracket)

**Health Classes:**
1. **Preferred** (0.85 multiplier - 15% discount)
   - Excellent health, non-smoker, good family history

2. **Standard** (1.0 multiplier - baseline)
   - Good health, minor conditions controlled

3. **Substandard** (1.35 multiplier - 35% surcharge)
   - Health concerns present, higher risk

**Coverage Limits:**
- Minimum: $50,000
- Maximum: $5,000,000

---

### Example 9: Explore Underwriting Guidelines

**User Prompt:**
```
Read the underwriting-guidelines resource and explain:
1. What BMI ranges affect classification?
2. What occupation categories exist?
3. What tests are required for $2M coverage?
```

**Claude's Response:**

**BMI Impact on Classification:**
- < 18.5 (Underweight): Standard class, requires additional review
- 18.5-24.9 (Normal): Preferred class eligible
- 25-29.9 (Overweight): Standard class
- 30-34.9 (Obese Class I): Standard class
- 35-39.9 (Obese Class II): Substandard class
- 40+ (Obese Class III): Substandard with 25% additional surcharge

**Occupation Categories:**
1. **Low Risk** (1.0x) - Office worker, teacher, accountant, software engineer
2. **Moderate Risk** (1.05x) - Electrician, plumber, delivery driver
3. **High Risk** (1.15x) - Roofer, commercial pilot, police officer, firefighter
4. **Very High Risk** (1.35x) - Deep sea diver, blasting technician, test pilot

**Required Tests for $2M Coverage:**
Falls into "1m_to_3m" category:
- Comprehensive blood panel
- EKG (electrocardiogram)
- Urinalysis
- Blood pressure measurement
- Height/weight measurement

---

## Complex Scenarios

### Example 10: Comparative Quote Analysis

**User Prompt:**
```
Using the premium-calculator plugin, calculate and compare quotes for a 50-year-old with $1M coverage across all three health classes. Show the monthly and annual premiums for each.
```

**Claude's Workflow:**
1. Calls `calculate_premium` three times (preferred, standard, substandard)
2. Compares results
3. Presents comparison table

**Result:**

| Health Class | Monthly Premium | Annual Premium | Savings vs Standard |
|--------------|-----------------|----------------|---------------------|
| Preferred    | $722.50         | $8,670.00      | -$1,530 (15%)       |
| Standard     | $850.00         | $10,200.00     | baseline            |
| Substandard  | $1,147.50       | $13,770.00     | +$3,570 (35%)       |

**Analysis:**
- Age 50 → Bracket 41-50 → Base rate $0.85
- Preferred: 1,000 × 0.85 × 0.85 = $722.50/month
- Standard: 1,000 × 0.85 × 1.0 = $850.00/month
- Substandard: 1,000 × 0.85 × 1.35 = $1,147.50/month

---

### Example 11: Age Bracket Boundary Analysis

**User Prompt:**
```
Compare premiums for $500K standard coverage at ages 40 and 41 to show the bracket change impact.
```

**Results:**

**Age 40:**
- Bracket: 31-40
- Base rate: $0.25
- Monthly: $125.00
- Annual: $1,500.00

**Age 41:**
- Bracket: 41-50
- Base rate: $0.45
- Monthly: $225.00
- Annual: $2,700.00

**Impact:**
- $100/month increase (+80%)
- $1,200/year increase
- Crossing age bracket threshold significantly increases rates

---

### Example 12: Coverage Amount Impact

**User Prompt:**
```
For a 45-year-old with preferred health, compare monthly premiums for:
- $250,000
- $500,000
- $1,000,000
- $2,000,000
```

**Results:**

| Coverage    | Monthly Premium | Cost per $100K Coverage |
|-------------|-----------------|-------------------------|
| $250,000    | $95.63          | $38.25                  |
| $500,000    | $191.25         | $38.25                  |
| $1,000,000  | $382.50         | $38.25                  |
| $2,000,000  | $765.00         | $38.25                  |

**Insight:** Linear relationship - doubling coverage doubles premium (no bulk discounts in this model).

---

## Error Handling

### Example 13: Age Out of Range

**User Prompt:**
```
Calculate premium for:
- Age: 17
- Coverage: $500,000
- Health Class: standard
```

**Expected Error:**
```json
{
  "success": false,
  "error": "Age must be between 18 and 80"
}
```

---

### Example 14: Coverage Below Minimum

**User Prompt:**
```
Get quote for:
- Age: 30
- Coverage: $25,000
- Health Class: preferred
```

**Expected Error:**
```json
{
  "success": false,
  "error": "Coverage must be at least $50,000"
}
```

---

### Example 15: Invalid Health Class

**User Prompt:**
```
Calculate premium:
- Age: 40
- Coverage: $750,000
- Health Class: excellent
```

**Expected Error:**
```json
{
  "success": false,
  "error": "Invalid health class: excellent. Must be one of: preferred, standard, substandard"
}
```

---

## Integration Patterns

### Example 16: End-to-End Quote Generation

**User Prompt:**
```
For a 38-year-old software engineer with:
- Coverage needed: $1,000,000
- Never smoked
- BMI: 26
- Blood pressure: 125/80
- Hobbies: cycling

1. Get underwriting recommendation
2. Calculate premium using the recommended class
3. Provide a summary with both results
```

**Claude's Workflow:**

**Step 1: Underwriting Assessment**
```json
{
  "recommendedClass": "standard",
  "requiredTests": [...],
  "additionalAdjustments": 1.0,
  "notes": ["..."]
}
```

**Step 2: Premium Calculation**
```json
{
  "monthlyPremium": "250.00",
  "annualPremium": "3000.00",
  ...
}
```

**Step 3: Summary**
```
INSURANCE QUOTE SUMMARY
=======================
Applicant Profile:
  Age: 38
  Occupation: Software Engineer
  Coverage: $1,000,000

Health Assessment:
  Recommended Class: Standard
  Key Factors: Never smoked, BMI 26 (slightly overweight), blood pressure 125/80 (elevated)

Premium:
  Monthly: $250.00
  Annual: $3,000.00

Required Medical Exam:
  - Comprehensive blood panel
  - EKG
  - Urinalysis
  - Blood pressure measurement
  - Height/weight measurement

Next Steps:
  1. Complete medical examination
  2. Submit application
  3. Await underwriting approval
```

---

## Tips for Using the Plugin

### Best Practices

1. **Start with Rate Table Info**: Get familiar with current rates
2. **Use Underwriting First**: Assess before calculating
3. **Compare Options**: Show applicants different health class impacts
4. **Explain Factors**: Always break down what affects the premium
5. **Check Boundaries**: Be aware of age bracket transitions

### Common Workflows

**Workflow 1: New Applicant**
```
1. Get underwriting recommendation
2. Calculate premium with recommended class
3. Show comparison with other classes
4. Explain path to preferred class if applicable
```

**Workflow 2: Policy Review**
```
1. Read current rate tables
2. Recalculate with new rates
3. Compare to old premium
4. Explain rate changes
```

**Workflow 3: What-If Analysis**
```
1. Calculate current scenario
2. Calculate improved health scenario
3. Show potential savings
4. Motivate health improvements
```

---

## Advanced Usage

### Example 17: Bulk Quote Generation

**User Prompt:**
```
Generate quotes for 5 applicants:
1. Age 25, $500K, preferred
2. Age 35, $750K, standard
3. Age 45, $1M, standard
4. Age 55, $500K, substandard
5. Age 65, $250K, standard

Show in a comparison table.
```

**Expected Output:**
| # | Age | Coverage | Class | Monthly | Annual |
|---|-----|----------|-------|---------|---------|
| 1 | 25  | $500K    | Preferred | $63.75 | $765.00 |
| 2 | 35  | $750K    | Standard  | $187.50 | $2,250.00 |
| 3 | 45  | $1M      | Standard  | $450.00 | $5,400.00 |
| 4 | 55  | $500K    | Substandard | $573.75 | $6,885.00 |
| 5 | 65  | $250K    | Standard  | $375.00 | $4,500.00 |

---

## Testing Checklist

Use these examples to verify your plugin is working correctly:

- [ ] Example 1: Young preferred calculation
- [ ] Example 2: Middle-aged standard calculation
- [ ] Example 3: Senior substandard calculation
- [ ] Example 4: Healthy underwriting recommendation
- [ ] Example 5: Moderate risk with occupation
- [ ] Example 6: High risk multiple factors
- [ ] Example 7: Extreme sports adjustment
- [ ] Example 8: Read rate tables resource
- [ ] Example 9: Read underwriting guidelines
- [ ] Example 10: Comparative analysis
- [ ] Example 11: Age bracket boundary
- [ ] Example 12: Coverage amount scaling
- [ ] Example 13: Age validation error
- [ ] Example 14: Coverage minimum error
- [ ] Example 15: Health class validation error
- [ ] Example 16: End-to-end integration

---

*All examples use synthetic data for educational purposes.*
