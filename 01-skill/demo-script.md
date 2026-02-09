# Premium Calculator Skill - Demo Script

This script provides ready-to-copy prompts for demonstrating the premium-calculator skill.

## Quick Demo (5 minutes)

Copy and paste these prompts into Claude Code to demonstrate the skill.

---

### Demo 1: Basic Calculation

```
Use the premium-calculator skill to calculate a quote for:
- Age: 35
- Coverage: $500,000
- Health Class: Preferred
```

**What to highlight:**
- Fast, accurate calculation
- Professional formatted output
- Shows calculation breakdown

---

### Demo 2: High-Risk Scenario

```
Use the premium-calculator skill for this applicant:
- Age: 65
- Coverage: $250,000
- Health Class: Substandard
```

**What to highlight:**
- Higher rates for older age + substandard health
- Transparent rate multipliers
- Clear risk-based pricing

---

### Demo 3: Multiple Quotes Comparison

```
Use the premium-calculator skill to generate three quotes for comparison:

Quote 1:
- Age: 40
- Coverage: $500,000
- Health Class: Preferred

Quote 2:
- Age: 40
- Coverage: $500,000
- Health Class: Standard

Quote 3:
- Age: 40
- Coverage: $500,000
- Health Class: Substandard

Show all three results so we can compare how health class affects pricing.
```

**What to highlight:**
- Same age and coverage, only health class varies
- Clear demonstration of health class impact
- 15% discount for Preferred vs Standard
- 35% surcharge for Substandard vs Standard

---

### Demo 4: Error Handling

```
Use the premium-calculator skill to calculate:
- Age: 85
- Coverage: $100,000
- Health Class: Standard
```

**What to highlight:**
- Graceful error handling
- Clear validation message
- Explains the constraint (age must be 18-80)

---

### Demo 5: Coverage Comparison

```
Use the premium-calculator skill to show how coverage amount affects premiums:

Scenario 1:
- Age: 45
- Coverage: $250,000
- Health Class: Standard

Scenario 2:
- Age: 45
- Coverage: $500,000
- Health Class: Standard

Scenario 3:
- Age: 45
- Coverage: $1,000,000
- Health Class: Standard

Compare the monthly premiums to show the linear relationship.
```

**What to highlight:**
- Linear scaling with coverage amount
- Doubling coverage = doubling premium
- Helps clients understand cost of additional coverage

---

## Extended Demo (10 minutes)

### Comprehensive Quote Analysis

```
I need to prepare quotes for an insurance presentation. Use the premium-calculator skill to generate a complete rate sheet for a 45-year-old applicant across all health classes and common coverage amounts:

Coverage amounts: $100,000, $250,000, $500,000, $1,000,000
Health classes: Preferred, Standard, Substandard

Generate all 12 combinations and present them in a comparison format.
```

**What to highlight:**
- Skill can handle batch requests
- Demonstrates full rate card
- Shows price sensitivity to both coverage and health class
- Professional presentation suitable for client meetings

---

## Executive Demo Script

Use this for presenting to business stakeholders.

### Opening (1 minute)

"Today I'll show you a Claude Skill that automates premium calculations. This is the foundation - in later demos, we'll extend this with live data (Plugins), coordinate it with other agents (Agent Teams), and orchestrate full business processes (Cowork)."

### Demo Flow (3 minutes)

**Step 1: Single quote**
```
Use the premium-calculator skill to calculate:
- Age: 45
- Coverage: $500,000
- Health Class: Standard
```

"Notice the instant calculation, transparent breakdown, and professional formatting."

**Step 2: Comparison scenario**
```
Use the premium-calculator skill to compare:

Option A - Lower coverage:
- Age: 45, Coverage: $250,000, Health Class: Standard

Option B - Higher coverage:
- Age: 45, Coverage: $1,000,000, Health Class: Standard

Show both monthly and annual premiums for comparison.
```

"This demonstrates how agents can handle comparative analysis automatically."

**Step 3: Error handling**
```
Use the premium-calculator skill:
- Age: 17
- Coverage: $100,000
- Health Class: Standard
```

"Even with invalid inputs, the skill provides clear guidance."

### Business Value Talking Points (2 minutes)

**Current State:**
- Agent looks up rate manual
- Uses calculator or spreadsheet
- Manual data entry errors possible
- Takes 3-5 minutes per quote

**With Skill:**
- Instant calculation
- Zero data entry errors
- Consistent methodology
- Can generate dozens of scenarios in seconds
- Foundation for automation

**ROI Example:**
- Agent generates 20 quotes/day
- Current: 60-100 minutes
- With Skill: 5-10 minutes
- Time savings: 50-90 minutes/day/agent
- For 10 agents: 8-15 hours/day saved

### Closing (1 minute)

"This is just the beginning. In our next demo, we'll show how Plugins extend this to use live rate tables from your systems. Then Agent Teams will coordinate underwriting, pricing, and proposal generation. Finally, Cowork will orchestrate the entire quote-to-issue process."

---

## Technical Demo Script

Use this for technical audiences (developers, architects).

### Architecture Overview (2 minutes)

"A Claude Skill is essentially a prompt template with structured instructions. Let's look at the implementation."

**Show the skill file:** `.claude/skills/premium-calculator.md`

**Highlight:**
- Frontmatter with description (enables discoverability)
- Clear input specification
- Deterministic calculation logic
- Structured output format
- Validation rules

### Live Demo (5 minutes)

**Demo 1: Basic invocation**
```
Use the premium-calculator skill:
Age=35, Coverage=$500,000, Health Class=Preferred
```

**Demo 2: Show the calculation breakdown**
"Notice how it shows every step: base rate → multiplier → adjusted rate → premium. This transparency is crucial for regulated industries."

**Demo 3: Batch processing**
```
Use the premium-calculator skill to generate quotes for ages 25, 35, 45, 55, and 65, all with $500,000 coverage and Standard health class. Show how premiums increase with age.
```

**Demo 4: Integration example**
"In a real application, you could invoke this skill from:
- A chat interface for agents
- An API endpoint
- A workflow automation
- As part of a larger Agent Team"

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
- Read rate tables from Excel/database
- Fetch mortality data from APIs
- Access underwriting guidelines

**→ Agent Teams:** Coordinate with other agents
- Underwriting Agent assesses risk
- Pricing Agent (this skill) calculates premium
- Proposal Agent generates documents

**→ Cowork:** Full process orchestration
- Handle multi-applicant scenarios
- Generate comparison reports
- Create presentation materials
- Integrate with CRM/policy systems"

---

## Testing Demo

For demonstrating test coverage:

```
I want to thoroughly test the premium-calculator skill. Run these test scenarios:

1. Boundary test - youngest age (18)
   Age: 18, Coverage: $50,000, Health: Standard

2. Boundary test - oldest age (80)
   Age: 80, Coverage: $50,000, Health: Standard

3. Minimum coverage
   Age: 30, Coverage: $50,000, Health: Standard

4. Maximum common coverage
   Age: 40, Coverage: $5,000,000, Health: Preferred

5. Error case - age too young
   Age: 15, Coverage: $100,000, Health: Standard

6. Error case - coverage too low
   Age: 40, Coverage: $25,000, Health: Standard

7. Case insensitivity check
   Age: 40, Coverage: $100,000, Health: PREFERRED

For each test, confirm the results match expected values from test-cases.md
```

---

## Customization Examples

### Example 1: Different Rate Structure

"What if we wanted to use monthly rates instead of annual brackets?"

**Modify the skill:** Update the age brackets and formulas.

### Example 2: Additional Health Classes

"What if we added 'Super Preferred' and 'Rated' health classes?"

**Extend the skill:** Add new multipliers and update validation.

### Example 3: Product Variations

"How would we handle term life vs whole life?"

**Approach:** Create separate skills or add product type as an input parameter.

---

## Q&A Preparation

### Common Questions

**Q: Can this skill access our company's rate tables?**
A: Not yet - this is a self-contained Skill. In Part 2 (Plugins), we'll show how to access external data sources via MCP.

**Q: How accurate are these rates?**
A: These are simplified educational rates. Real insurance pricing involves many more factors (medical underwriting, mortality tables, expenses, etc.).

**Q: Can we modify the skill for our specific products?**
A: Absolutely! The skill file is just markdown. You can customize rates, add inputs, change logic.

**Q: What happens if calculation logic changes?**
A: Update the skill file. All future invocations use the new logic. This is a key advantage over hardcoded applications.

**Q: How does this compare to a traditional rating engine?**
A: This is much simpler - great for quotes and estimates. Production rating engines have far more complexity, but this demonstrates the concept.

**Q: Can skills call other skills?**
A: Yes! Claude can orchestrate multiple skills within a conversation.

---

## Performance Benchmarking

For demonstrating speed:

```
Use the premium-calculator skill to generate a complete rate card:

Ages: 25, 35, 45, 55, 65
Coverage: $100K, $250K, $500K, $1M
Health Classes: Preferred, Standard, Substandard

That's 5 ages × 4 coverage amounts × 3 health classes = 60 quotes.

Generate all 60 and present in a structured format.
```

**Timing note:** A traditional agent might take 30-60 minutes to manually calculate and format 60 quotes. The skill does this in seconds.

---

## Integration Examples

### Example 1: Web Form Integration

"Imagine a web form where customers enter age, coverage, and health info. That form calls Claude with the premium-calculator skill, returns instant quotes."

### Example 2: Agent Chat Interface

"Insurance agents chat with Claude. They say 'quote for age 45, $500K, standard' and get instant calculations without leaving the conversation."

### Example 3: Batch Processing

"Overnight batch job processes 1,000 pending applications, calculates premiums for each using the skill, generates proposal documents."

---

## Wrap-Up

After any demo, close with:

"You've seen how a Claude Skill provides:
1. ✅ Instant calculations
2. ✅ Consistent methodology
3. ✅ Transparent logic
4. ✅ Professional output
5. ✅ Error handling

This is the foundation. In the next parts of this series, we'll show how Plugins add external data, Agent Teams add coordination, and Cowork adds full process orchestration."

---

*All demo scenarios use synthetic data for educational purposes. Rates are simplified and do not reflect actual insurance industry pricing.*
