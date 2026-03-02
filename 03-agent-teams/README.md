# Part 3: Agent Teams for Shipping Quote Generation

This directory demonstrates **Agent Teams** - the third level in Claude's capability progression. Agent Teams coordinate multiple specialized agents to handle complex tasks that benefit from different areas of expertise.

## What's in This Part

### Overview: From Plugin to Agent Teams

In Part 2 (Plugin), we extended our shipping calculator to access external data sources. But what happens when the task requires multiple specialized capabilities working together?

**Agent Teams** solve this by:
- Splitting complex tasks into specialized agent roles
- Coordinating communication between agents
- Managing sequential or parallel execution
- Each agent can access different skills and plugins

### The Shipping Quote Generation Team

Our example demonstrates a complete shipping quote generation system with three specialized agents:

#### 1. Package Assessment Agent
**Role:** Evaluates package characteristics and determines special handling requirements

**Responsibilities:**
- Analyzes package dimensions and weight distribution
- Identifies fragile or hazardous materials
- Determines special handling requirements
- Assesses packaging adequacy
- Calculates dimensional weight if applicable

**Inputs:** Package description, contents, dimensions
**Outputs:** Assessment report with handling requirements and surcharges

#### 2. Cost Calculation Agent
**Role:** Calculates accurate shipping costs based on package assessment

**Responsibilities:**
- Uses package assessment to determine applicable rates
- Accesses carrier rate tables (via Plugin)
- Applies service tier pricing
- Calculates surcharges for special handling
- Compares multiple carrier options

**Inputs:** Package assessment report, destination, service tier
**Outputs:** Detailed cost breakdown with multiple options

#### 3. Quote Generation Agent
**Role:** Creates professional shipping quotes for customers

**Responsibilities:**
- Formats cost information professionally
- Generates quote document with terms and conditions
- Includes delivery estimates and tracking information
- Adds insurance options and recommendations
- Creates customer-ready presentation

**Inputs:** Cost calculation results, customer information
**Outputs:** Professional shipping quote document

## How Agent Teams Work

### Sequential Coordination

```
Customer Request
      ↓
[Package Assessment Agent]
      ↓ (assessment report)
[Cost Calculation Agent]
      ↓ (cost breakdown)
[Quote Generation Agent]
      ↓
Final Quote Document
```

Each agent:
1. Receives input from previous agent
2. Performs its specialized task
3. Passes results to next agent
4. Handles errors in its domain

### Parallel Processing (Advanced)

For bulk quotes, agents can work in parallel:

```
Multiple Packages
      ↓
[Assessment Agent Pool] → Multiple assessments in parallel
      ↓
[Cost Calculation Pool] → Multiple calculations in parallel
      ↓
[Quote Generation Pool] → Multiple quotes in parallel
      ↓
Batch of Quote Documents
```

## Implementation Approaches

### Approach 1: Explicit Task Coordination (Demonstrated Here)

You explicitly define agent roles and coordinate their execution:

```
1. Launch Package Assessment Agent with package details
2. Wait for assessment results
3. Launch Cost Calculation Agent with assessment
4. Wait for cost results
5. Launch Quote Generation Agent with costs
6. Receive final quote
```

### Approach 2: Autonomous Team Coordination

Agents communicate and coordinate automatically (requires advanced orchestration).

## Setting Up Agent Teams

### Prerequisites

1. **Part 1 (Skill) completed** - Basic shipping calculator
2. **Part 2 (Plugin) completed** - MCP server with rate tables
3. **Claude Code** running in this directory

### Agent Configuration

We use Claude Code's Task tool to simulate agent specialization:

```markdown
# In your conversation with Claude Code:

"I need a shipping quote for:
- 25 lb package containing glassware
- 12x12x18 inch dimensions
- Destination: 800 miles
- Service tier: Standard

Use a three-agent team approach:
1. Package Assessment Agent
2. Cost Calculation Agent
3. Quote Generation Agent

Each agent should complete its role before the next begins."
```

## Quick Start

### 1. Basic Agent Team Demo

```
Generate a shipping quote using agent teams for this package:

Package Details:
- Contents: Electronics (laptop)
- Weight: 15 lbs
- Dimensions: 20x16x8 inches
- Destination: 1200 miles
- Service Tier: Express

Use three specialized agents:
1. Package Assessment Agent - evaluate the package
2. Cost Calculation Agent - calculate costs with the assessment
3. Quote Generation Agent - create the final quote

Show the handoff between each agent.
```

### 2. Multiple Package Comparison

```
I need quotes for three different shipping scenarios using agent teams:

Scenario A: Heavy machinery part (100 lbs, 1000 miles, Standard)
Scenario B: Fragile artwork (10 lbs, 500 miles, Express)
Scenario C: Documents (2 lbs, 200 miles, Economy)

For each scenario, use the three-agent team to generate complete quotes.
```

### 3. Complex Package Assessment

```
Use agent teams to quote this challenging package:

Package: Antique glass chandelier
Weight: 45 lbs
Dimensions: 36x36x48 inches
Fragile: Yes
Value: $5,000
Distance: 1500 miles
Service Tier: Express

The Package Assessment Agent should identify all special requirements.
The Cost Calculation Agent should apply appropriate surcharges.
The Quote Generation Agent should include insurance recommendations.
```

## Expected Output Example

### Agent 1: Package Assessment

```
PACKAGE ASSESSMENT REPORT
========================
Package ID: PKG-2026-001
Assessment Date: 2026-03-02

Package Characteristics:
- Contents: Electronics (laptop)
- Weight: 15 lbs
- Dimensions: 20x16x8 inches
- Dimensional Weight: 17.8 lbs (using DIM factor 139)
- Billable Weight: 17.8 lbs (higher of actual/dimensional)

Special Handling Requirements:
- FRAGILE: Electronics require careful handling
- SIGNATURE REQUIRED: High-value electronics
- Climate Control: Recommended for electronics

Surcharges Identified:
- Fragile handling: $15.00
- Signature confirmation: $5.00

Assessment Status: APPROVED FOR SHIPPING
Special Instructions: Use original manufacturer packaging if available.

→ Passing to Cost Calculation Agent
```

### Agent 2: Cost Calculation

```
COST CALCULATION BREAKDOWN
==========================
Based on Package Assessment: PKG-2026-001

Base Shipping Calculation:
- Billable Weight: 17.8 lbs
- Distance: 1200 miles (bracket: 1001-2000 miles)
- Base Rate: $1.75 per lb per 100 mi
- Service Tier: Express (multiplier: 1.50)

Base Cost: 17.8 lbs × 12 distance units × $1.75 × 1.50 = $560.70
Base Handling Fee: $5.00
Subtotal: $565.70

Special Handling Surcharges:
- Fragile handling: $15.00
- Signature confirmation: $5.00

TOTAL COST: $585.70

Service Level: Express
Estimated Delivery: 1-2 business days
Carrier Options:
1. FastShip Express: $585.70 (1 business day)
2. QuickDeliver Priority: $598.50 (1-2 business days, includes insurance)

→ Passing to Quote Generation Agent
```

### Agent 3: Quote Generation

```
═══════════════════════════════════════════════════
          SHIPPING QUOTE
═══════════════════════════════════════════════════

Quote Number: QTE-2026-001-EXPR
Date: March 2, 2026
Valid Until: March 9, 2026

PACKAGE INFORMATION
───────────────────
Contents: Electronics (laptop)
Weight: 15 lbs (Billable: 17.8 lbs dimensional)
Dimensions: 20" × 16" × 8"
Distance: 1200 miles

SERVICE DETAILS
───────────────
Service Tier: Express Shipping
Estimated Delivery: 1-2 business days
Tracking: Real-time tracking included
Signature: Required upon delivery

COST BREAKDOWN
──────────────
Base Shipping Cost:          $560.70
Base Handling Fee:             $5.00
Fragile Handling Surcharge:   $15.00
Signature Confirmation:        $5.00
                             ────────
TOTAL SHIPPING COST:         $585.70

SPECIAL HANDLING
────────────────
✓ Fragile item handling
✓ Climate-controlled transport (recommended)
✓ Signature required for delivery
✓ Original packaging recommended

INSURANCE OPTIONS
─────────────────
Basic Coverage (included):    Up to $100
Declared Value Coverage:      $5,000 - Add $25.00
Premium Insurance:            Full replacement - Add $45.00

CARRIER RECOMMENDATIONS
───────────────────────
• FastShip Express: $585.70 (1 business day)
  Best for time-sensitive deliveries

• QuickDeliver Priority: $598.50 (1-2 business days)
  Includes $5,000 insurance at no extra cost
  RECOMMENDED for high-value electronics

TERMS & CONDITIONS
──────────────────
• Quote valid for 7 days
• Prices subject to fuel surcharge adjustments
• Package must be ready for pickup
• Proper packaging required to maintain insurance validity

NEXT STEPS
──────────
To proceed with this shipment:
1. Confirm quote acceptance
2. Schedule pickup time
3. Ensure proper packaging
4. Select insurance option

Questions? Contact: quotes@shipping.example.com
═══════════════════════════════════════════════════
```

## Understanding Agent Coordination

### Key Concepts

1. **Agent Specialization**
   - Each agent has a focused responsibility
   - Agents use different skills and knowledge bases
   - No single agent handles everything

2. **Data Handoffs**
   - Agents pass structured data to each other
   - Each agent validates its inputs
   - Clear interfaces between agents

3. **Error Handling**
   - Each agent can fail independently
   - Errors are caught and reported at agent level
   - Failed agents can retry or escalate

4. **State Management**
   - Each agent maintains its own state
   - Shared context passed through data structures
   - Coordinator tracks overall progress

## Advantages of Agent Teams

### vs. Single Agent (Skill)
- ✅ Handles complex, multi-step processes
- ✅ Each agent can specialize deeply
- ✅ Easier to test and debug individual agents
- ✅ Can parallelize independent work

### vs. Plugin Alone
- ✅ Better organization for complex logic
- ✅ Multiple specialized knowledge bases
- ✅ Clearer separation of concerns
- ✅ Each agent can use different plugins

### When to Use Agent Teams

Use Agent Teams when:
- Task naturally splits into distinct subtasks
- Different subtasks require different expertise
- You need parallel processing
- Single agent becomes too complex
- You want modular, testable components

Stay with Plugin/Skill when:
- Task is relatively simple
- Single area of expertise sufficient
- No benefit from parallelization
- Overhead of coordination not worth it

## Extending the Example

### Additional Agents You Could Add

1. **Route Optimization Agent**
   - Determines optimal carrier routing
   - Considers transfer points
   - Minimizes handling events

2. **Risk Assessment Agent**
   - Evaluates shipping risks
   - Recommends insurance levels
   - Identifies potential delivery issues

3. **Compliance Agent**
   - Checks regulatory requirements
   - Validates hazmat classifications
   - Ensures customs documentation

4. **Customer Communication Agent**
   - Sends confirmation emails
   - Provides tracking updates
   - Handles delivery notifications

## Testing Agent Teams

See `test-cases.md` for comprehensive test scenarios including:
- Single package quotes
- Multi-package batch processing
- Error handling across agents
- Complex package assessments
- Service tier comparisons

## Performance Considerations

### Sequential Processing
- Pros: Simple, predictable, easier to debug
- Cons: Slower for multiple packages
- Best for: Single quotes, complex assessments

### Parallel Processing
- Pros: Much faster for bulk operations
- Cons: More complex coordination, resource intensive
- Best for: Batch quotes, multiple simple packages

## Next Steps

Once you've tested agent teams:
1. **Read the blog post:** `../blog-part-3-agent-teams.md`
2. **Experiment:** Try adding a fourth agent
3. **Optimize:** Implement parallel processing for bulk quotes
4. **Prepare for Part 4:** Cowork orchestration

## Key Takeaways

1. **Agent Teams coordinate specialists** - Don't make one agent do everything
2. **Clear interfaces are critical** - Agents need well-defined inputs/outputs
3. **Each agent can fail independently** - Build robust error handling
4. **Coordination has overhead** - Only use teams when complexity justifies it
5. **Teams enable parallelization** - Big performance gains for bulk work

## Files in This Directory

```
03-agent-teams/
├── README.md           (this file)
├── test-cases.md       (test scenarios)
├── demo-script.md      (demonstration scenarios)
└── examples/           (example outputs)
```

## Related Blog Post

See `../blog-part-3-agent-teams.md` for the full tutorial and explanation.

---

**Educational Note:** This demonstrates agent coordination concepts. Production implementations would include more sophisticated error handling, retry logic, monitoring, and optimization.
