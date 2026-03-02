# Agent Teams Test Cases

Comprehensive test scenarios for the three-agent shipping quote generation system.

---

## Test Category 1: Basic Sequential Coordination

### Test Case 1.1: Standard Electronics Package

**Objective:** Verify basic agent team coordination for a straightforward package.

**Input:**
```
Package: Laptop computer
Weight: 15 lbs
Dimensions: 20x16x8 inches
Distance: 1200 miles
Service Tier: Express
```

**Expected Agent Behaviors:**

**Package Assessment Agent:**
- Identifies electronics content
- Calculates dimensional weight (17.8 lbs using DIM factor 139)
- Recommends signature confirmation
- Adds fragile handling requirement
- Passes assessment to Cost Calculation Agent

**Cost Calculation Agent:**
- Uses billable weight (17.8 lbs dimensional)
- Applies 1001-2000 mile bracket rate ($1.75)
- Applies Express multiplier (1.50)
- Adds surcharges for fragile + signature
- Passes cost breakdown to Quote Generation Agent

**Quote Generation Agent:**
- Creates formatted quote
- Includes insurance options
- Shows delivery estimate (1-2 business days)
- Adds terms and conditions

**Expected Total Cost:** ~$585-610 (base + surcharges)

---

### Test Case 1.2: Simple Document Shipment

**Objective:** Test lightweight, non-complex package with minimal surcharges.

**Input:**
```
Package: Business documents
Weight: 2 lbs
Dimensions: 12x9x2 inches
Distance: 200 miles
Service Tier: Economy
```

**Expected Agent Behaviors:**

**Package Assessment Agent:**
- Identifies low-risk documents
- No dimensional weight issues (actual < dimensional)
- No special handling required
- No surcharges needed

**Cost Calculation Agent:**
- Uses actual weight (2 lbs)
- Applies 101-300 mile bracket rate ($0.75)
- Applies Economy multiplier (0.80)
- Minimal total cost

**Quote Generation Agent:**
- Simple quote format
- Economy service details (7-10 business days)
- Basic insurance only

**Expected Total Cost:** ~$8-12

---

### Test Case 1.3: Heavy Machinery Part

**Objective:** Test maximum weight capacity and appropriate rate application.

**Input:**
```
Package: Industrial pump component
Weight: 150 lbs
Dimensions: 24x24x36 inches
Distance: 800 miles
Service Tier: Standard
```

**Expected Agent Behaviors:**

**Package Assessment Agent:**
- Identifies heavy industrial equipment
- Calculates dimensional weight
- Recommends pallet shipping
- May add handling surcharge for weight
- Checks if special equipment needed

**Cost Calculation Agent:**
- Uses actual weight (150 lbs - likely exceeds dimensional)
- Applies 601-1000 mile bracket rate ($1.35)
- Standard multiplier (1.0)
- Adds heavy item surcharge if applicable

**Quote Generation Agent:**
- Includes freight handling notes
- Mentions liftgate delivery options
- Recommends higher insurance

**Expected Total Cost:** ~$1650-1700

---

## Test Category 2: Complex Package Assessment

### Test Case 2.1: Fragile High-Value Artwork

**Objective:** Test sophisticated assessment with multiple special requirements.

**Input:**
```
Package: Framed oil painting
Weight: 25 lbs
Dimensions: 40x30x6 inches
Fragile: Yes
Declared Value: $8,000
Distance: 1500 miles
Service Tier: Express
```

**Expected Agent Behaviors:**

**Package Assessment Agent:**
- CRITICAL: Identifies fragile fine art
- Requires custom crating assessment
- Mandatory signature + photo confirmation
- Climate control recommended
- Insurance required given value
- May require white-glove service

**Cost Calculation Agent:**
- Applies premium fragile surcharge ($25-50)
- Express service premium
- Climate control fee if needed
- Signature + photo confirmation fee
- Insurance calculation based on $8,000 value

**Quote Generation Agent:**
- Emphasizes special handling procedures
- Details insurance options clearly
- Recommends premium carrier with art experience
- Includes packaging requirements

**Expected Total Cost:** ~$850-950 (with high-value surcharges)

---

### Test Case 2.2: Hazmat Classification

**Objective:** Test handling of packages requiring compliance assessment.

**Input:**
```
Package: Lithium battery shipment (for equipment)
Weight: 30 lbs
Dimensions: 18x18x12 inches
Contains: Lithium-ion batteries
Distance: 900 miles
Service Tier: Standard
```

**Expected Agent Behaviors:**

**Package Assessment Agent:**
- CRITICAL: Identifies lithium batteries (hazmat class 9)
- Requires hazmat certification verification
- Must use approved packaging
- Air shipping may be restricted
- Ground transport only
- Special labeling required

**Cost Calculation Agent:**
- Adds hazmat handling surcharge (significant)
- May limit carrier options
- Applies regulatory compliance fees
- Calculates with ground-only restriction

**Quote Generation Agent:**
- Lists hazmat requirements prominently
- Details packaging/labeling requirements
- Notes certifications needed
- May decline or require pre-approval

**Expected Total Cost:** ~$450-550 (with hazmat fees)

---

### Test Case 2.3: Oversized Package Assessment

**Objective:** Test dimensional weight and special handling for large packages.

**Input:**
```
Package: Large but lightweight (lampshade)
Weight: 8 lbs
Dimensions: 48x48x36 inches
Distance: 600 miles
Service Tier: Standard
```

**Expected Agent Behaviors:**

**Package Assessment Agent:**
- Identifies significant dimensional weight issue
- Actual weight: 8 lbs
- Dimensional weight: 48×48×36/139 = 596 lbs!
- CRITICAL: Likely needs freight classification
- May require alternative shipping method

**Cost Calculation Agent:**
- Must use dimensional weight (596 lbs)
- Or recommend freight classification
- Standard parcel shipping may not be appropriate
- Significant cost due to dimensions

**Quote Generation Agent:**
- Explains dimensional weight clearly
- May recommend repackaging
- Suggests freight options
- Cost comparison needed

**Expected Total Cost:** High due to dimensional weight, or freight quote

---

## Test Category 3: Multi-Package Coordination

### Test Case 3.1: Three Packages Different Tiers

**Objective:** Test parallel processing of multiple packages with different service levels.

**Input:**
```
Package A: Documents, 2 lbs, 200 miles, Economy
Package B: Electronics, 15 lbs, 800 miles, Standard
Package C: Urgent samples, 5 lbs, 500 miles, Express
```

**Expected Behavior:**
- All three Package Assessment Agents work in parallel (or sequentially)
- Each generates its own assessment
- Cost Calculation Agents process each independently
- Quote Generation Agents create three separate quotes
- Final output: Three complete quotes for comparison

**Expected Costs:**
- Package A: ~$8-12
- Package B: ~$180-220
- Package C: ~$95-115

---

### Test Case 3.2: Bulk Quote Request (5 packages)

**Objective:** Test agent team efficiency with bulk processing.

**Input:** Five packages to same destination (1000 miles), all Standard tier
```
Package 1: 10 lbs, 12x12x12 inches
Package 2: 15 lbs, 16x14x10 inches
Package 3: 25 lbs, 20x20x15 inches
Package 4: 50 lbs, 24x24x20 inches
Package 5: 75 lbs, 30x30x24 inches
```

**Expected Behavior:**
- Process all five packages through agent team
- Consider consolidation options
- Bulk discount may apply
- Single coordinated shipment vs. individual quotes

**Expected Output:**
- Five individual quotes
- One consolidated shipment quote
- Cost comparison showing savings

---

## Test Category 4: Error Handling

### Test Case 4.1: Weight Exceeds Maximum

**Objective:** Test error handling when package exceeds system limits.

**Input:**
```
Package: Industrial equipment
Weight: 200 lbs (exceeds 150 lb max)
Dimensions: 36x36x48 inches
Distance: 500 miles
Service Tier: Standard
```

**Expected Behavior:**

**Package Assessment Agent:**
- Identifies weight exceeds parcel maximum (150 lbs)
- ERROR: "Package exceeds maximum weight for parcel service"
- Recommends: "This package requires freight shipping"
- Stops processing, returns error to coordinator

**Expected Output:**
Error message with:
- Clear explanation of limit
- Recommendation for freight service
- No quote generated
- Helpful next steps

---

### Test Case 4.2: Invalid Service Tier

**Objective:** Test input validation and error messaging.

**Input:**
```
Package: Standard package
Weight: 20 lbs
Distance: 500 miles
Service Tier: "Super Fast" (invalid)
```

**Expected Behavior:**
- Error caught at coordinator level or Cost Calculation Agent
- Clear message: "Invalid service tier. Must be: Economy, Standard, or Express"
- No processing occurs
- Asks for corrected input

---

### Test Case 4.3: Missing Dimensional Data

**Objective:** Test handling of incomplete package information.

**Input:**
```
Package: Electronics
Weight: 15 lbs
Dimensions: NOT PROVIDED
Distance: 800 miles
Service Tier: Express
```

**Expected Behavior:**

**Package Assessment Agent:**
- Identifies missing critical information
- CANNOT calculate dimensional weight
- Requests dimensions before proceeding
- May provide default assumptions with warning

**Expected Output:**
- Warning or error about missing dimensions
- Either: request additional info, or proceed with actual weight + disclaimer

---

## Test Category 5: Service Tier Comparisons

### Test Case 5.1: Same Package, All Tiers

**Objective:** Compare costs across all service tiers for same package.

**Input (run three times with different tiers):**
```
Package: Standard package
Weight: 25 lbs
Dimensions: 20x16x12 inches
Distance: 800 miles
Service Tier: Economy / Standard / Express (run separately)
```

**Expected Results:**
```
Economy:   Base cost × 0.80 = ~$162, delivery 7-10 days
Standard:  Base cost × 1.00 = ~$202, delivery 3-5 days
Express:   Base cost × 1.50 = ~$303, delivery 1-2 days
```

**Analysis Points:**
- Express costs 87% more than Economy
- Express costs 50% more than Standard
- Trade-off: cost vs. delivery speed
- Quote should help customer decide

---

## Test Category 6: Special Scenarios

### Test Case 6.1: International Shipment (if supported)

**Objective:** Test if agents handle international shipping or properly decline.

**Input:**
```
Package: Documents
Weight: 3 lbs
Origin: USA
Destination: Canada (500 miles from border)
Service Tier: Standard
```

**Expected Behavior:**
- Package Assessment Agent identifies international shipment
- Either: system handles with customs/duties added
- Or: system declines and recommends international service
- Additional documentation requirements noted

---

### Test Case 6.2: Same-Day Delivery Request

**Objective:** Test handling of service tier not in system.

**Input:**
```
Package: Urgent medical samples
Weight: 5 lbs
Distance: 50 miles (local)
Service Tier: Same-Day (not currently supported)
```

**Expected Behavior:**
- System recognizes unsupported tier
- Suggests: Express (closest match)
- Or: Recommends contacting specialized courier
- Does not fail silently

---

## Test Category 7: Integration with Plugin Data

### Test Case 7.1: Using Live Rate Tables

**Objective:** Verify Cost Calculation Agent correctly uses MCP plugin data.

**Input:**
```
Package: Standard package
Weight: 30 lbs
Distance: 750 miles
Service Tier: Standard
```

**Expected Behavior:**
- Cost Calculation Agent invokes shipping-calculator MCP
- Reads from rate-tables.json via plugin
- Uses current rate data (not hardcoded)
- Shows carrier-specific options if available

**Verification:**
- Check that rates match rate-tables.json
- Ensure plugin connection successful
- Confirm data freshness

---

### Test Case 7.2: Plugin Failure Handling

**Objective:** Test graceful degradation when plugin unavailable.

**Scenario:** MCP server not running

**Expected Behavior:**
- Cost Calculation Agent attempts plugin connection
- Detects failure
- Either: falls back to hardcoded rates with warning
- Or: returns error explaining plugin unavailable
- Does not crash or hang

---

## Performance Benchmarks

### Sequential Processing
```
Single Package Quote: < 5 seconds
3 Package Quotes: < 15 seconds
10 Package Quotes: < 50 seconds
```

### Parallel Processing (if implemented)
```
Single Package Quote: < 5 seconds
3 Package Quotes: < 8 seconds (3x speedup)
10 Package Quotes: < 15 seconds (3x speedup)
```

---

## Agent-Specific Test Cases

### Package Assessment Agent Tests

1. **Dimensional weight calculation accuracy**
   - Test: 24×24×24 inches, 20 lbs
   - Expected: DIM weight = 99.6 lbs, billable = 99.6 lbs

2. **Fragile item identification**
   - Test: Contents include "glass", "ceramic", "electronics"
   - Expected: Fragile flag set, surcharge applied

3. **Value-based insurance triggering**
   - Test: Declared value > $1,000
   - Expected: Insurance recommendation required

### Cost Calculation Agent Tests

1. **Distance bracket boundaries**
   - Test distances: 100, 101, 300, 301, 600, 601, 1000, 1001
   - Expected: Correct bracket selection at each boundary

2. **Service tier multiplier application**
   - Test: Same package, three tiers
   - Expected: Exact multipliers (0.80, 1.00, 1.50)

3. **Surcharge aggregation**
   - Test: Multiple surcharges applied
   - Expected: All surcharges added correctly to total

### Quote Generation Agent Tests

1. **Professional formatting**
   - Test: Any valid input
   - Expected: Consistent, readable format with all sections

2. **Insurance options presentation**
   - Test: Various package values
   - Expected: Appropriate insurance tiers offered

3. **Terms and conditions inclusion**
   - Test: All quotes
   - Expected: Standard T&C included, quote validity period stated

---

## Validation Checklist

For each test case, verify:

- [ ] Package Assessment Agent completes successfully
- [ ] Assessment data correctly passed to Cost Calculation Agent
- [ ] Cost calculations match expected ranges
- [ ] Cost data correctly passed to Quote Generation Agent
- [ ] Final quote is properly formatted
- [ ] All costs explained clearly
- [ ] Delivery estimates included
- [ ] Special requirements noted
- [ ] Error cases handled gracefully
- [ ] Agent coordination is visible/traceable

---

## Running the Tests

### Method 1: Interactive Testing

```
Run the following agent team test case:

[Paste test case here]

Show the output from each agent clearly labeled.
```

### Method 2: Batch Testing

```
Run all Test Category 1 cases from 03-agent-teams/test-cases.md
Show a summary of results.
```

### Method 3: Automated Test Suite (future)

```bash
# When automated testing is implemented
npm test:agent-teams
```

---

## Expected Success Criteria

A successful agent team implementation should:

1. ✅ Complete all Category 1-2 test cases without errors
2. ✅ Handle all Category 4 error cases gracefully
3. ✅ Process Category 3 multi-package scenarios correctly
4. ✅ Show clear agent coordination and data handoffs
5. ✅ Produce professional, accurate quotes
6. ✅ Meet performance benchmarks
7. ✅ Validate inputs before processing
8. ✅ Provide helpful error messages

---

**Note:** These test cases demonstrate agent coordination concepts. Production systems would include more extensive test coverage, automated test suites, performance monitoring, and regression testing.
