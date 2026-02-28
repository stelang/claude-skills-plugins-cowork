# Part 1: Building Your First Claude Skill

This directory contains all the code and examples for **Part 1** of the blog series: "From Skills to Cowork: Understanding Claude's AI Capabilities Through Shipping Examples."

## What's in This Part

### 1. The Skill Implementation
**Location:** `../.claude/skills/shipping-calculator/SKILL.md`

A complete Claude Skill that calculates shipping costs based on:
- Weight (1-150 lbs)
- Distance (minimum 1 mile)
- Service tier (Economy, Standard, Express)

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
   ls .claude/skills/shipping-calculator/SKILL.md
   ```

2. **Open Claude Code in this directory**

### Testing the Skill

**Method 1: Direct invocation**
```
Use the shipping-calculator skill to calculate a quote for:
- Weight: 25 lbs
- Distance: 450 miles
- Service Tier: Standard
```

**Method 2: Batch testing**
```
Run all test cases from 01-skill/test-cases.md using the shipping-calculator skill
```

### Expected Output Example

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

## Understanding the Skill

### Rate Structure

**Distance-based rates (per lb per 100 miles):**
- 1-100 miles: $0.50
- 101-300 miles: $0.75
- 301-600 miles: $1.00
- 601-1000 miles: $1.35
- 1001-2000 miles: $1.75
- 2001+ miles: $2.25

**Service tier multipliers:**
- Economy: 0.80 (20% discount, 7-10 business days)
- Standard: 1.0 (baseline, 3-5 business days)
- Express: 1.50 (50% premium, 1-2 business days)

### Calculation Formula

```
distance_units = distance / 100
adjusted_rate = base_rate × tier_multiplier
shipping_cost = weight × distance_units × adjusted_rate
total_cost = shipping_cost + 5.00 (base handling fee)
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
- Read actual rate tables from JSON files
- Access shipping rules from external data sources
- Handle complex package characteristics
- Support multiple specialized tools and resources

## Common Issues and Solutions

### Issue: Skill not found
**Solution:** Ensure the file is in `.claude/skills/shipping-calculator/` directory and Claude Code is running in the correct directory.

### Issue: Calculation doesn't match expected
**Solution:** Check the distance bracket - boundaries are inclusive. Distance 100 uses 1-100 bracket, distance 101 uses 101-300 bracket.

### Issue: Error handling not working
**Solution:** The skill should validate inputs before calculation. If validation isn't triggering, check the skill file syntax.

## Testing Checklist

Before moving to Part 2, verify:

- [ ] Skill successfully calculates shipping costs for all valid test cases
- [ ] Error cases produce clear, helpful messages
- [ ] Output formatting is consistent
- [ ] Service tier matching is case-insensitive
- [ ] Boundary conditions (distances 100, 300, 600, 1000, 2000) work correctly
- [ ] Heavy packages (100+ lbs) calculate correctly
- [ ] Very long distances (2000+ miles) calculate correctly

## Next Steps

Once you've tested this skill thoroughly:

1. **Read the blog post:** `../blog-part-1-overview-and-skill.md`
2. **Experiment:** Try modifying the rate formulas
3. **Extend:** Add new service tiers or distance brackets
4. **Prepare for Part 2:** Where we'll add external data access via Plugins

## Educational Notes

**Important:** The rates and formulas used in this skill are simplified for educational purposes. Real shipping cost calculation involves:
- Real-time carrier rate shopping
- Dimensional weight calculations
- Fuel surcharges
- Residential/commercial delivery fees
- Zone-based pricing
- Volume discounts
- Address validation
- Package insurance

This skill demonstrates the **concept** of shipping cost calculation, not actual industry practice.

## Files in This Directory

```
01-skill/
├── README.md           (this file)
├── test-cases.md       (comprehensive test scenarios)
└── demo-script.md      (demo scenarios)

../.claude/skills/
└── shipping-calculator/
    └── SKILL.md        (the actual skill implementation)
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
