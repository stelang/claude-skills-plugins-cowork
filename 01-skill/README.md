# Part 1: Building Your First Claude Skill

This directory contains all the code and examples for **Part 1** of the blog series: "From Skills to Cowork: Understanding Claude's AI Capabilities Through Insurance Examples."

## What's in This Part

### 1. The Skill Implementation
**Location:** `../.claude/skills/premium-calculator.md`

A complete Claude Skill that calculates life insurance premiums based on:
- Age (18-80)
- Coverage amount (minimum $50,000)
- Health classification (Preferred, Standard, Substandard)

### 2. Test Cases
**Location:** `test-cases.md`

Comprehensive test cases including:
- 8 successful calculation scenarios
- 5 error condition tests
- Boundary testing
- Verification checklist

## How to Use This Skill

### Setup

1. **Ensure the skill file exists:**
   ```bash
   ls .claude/skills/premium-calculator.md
   ```

2. **Open Claude Code in this directory**

### Testing the Skill

**Method 1: Direct invocation**
```
Use the premium-calculator skill to calculate a quote for:
- Age: 45
- Coverage: $500,000
- Health Class: Standard
```

**Method 2: Batch testing**
```
Run all test cases from 01-skill/test-cases.md using the premium-calculator skill
```

### Expected Output Example

```
PREMIUM CALCULATION RESULTS
===========================
Input Summary:
  Age: 45
  Coverage Amount: $500,000
  Health Class: Standard

Calculation Details:
  Base Rate (per $1,000): $0.45
  Health Class Multiplier: 1.0
  Adjusted Rate: $0.45

PREMIUMS:
  Monthly: $225.00
  Annual: $2,700.00
```

## Understanding the Skill

### Rate Structure

**Age-based rates (per $1,000 of coverage/month):**
- 18-30: $0.15
- 31-40: $0.25
- 41-50: $0.45
- 51-60: $0.85
- 61-70: $1.50
- 71-80: $2.50

**Health class multipliers:**
- Preferred: 0.85 (15% discount)
- Standard: 1.0 (baseline)
- Substandard: 1.35 (35% surcharge)

### Calculation Formula

```
monthly_premium = (coverage / 1000) × base_rate × health_multiplier
annual_premium = monthly_premium × 12
```

## Key Skill Design Principles

This skill demonstrates important design patterns:

1. **Clear Input Requirements** - Explicit parameters with validation
2. **Self-Contained Logic** - No external dependencies
3. **Consistent Output Format** - Structured, readable results
4. **Error Handling** - Validates inputs before processing
5. **Deterministic** - Same inputs always produce same outputs
6. **Documentation** - Includes examples and explanations

## What Makes This Different from a Plugin?

**This Skill:**
- Uses hardcoded rate formulas
- Self-contained calculation logic
- No file or database access needed
- Perfect for demonstration and testing

**In Part 2 (Plugin), we'll extend this to:**
- Read actual rate tables from Excel files
- Access underwriting guidelines from databases
- Fetch real-time mortality data from APIs
- Handle complex multi-source data integration

## Common Issues and Solutions

### Issue: Skill not found
**Solution:** Ensure the file is in `.claude/skills/` directory and Claude Code is running in the correct directory.

### Issue: Calculation doesn't match expected
**Solution:** Check the age bracket - boundaries are inclusive. Age 30 uses 18-30 bracket, age 31 uses 31-40 bracket.

### Issue: Error handling not working
**Solution:** The skill should validate inputs before calculation. If validation isn't triggering, check the skill file syntax.

## Testing Checklist

Before moving to Part 2, verify:

- [ ] Skill successfully calculates premiums for all valid test cases
- [ ] Error cases produce clear, helpful messages
- [ ] Output formatting is consistent
- [ ] Health class matching is case-insensitive
- [ ] Boundary conditions (ages 18, 30, 40, 50, 60, 70, 80) work correctly
- [ ] Large coverage amounts (e.g., $1M+) calculate correctly

## Next Steps

Once you've tested this skill thoroughly:

1. **Read the blog post:** `../blog-part-1-overview-and-skill.md`
2. **Experiment:** Try modifying the rate formulas
3. **Extend:** Add new health classes or age brackets
4. **Prepare for Part 2:** Where we'll add external data access via Plugins

## Educational Notes

**Important:** The rates and formulas used in this skill are simplified for educational purposes. Real insurance pricing involves:
- Medical underwriting
- Mortality tables
- Lapse assumptions
- Expense loadings
- Profit margins
- Regulatory requirements
- Competitive positioning

This skill demonstrates the **concept** of premium calculation, not actual industry practice.

## Files in This Directory

```
01-skill/
├── README.md           (this file)
└── test-cases.md       (comprehensive test scenarios)

../.claude/skills/
└── premium-calculator.md  (the actual skill implementation)
```

## Related Blog Post

This code accompanies the blog post: **"From Skills to Cowork: Part 1 - Building Your First Claude Skill"**

Published: [Date]
Series: Part 1 of 4

---

## Questions or Issues?

If you find issues with the skill or have questions:

1. Check the test cases to see expected behavior
2. Review the skill file for calculation logic
3. Ensure you're using Claude Code (not Claude.ai web interface)
4. Verify the skill file is in the correct location

---

**Next in Series:** Part 2 - Building a Plugin (MCP) to extend this skill with external data access.

---

*This is a learning resource. All data and calculations are for educational purposes only.*
