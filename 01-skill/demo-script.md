# Shipping Calculator Skill - Demo Script

This script provides ready-to-copy prompts for demonstrating the shipping-calculator skill.

## Quick Demo (5 minutes)

Copy and paste these prompts into Claude Code to demonstrate the skill.

---

### Demo 1: Basic Calculation

```
Use the shipping-calculator skill to calculate shipping cost for:
- Weight: 25 lbs
- Distance: 450 miles
- Service Tier: Standard
```

**What to highlight:**
- Fast, accurate calculation
- Professional formatted output
- Shows calculation breakdown
- Delivery time estimate

---

### Demo 2: Express Shipping Scenario

```
Use the shipping-calculator skill for this package:
- Weight: 15 lbs
- Distance: 1200 miles
- Service Tier: Express
```

**What to highlight:**
- Premium pricing for faster delivery
- Transparent rate multipliers
- Clear cost vs speed tradeoff

---

### Demo 3: Service Tier Comparison

```
Use the shipping-calculator skill to generate three quotes for comparison:

Quote 1:
- Weight: 20 lbs
- Distance: 500 miles
- Service Tier: Economy

Quote 2:
- Weight: 20 lbs
- Distance: 500 miles
- Service Tier: Standard

Quote 3:
- Weight: 20 lbs
- Distance: 500 miles
- Service Tier: Express

Show all three results so we can compare how service tier affects pricing and delivery time.
```

**What to highlight:**
- Same weight and distance, only service tier varies
- Clear demonstration of service tier impact
- 20% discount for Economy vs Standard
- 50% premium for Express vs Standard
- Delivery time differences

---

### Demo 4: Error Handling

```
Use the shipping-calculator skill to calculate:
- Weight: 200 lbs
- Distance: 500 miles
- Service Tier: Standard
```

**What to highlight:**
- Graceful error handling
- Clear validation message
- Explains the constraint (weight must be 1-150 lbs)

---

### Demo 5: Distance Impact Comparison

```
Use the shipping-calculator skill to show how distance affects shipping costs:

Scenario 1:
- Weight: 25 lbs
- Distance: 50 miles
- Service Tier: Standard

Scenario 2:
- Weight: 25 lbs
- Distance: 500 miles
- Service Tier: Standard

Scenario 3:
- Weight: 25 lbs
- Distance: 2500 miles
- Service Tier: Standard

Compare the costs to show how distance brackets work.
```

**What to highlight:**
- Progressive rate structure
- Distance brackets change rates
- Helps customers understand regional vs long-distance costs

---

## Extended Demo (10 minutes)

### Comprehensive Rate Sheet

```
I need to prepare shipping quotes for a logistics presentation. Use the shipping-calculator skill to generate a complete rate sheet for a 25 lb package across all service tiers and common distances:

Distances: 100 miles, 500 miles, 1000 miles, 2500 miles
Service Tiers: Economy, Standard, Express

Generate all 12 combinations and present them in a comparison format.
```

**What to highlight:**
- Skill can handle batch requests
- Demonstrates full rate card
- Shows price sensitivity to both distance and service tier
- Professional presentation suitable for customer meetings

---

## Executive Demo Script

Use this for presenting to business stakeholders.

### Opening (1 minute)

"Today I'll show you a Claude Skill that automates shipping cost calculations. This is the foundation - in later demos, we'll extend this with live rate data (Plugins), coordinate it with package assessment (Agent Teams), and orchestrate full quote-to-ship processes (Cowork)."

### Demo Flow (3 minutes)

**Step 1: Single quote**
```
Use the shipping-calculator skill to calculate:
- Weight: 25 lbs
- Distance: 450 miles
- Service Tier: Standard
```

"Notice the instant calculation, transparent breakdown, and professional formatting with delivery estimates."

**Step 2: Comparison scenario**
```
Use the shipping-calculator skill to compare:

Option A - Economy:
- Weight: 50 lbs, Distance: 800 miles, Service Tier: Economy

Option B - Express:
- Weight: 50 lbs, Distance: 800 miles, Service Tier: Express

Show the cost difference and delivery time tradeoff.
```

"This demonstrates how agents can handle comparative analysis automatically."

**Step 3: Error handling**
```
Use the shipping-calculator skill:
- Weight: 0 lbs
- Distance: 500 miles
- Service Tier: Standard
```

"Even with invalid inputs, the skill provides clear guidance."

### Business Value Talking Points (2 minutes)

**Current State:**
- Customer service rep looks up rate card
- Uses calculator or spreadsheet
- Manual data entry errors possible
- Takes 2-3 minutes per quote
- Customer waiting on hold

**With Skill:**
- Instant calculation
- Zero data entry errors
- Consistent methodology
- Can generate dozens of scenarios in seconds
- Real-time customer service
- Foundation for automation

**ROI Example:**
- Rep generates 40 quotes/day
- Current: 80-120 minutes
- With Skill: 5-10 minutes
- Time savings: 70-110 minutes/day/rep
- For 10 reps: 12-18 hours/day saved
- Better customer experience (instant quotes)

### Closing (1 minute)

"This is just the beginning. In our next demo, we'll show how Plugins extend this to use live carrier rates and package assessment rules. Then Agent Teams will coordinate package evaluation, cost calculation, and quote generation. Finally, Cowork will orchestrate the entire quote-to-shipment process."

---

## Technical Demo Script

Use this for technical audiences (developers, architects).

### Architecture Overview (2 minutes)

"A Claude Skill is essentially a prompt template with structured instructions. Let's look at the implementation."

**Show the skill file:** `.claude/skills/shipping-calculator/SKILL.md`

**Highlight:**
- Frontmatter with description (enables discoverability)
- Clear input specification
- Deterministic calculation logic
- Structured output format
- Validation rules

### Live Demo (5 minutes)

**Demo 1: Basic invocation**
```
Use the shipping-calculator skill:
Weight=25 lbs, Distance=450 miles, Service Tier=Standard
```

**Demo 2: Show the calculation breakdown**
"Notice how it shows every step: base rate → distance units → tier multiplier → shipping cost → handling fee → total. This transparency is crucial for customer trust."

**Demo 3: Batch processing**
```
Use the shipping-calculator skill to generate quotes for weights 10, 25, 50, 100, and 150 lbs, all for 500 miles distance with Standard service tier. Show how costs scale with weight.
```

**Demo 4: Integration example**
"In a real application, you could invoke this skill from:
- An e-commerce checkout page
- A customer service chat interface
- A shipping management system
- As part of a larger Agent Team handling logistics"

### Design Patterns (3 minutes)

**Good Skill Design:**
1. **Single Responsibility** - Does ONE thing well
2. **Clear Inputs/Outputs** - No ambiguity
3. **Self-Contained** - No external dependencies
4. **Deterministic** - Predictable results
5. **Documented** - Includes examples

**Anti-Patterns to Avoid:**
1. Too broad (trying to do too much)
2. Unclear output format
3. Hidden assumptions
4. Insufficient error handling
5. Undocumented edge cases

### Extension Path (2 minutes)

"This skill is self-contained. To extend it:

**→ Plugin (MCP):** Add external data access
- Read carrier rate tables
- Access package assessment rules
- Fetch real-time fuel surcharges
- Check delivery zone restrictions

**→ Agent Teams:** Coordinate with other agents
- Package Assessment Agent evaluates characteristics
- Cost Calculation Agent (this skill) computes rates
- Quote Generation Agent creates shipping labels

**→ Cowork:** Full process orchestration
- Handle multi-package scenarios
- Generate comparison reports for customers
- Create shipping manifests
- Integrate with warehouse/fulfillment systems"

---

## Testing Demo

For demonstrating test coverage:

```
I want to thoroughly test the shipping-calculator skill. Run these test scenarios:

1. Boundary test - minimum weight (1 lb)
   Weight: 1 lb, Distance: 100 miles, Service: Standard

2. Boundary test - maximum weight (150 lbs)
   Weight: 150 lbs, Distance: 500 miles, Service: Standard

3. Boundary test - shortest distance bracket
   Weight: 10 lbs, Distance: 50 miles, Service: Economy

4. Boundary test - longest distance bracket
   Weight: 25 lbs, Distance: 2800 miles, Service: Standard

5. Error case - weight too heavy
   Weight: 200 lbs, Distance: 500 miles, Service: Standard

6. Error case - invalid service tier
   Weight: 20 lbs, Distance: 500 miles, Service: Premium

7. Case insensitivity check
   Weight: 20 lbs, Distance: 500 miles, Service: STANDARD

For each test, confirm the results match expected values from test-cases.md
```

---

## Customization Examples

### Example 1: Different Rate Structure

"What if we wanted to add dimensional weight calculations?"

**Modify the skill:** Add length/width/height inputs and dimensional weight formula.

### Example 2: Additional Service Tiers

"What if we added 'Same Day' and 'Freight' service tiers?"

**Extend the skill:** Add new multipliers and update validation.

### Example 3: International Shipping

"How would we handle international vs domestic?"

**Approach:** Create separate skills or add destination country as an input parameter.

---

## Q&A Preparation

### Common Questions

**Q: Can this skill access our carrier's live rates?**
A: Not yet - this is a self-contained Skill. In Part 2 (Plugins), we'll show how to access external data sources via MCP.

**Q: How accurate are these rates?**
A: These are simplified educational rates. Real shipping pricing involves many more factors (fuel surcharges, residential delivery fees, dimensional weight, zone-based pricing, etc.).

**Q: Can we modify the skill for our specific carrier rates?**
A: Absolutely! The skill file is just markdown. You can customize rates, add inputs, change logic.

**Q: What happens if carrier rates change?**
A: Update the skill file. All future invocations use the new rates. This is a key advantage over hardcoded applications.

**Q: How does this compare to a traditional TMS (Transportation Management System)?**
A: This is much simpler - great for quotes and estimates. Production TMS systems have far more complexity, but this demonstrates the concept.

**Q: Can skills call other skills?**
A: Yes! Claude can orchestrate multiple skills within a conversation.

---

## Performance Benchmarking

For demonstrating speed:

```
Use the shipping-calculator skill to generate a complete rate card:

Weights: 10, 25, 50, 100, 150 lbs
Distances: 100, 500, 1000, 2500 miles
Service Tiers: Economy, Standard, Express

That's 5 weights × 4 distances × 3 service tiers = 60 quotes.

Generate all 60 and present in a structured format.
```

**Timing note:** A traditional customer service rep might take 30-45 minutes to manually calculate and format 60 quotes. The skill does this in seconds.

---

## Integration Examples

### Example 1: E-Commerce Integration

"Imagine a checkout page where customers select weight and destination. That page calls Claude with the shipping-calculator skill, returns instant shipping options with costs and delivery times."

### Example 2: Customer Service Chat

"Customer service reps chat with Claude. They say 'quote for 25 lbs to 500 miles, standard tier' and get instant calculations without leaving the conversation."

### Example 3: Batch Processing

"Overnight batch job processes 1,000 pending orders, calculates shipping costs for each using the skill, generates shipping labels."

---

## Wrap-Up

After any demo, close with:

"You've seen how a Claude Skill provides:
1. ✅ Instant calculations
2. ✅ Consistent methodology
3. ✅ Transparent logic
4. ✅ Professional output
5. ✅ Error handling
6. ✅ Delivery estimates

This is the foundation. In the next parts of this series, we'll show how Plugins add external data, Agent Teams add coordination, and Cowork adds full process orchestration."

---

*All demo scenarios use synthetic data for educational purposes. Rates are simplified and do not reflect actual carrier pricing.*
