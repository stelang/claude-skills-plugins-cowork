# Agent Teams Quick Start Guide

Get started with agent teams in 5 minutes.

## What Are Agent Teams?

Agent Teams coordinate multiple specialized AI agents to handle complex tasks that benefit from different areas of expertise. Instead of one agent doing everything, specialized agents work together.

## The Three-Agent Shipping Quote System

Our example uses three coordinated agents:

1. **Package Assessment Agent** - Evaluates package characteristics
2. **Cost Calculation Agent** - Calculates shipping costs
3. **Quote Generation Agent** - Creates professional quotes

## Try It Now

### Basic Example

Copy and paste this into Claude Code:

```
I need a shipping quote using a three-agent team approach.

Package Details:
- Contents: Laptop computer
- Weight: 15 lbs
- Dimensions: 20×16×8 inches
- Destination: 1200 miles
- Service Tier: Express

Please coordinate three specialized agents:

1. Package Assessment Agent - Evaluate package characteristics,
   calculate dimensional weight, identify special handling
   requirements

2. Cost Calculation Agent - Use assessment results, apply rate
   tables, calculate service tier adjustments, generate cost
   breakdown

3. Quote Generation Agent - Create professional quote document
   with insurance options and delivery estimates

Show the handoff between each agent clearly.
```

### What You'll See

1. **Package Assessment Agent output:**
   - Dimensional weight calculation
   - Special handling requirements
   - Identified surcharges
   - Structured data passed to next agent

2. **Cost Calculation Agent output:**
   - Base cost calculation
   - Rate table application
   - Surcharge aggregation
   - Carrier options
   - Structured data passed to next agent

3. **Quote Generation Agent output:**
   - Professional formatted quote
   - Insurance recommendations
   - Terms and conditions
   - Customer-ready document

## More Examples

### Complex Package
```
Generate a shipping quote using agent teams for:

Package: Antique glass chandelier
Weight: 45 lbs
Dimensions: 36×36×48 inches
Fragile: YES
Value: $5,000
Distance: 1500 miles
Service Tier: Express

Use the three-agent team to handle this complex assessment.
```

### Service Tier Comparison
```
Compare all three service tiers using agent teams:

Package: 25 lbs, 20×16×12 inches, 800 miles

Run the agent team three times:
1. Economy tier
2. Standard tier
3. Express tier

Show cost and delivery time differences.
```

### Multiple Packages
```
Generate quotes for three packages using agent teams:

Package A: Documents, 2 lbs, 12×9×2 inches, 500 miles, Economy
Package B: Electronics, 25 lbs, 20×16×12 inches, 500 miles, Standard
Package C: Samples, 8 lbs, 14×10×6 inches, 500 miles, Express

Process all three through the agent team.
```

## Understanding Agent Coordination

### Data Flow
```
Customer Request
      ↓
[Package Assessment Agent]
      ↓ (assessment data)
[Cost Calculation Agent]
      ↓ (cost data)
[Quote Generation Agent]
      ↓
Professional Quote
```

### Key Benefits

✅ **Specialization** - Each agent expert in its domain
✅ **Modularity** - Test and update agents independently
✅ **Scalability** - Handle 1 package or 1,000 packages
✅ **Quality** - Structured handoffs prevent data loss
✅ **Maintainability** - Change one agent without breaking others

## Next Steps

1. **Try the examples** above
2. **Read the full README** in `03-agent-teams/README.md`
3. **Explore test cases** in `test-cases.md`
4. **Review demo script** in `demo-script.md`
5. **See complete example** in `examples/electronics-express-quote.md`

## Common Questions

**Q: How is this different from a single agent?**
A: Single agents mix all logic together. Agent teams separate concerns, making each piece simpler and more maintainable.

**Q: When should I use agent teams?**
A: When tasks naturally split into distinct subtasks requiring different expertise, or when you need parallel processing.

**Q: Can I add more agents?**
A: Absolutely! Add route optimization, risk assessment, compliance checking, or any specialized agent you need.

**Q: Do agents work in parallel or sequentially?**
A: In this example, sequentially (assessment → cost → quote). But agent teams can also process multiple packages in parallel for efficiency.

## Troubleshooting

**Issue:** Agents not coordinating properly
**Solution:** Ensure data structures are clearly defined between agent handoffs

**Issue:** Missing information in final quote
**Solution:** Verify each agent passes complete data to the next agent

**Issue:** Errors in one agent stop the whole process
**Solution:** Implement error handling at each agent level with fallbacks

## Resources

- **Full Documentation:** `README.md`
- **Test Cases:** `test-cases.md` (comprehensive scenarios)
- **Demo Script:** `demo-script.md` (presentation-ready examples)
- **Blog Post:** `../blog-part-3-agent-teams.md` (coming soon)

---

**Ready to build more sophisticated systems?** Next step: Part 4 (Cowork) for enterprise-level orchestration!
