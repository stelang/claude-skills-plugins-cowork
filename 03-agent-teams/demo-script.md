# Agent Teams Demo Script

Ready-to-use prompts for demonstrating the three-agent shipping quote generation system.

---

## Quick Demo (5 minutes)

### Demo 1: Basic Agent Team Coordination

**Prompt:**
```
I need a shipping quote using a three-agent team approach.

Package Details:
- Contents: Laptop computer
- Weight: 15 lbs
- Dimensions: 20×16×8 inches
- Destination: 1200 miles away
- Service Tier: Express

Please coordinate three specialized agents:

1. Package Assessment Agent
   - Evaluate package characteristics
   - Calculate dimensional weight
   - Identify special handling requirements
   - Determine applicable surcharges

2. Cost Calculation Agent
   - Use assessment results
   - Apply rate tables from distance brackets
   - Calculate service tier adjustments
   - Generate cost breakdown

3. Quote Generation Agent
   - Create professional quote document
   - Include insurance options
   - Add delivery estimates
   - Format with terms and conditions

Show the handoff between each agent clearly.
```

**What to highlight:**
- Clear separation of responsibilities
- Data flowing from one agent to the next
- Each agent's specialized focus
- Professional final output

---

### Demo 2: Complex Package Requiring Multiple Assessments

**Prompt:**
```
Generate a shipping quote using agent teams for this challenging package:

Package Details:
- Contents: Antique glass chandelier
- Weight: 45 lbs
- Dimensions: 36×36×48 inches
- Fragile: YES
- Declared Value: $5,000
- Distance: 1500 miles
- Service Tier: Express

Use the three-agent team. The Package Assessment Agent should identify all special requirements, the Cost Calculation Agent should apply appropriate surcharges, and the Quote Generation Agent should emphasize insurance recommendations.
```

**What to highlight:**
- Package Assessment Agent identifies multiple risk factors
- Cost Calculation Agent handles complex surcharge aggregation
- Quote Generation Agent provides clear risk management guidance
- Coordination handles complexity well

---

### Demo 3: Service Tier Comparison

**Prompt:**
```
I need to compare shipping costs across all service tiers using agent teams.

Package Details:
- Contents: Industrial equipment part
- Weight: 50 lbs
- Dimensions: 24×20×18 inches
- Distance: 800 miles

Run the three-agent team THREE TIMES:
1. First with Economy service tier
2. Then with Standard service tier
3. Finally with Express service tier

Show all three complete quotes so I can compare costs and delivery times.
```

**What to highlight:**
- Agent teams can generate multiple scenarios
- Comparison shopping capability
- Cost vs. speed tradeoffs
- Helps customers make informed decisions

---

## Extended Demo (10 minutes)

### Demo 4: Multi-Package Bulk Quote

**Prompt:**
```
I need quotes for three different packages being shipped to the same region. Use agent teams to process all three:

Package A - Documents:
- Weight: 2 lbs
- Dimensions: 12×9×2 inches
- Distance: 500 miles
- Service Tier: Economy

Package B - Electronics:
- Weight: 25 lbs
- Dimensions: 20×16×12 inches
- Distance: 500 miles
- Service Tier: Standard

Package C - Urgent Samples:
- Weight: 8 lbs
- Dimensions: 14×10×6 inches
- Distance: 500 miles
- Service Tier: Express

Process each through the three-agent team and provide all three quotes. Also note if consolidation might save costs.
```

**What to highlight:**
- Agent teams handle batch processing
- Can identify optimization opportunities
- Maintains quality across multiple packages
- Suitable for high-volume quote generation

---

### Demo 5: Error Handling - Oversized Package

**Prompt:**
```
Test error handling with agent teams:

Package Details:
- Contents: Lightweight but bulky item (lampshade)
- Weight: 8 lbs
- Dimensions: 48×48×36 inches (very large!)
- Distance: 600 miles
- Service Tier: Standard

Run this through the three-agent team. The Package Assessment Agent should identify the dimensional weight issue and determine if this is even suitable for parcel shipping.
```

**What to highlight:**
- Package Assessment Agent catches the problem
- Dimensional weight calculation (596 lbs for 8 lb item!)
- Agent provides helpful guidance
- May recommend alternative shipping method
- Graceful error handling

---

## Business Stakeholder Demo (7 minutes)

Use this script when presenting to business leaders.

### Opening (1 minute)

"In Part 2, we showed how Plugins give Claude access to external data. But complex tasks require more than just data access - they need coordination. That's where Agent Teams come in.

Today I'll demonstrate a three-agent team that generates shipping quotes. Each agent has a specialized role, and they coordinate to handle complexity that would overwhelm a single agent."

### Demo Flow (4 minutes)

**Step 1: Simple Case (1 min)**
```
Generate a shipping quote using agent teams:
- Package: 25 lbs, 800 miles, Standard tier

Use three agents:
1. Package Assessment Agent
2. Cost Calculation Agent
3. Quote Generation Agent
```

"Notice how each agent focuses on its specialty. The assessment agent evaluates the package, the cost agent does calculations, and the quote agent creates the document. Clean separation of concerns."

**Step 2: Complex Case (2 min)**
```
Now a complex package using the same agent team:
- Fragile artwork, 25 lbs, 40×30×6 inches
- Declared value: $8,000
- Distance: 1500 miles, Express tier
```

"See how the agents handle complexity? The assessment agent identifies multiple risk factors. The cost agent aggregates surcharges. The quote agent emphasizes insurance. Each agent contributes its expertise."

**Step 3: Batch Processing (1 min)**
```
Generate quotes for three different packages using agent teams.
[Provide three varied packages]
```

"Agent teams scale. Whether it's one quote or a hundred, the same coordination pattern works."

### Business Value (2 minutes)

**Current State:**
- Customer service rep gathers package details
- Checks multiple rate tables manually
- Calculates costs in spreadsheet
- Copies information into quote template
- 10-15 minutes per quote
- Error-prone with complex packages

**With Agent Teams:**
- Rep provides package details to system
- Agent team handles assessment, calculation, generation
- Professional quote ready in 30 seconds
- Consistent quality and accuracy
- Complex packages handled same as simple ones
- Reps can handle 20-30x more quotes

**ROI Scenario:**
- Call center: 50 reps generating 20 quotes/day each = 1,000 quotes/day
- Current: 10 min/quote = 10,000 minutes = 166 hours/day
- With Agent Teams: 0.5 min/quote = 500 minutes = 8.3 hours/day
- Time Savings: 157 hours/day = 3,400 hours/month
- At $25/hour = **$85,000/month in labor savings**
- Plus: faster quotes = better customer experience = higher conversion

### Closing

"This is just quote generation. Imagine agent teams for:
- Claims processing (Investigation Agent + Assessment Agent + Payment Agent)
- Order fulfillment (Inventory Agent + Routing Agent + Shipping Agent)
- Customer support (Triage Agent + Resolution Agent + Follow-up Agent)

In Part 4, we'll show Cowork - which orchestrates even more complex processes automatically."

---

## Technical Demo (10 minutes)

For developer and architect audiences.

### Technical Architecture (2 minutes)

"Let's look at the agent team architecture:

```
Input → Coordinator
         ↓
      [Package Assessment Agent]
         ↓ (assessment data structure)
      [Cost Calculation Agent]
         ↓ (cost breakdown structure)
      [Quote Generation Agent]
         ↓
      Output
```

Each agent:
- Has a defined interface (input/output schema)
- Can fail independently
- Uses different tools/plugins
- Maintains its own state
- Reports progress to coordinator

The coordinator:
- Routes data between agents
- Handles errors
- Manages retries
- Tracks overall progress"

### Live Coding Demo (4 minutes)

**Show the implementation:**

```
"Let me show you how to invoke agent teams:

Agent 1 - Package Assessment:
- Takes raw package details
- Outputs structured assessment
- Identifies: dimensional weight, special handling, surcharges

Agent 2 - Cost Calculation:
- Takes assessment output
- Accesses rate tables (via Plugin from Part 2)
- Outputs cost breakdown

Agent 3 - Quote Generation:
- Takes cost output
- Formats professional document
- Adds terms, conditions, insurance options
```

**Run a test case:**
```
[Run Demo 1 from Quick Demo section]
```

**Show the data flow:**
"Notice the structured data passing between agents. Agent 1 outputs JSON-like data, Agent 2 consumes it, outputs its own structure, Agent 3 consumes that."

### Advanced Patterns (2 minutes)

**Parallel Processing:**
```
"For multiple packages, we can parallelize:

Packages A, B, C
     ↓
[Assessment Agent Pool] → Three assessments in parallel
     ↓
[Cost Calculation Pool] → Three calculations in parallel
     ↓
[Quote Generation Pool] → Three quotes in parallel
     ↓
Three quotes in ~same time as one
```

**Error Recovery:**
```
"Each agent can implement retry logic:

try:
    assessment = PackageAssessmentAgent(package_details)
except DimensionalWeightError:
    suggest_freight_shipping()
except InvalidPackageError:
    request_additional_info()
```

**Agent Specialization:**
```
"You can create specialized variants:

- InternationalShippingAssessmentAgent (adds customs)
- HazmatCostCalculationAgent (regulatory fees)
- EnterpriseQuoteGenerationAgent (volume discounts)
```

### Q&A Topics (2 minutes)

**Q: How is this different from a monolithic function?**
A: Modularity, testability, parallel execution, independent failure modes, easier to maintain.

**Q: What's the performance overhead?**
A: Minimal for sequential, significant speedup for parallel. Coordination adds ~100ms, parallelization saves seconds/minutes.

**Q: Can agents use different models?**
A: Yes! Assessment agent could use a fast model, cost calculation a specialized model, quote generation a creativity-focused model.

**Q: How do you test agent teams?**
A: Unit test each agent independently, integration test the flow, use mock data for consistent testing.

**Q: When would you NOT use agent teams?**
A: Simple tasks, no parallelization benefit, coordination overhead too high, single area of expertise sufficient.

---

## Comparison Demonstrations

### Demo: Agent Teams vs. Single Agent

**Single Agent Approach:**
```
Calculate a shipping quote for: 25 lbs, 800 miles, Standard tier.
Include assessment, costs, and formatted quote.
```

**Agent Team Approach:**
```
Use three specialized agents to generate the same quote:
1. Package Assessment Agent
2. Cost Calculation Agent
3. Quote Generation Agent

Package: 25 lbs, 800 miles, Standard tier
```

**Compare:**
- Single agent: Works, but mixes concerns, harder to maintain
- Agent teams: Clear separation, easier to debug, each agent testable

### Demo: Agent Teams vs. Plugin Alone

**Plugin Alone:**
```
Use the shipping-calculator plugin to get rates for:
25 lbs, 800 miles, Standard tier.
```

**Agent Teams with Plugin:**
```
Use agent teams where Cost Calculation Agent uses the plugin:
[Same package details]
```

**Compare:**
- Plugin alone: Returns data, you format it
- Agent teams: Coordinates assessment, uses plugin for data, generates formatted output
- Agent teams add orchestration layer

---

## Real-World Scenario Demonstrations

### Scenario 1: Customer Service Call Center

**Setup:**
"You're a customer service rep. Customer calls asking for a quote."

**Interaction:**
```
Customer details:
- Shipping a home theater system (electronics)
- Weight: 65 lbs
- Dimensions: 48×36×24 inches
- Going 950 miles
- Needs it within 2 days (Express)

Generate quote using agent teams.
```

**Outcome:**
- Rep provides details
- Agent team generates professional quote in 30 seconds
- Rep reads quote to customer
- Customer approves, shipment booked

**Impact:** Rep handled call in 3 minutes vs. 15 minutes manually.

---

### Scenario 2: E-commerce Checkout

**Setup:**
"Customer is checking out with shopping cart items."

**Interaction:**
```
Shopping cart:
- Item 1: Books (8 lbs)
- Item 2: Kitchen appliance (22 lbs)
- Item 3: Glassware (fragile, 12 lbs)
Total: 42 lbs, 14×18×24 inches combined
Destination: 630 miles
Service options: Need all three tiers for comparison

Use agent teams to generate three quotes (Economy, Standard, Express).
```

**Outcome:**
- System generates three options
- Customer sees: $67 (7-10 days), $84 (3-5 days), $126 (1-2 days)
- Customer selects based on urgency vs. cost
- Increases conversion with transparent options

---

### Scenario 3: Small Business Shipping Manager

**Setup:**
"You manage shipping for a small business. Daily task: quote today's orders."

**Interaction:**
```
Today's orders (5 packages):
1. 15 lbs, 400 miles, Standard
2. 8 lbs, 800 miles, Express
3. 35 lbs, 200 miles, Economy
4. 52 lbs, 1100 miles, Standard
5. 22 lbs, 650 miles, Express

Use agent teams to generate all five quotes.
```

**Outcome:**
- All five quotes generated in under 2 minutes
- Manager reviews, approves, schedules pickups
- Task that took 45 minutes now takes 5 minutes

---

## Troubleshooting Demonstrations

### Demo: What If Package Assessment Fails?

**Prompt:**
```
Test error handling: Package with missing dimensions.

Package Details:
- Weight: 20 lbs
- Dimensions: NOT PROVIDED
- Distance: 600 miles
- Service Tier: Standard

Show how the Package Assessment Agent handles this.
```

**Expected:** Agent requests missing information or proceeds with assumption + warning.

---

### Demo: What If Cost Calculation Plugin Fails?

**Prompt:**
```
Simulate the shipping-calculator plugin being unavailable.
How does the Cost Calculation Agent handle this?

Package: 25 lbs, 800 miles, Standard tier
```

**Expected:** Agent detects failure, either uses fallback rates with warning, or returns clear error.

---

## Performance Demonstrations

### Sequential vs. Parallel

**Sequential Processing (current):**
```
Time 5 packages sequentially through agent team.
Measure total time.
```

**Parallel Processing (future):**
```
Time 5 packages in parallel through agent team pools.
Compare to sequential time.
```

**Expected Results:**
- Sequential: ~25-30 seconds (5-6 sec per package)
- Parallel: ~8-10 seconds (3x faster)

---

## Customization Demonstrations

### Demo: Adding a Fourth Agent

**Prompt:**
```
Extend the agent team to include a fourth agent:

1. Package Assessment Agent (existing)
2. Route Optimization Agent (NEW)
   - Determines optimal carrier routing
   - Identifies transfer points
   - Minimizes handling events
3. Cost Calculation Agent (existing)
4. Quote Generation Agent (existing)

Test with: 75 lbs, 1400 miles, Standard tier
```

**What to highlight:**
- Agent teams are extensible
- New agents integrate into workflow
- Each agent adds value

---

### Demo: Specialized Assessment Agent

**Prompt:**
```
Create a specialized HazmatAssessmentAgent for:

Package: Lithium battery shipment
- Weight: 30 lbs
- Dimensions: 18×18×12 inches
- Contains: Lithium-ion batteries (hazmat class 9)
- Distance: 900 miles
- Service Tier: Standard

The HazmatAssessmentAgent should check regulations, packaging requirements, and carrier restrictions before passing to cost calculation.
```

**What to highlight:**
- Domain-specific agents for specialized needs
- Complex compliance handled by expert agent
- Regular agents don't need hazmat knowledge

---

## Key Talking Points

Throughout any demo, emphasize:

1. **Separation of Concerns** - Each agent does ONE thing well
2. **Scalability** - Handles 1 package or 1000 packages
3. **Maintainability** - Update one agent without touching others
4. **Testability** - Test agents independently
5. **Extensibility** - Add new agents without breaking existing ones
6. **Error Handling** - Failures are isolated and managed
7. **Parallelization** - Performance gains for bulk operations
8. **Specialization** - Each agent has deep expertise

---

## Next Steps After Demo

1. **Try it yourself:** Use the test cases in `test-cases.md`
2. **Extend it:** Add a fourth agent (route optimization, risk assessment, etc.)
3. **Optimize it:** Implement parallel processing for bulk quotes
4. **Prepare for Part 4:** Cowork will orchestrate even more complex processes

---

**Demo Tip:** Always show the data flow between agents clearly. The power of agent teams is in the coordination, so make that visible!
