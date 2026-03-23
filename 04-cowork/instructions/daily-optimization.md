# Daily Shipping Carrier Optimization

## Objective
Analyze today's shipments and identify the optimal carrier for each package to minimize total shipping costs while meeting service tier requirements.

## Input Files

### Shipments Data
- **File:** `daily-shipments-{date}.csv`
- **Format:** CSV with headers
- **Required Columns:**
  - `shipment_id`: Unique identifier (e.g., SH-001)
  - `destination_city`: Delivery city
  - `destination_state`: Two-letter state code
  - `weight_lbs`: Package weight in pounds
  - `length_in`, `width_in`, `height_in`: Dimensions in inches
  - `service_tier`: Economy | Standard | Express
  - `contents`: Description of package contents
  - `fragile`: Yes | No
  - `value_usd`: Declared value in USD
  - `distance_miles`: Shipping distance

### Carrier Rate Tables
- **Files:** `carrier-rates/{carrier-name}-rates.json`
- **Carriers:** FedEx, UPS, DHL, Regional Express, Economy Freight
- **Structure:** JSON with rate brackets, service tier multipliers, surcharges

### Business Rules (Optional)
- **File:** `business-rules/carrier-service-areas.json`
- **File:** `business-rules/special-handling-rules.json`

## Analysis Requirements

### 1. Per-Shipment Cost Calculation

For each shipment, calculate shipping cost from each carrier using:

**Formula:**
```
1. Determine distance bracket from carrier rate table
2. Calculate distance_units = distance_miles / 100
3. Get service_tier_multiplier from carrier rate table
4. Calculate adjusted_rate = base_rate × service_tier_multiplier
5. Calculate shipping_cost = weight_lbs × distance_units × adjusted_rate
6. Apply surcharges (fragile, signature, etc.)
7. total_cost = shipping_cost + base_handling_fee + surcharges
```

**Special Considerations:**
- **Dimensional Weight:** Calculate if length × width × height / 139 > actual weight
- **Fragile Items:** Add fragile handling surcharge (typically $15)
- **High-Value Items:** If value > $1000, add signature requirement ($5)
- **Service Area Limits:** Some carriers don't serve all regions

### 2. Optimal Carrier Selection

For each shipment:
1. Compare costs from all applicable carriers
2. Select the carrier with the **lowest total cost**
3. If carrier doesn't serve the destination, mark as "Not Available"
4. If special handling excludes certain carriers (e.g., fragile items can't use Economy Freight), respect those constraints

### 3. Savings Calculation

For each shipment:
- Calculate savings = (most_expensive_available_carrier - optimal_carrier)
- Calculate percentage_savings = (savings / most_expensive_available_carrier) × 100

### 4. Aggregate Analysis

Calculate totals:
- Total shipments analyzed
- Total cost with optimization
- Total cost if using single most expensive carrier
- Total savings achieved
- Average savings per shipment
- Breakdown by carrier (shipment count, total cost)
- Breakdown by service tier (shipment count, average cost)

## Deliverables

### Excel Workbook: `carrier-optimization-{date}.xlsx`

#### Sheet 1: Shipment Details
**Purpose:** Show each shipment with optimal carrier selection

**Columns:**
- Shipment ID
- Destination (City, State)
- Weight (lbs)
- Dimensions (L×W×H inches)
- Service Tier
- Contents
- Special Handling (Fragile, High-Value, etc.)
- **Optimal Carrier** (highlighted)
- **Optimal Cost** (currency formatted)
- Savings vs. Next Best Option
- Delivery Estimate

**Formatting:**
- Header row: Bold, blue background (#003366), white text
- Data rows: Alternating white and light gray (#F0F0F0)
- Conditional formatting: Optimal carrier cell in light green (#D4EDDA)
- Currency columns: $X,XXX.XX format
- Freeze top row for scrolling

#### Sheet 2: Carrier Comparison Matrix
**Purpose:** Show cost from all carriers for each shipment

**Columns:**
- Shipment ID
- Destination
- Weight
- Service Tier
- FedEx Cost
- UPS Cost
- DHL Cost
- Regional Express Cost
- Economy Freight Cost
- Optimal Carrier
- Optimal Cost

**Formatting:**
- Mark "Not Available" in gray for carriers that don't serve area
- Highlight optimal cost for each shipment in green
- Use conditional formatting to color-code costs (low=green, high=red gradient)

#### Sheet 3: Cost Summary
**Purpose:** Aggregate cost analysis

**Sections:**

**By Carrier:**
| Carrier | Shipment Count | Total Cost | Avg Cost/Shipment | % of Total |
|---------|----------------|------------|-------------------|------------|
| FedEx | {count} | ${total} | ${avg} | {pct}% |
| UPS | ... | ... | ... | ... |
| ... | ... | ... | ... | ... |
| **TOTAL** | **{total_count}** | **${total_cost}** | **${avg}** | **100%** |

**By Service Tier:**
| Service Tier | Shipment Count | Total Cost | Avg Cost/Shipment |
|--------------|----------------|------------|-------------------|
| Economy | {count} | ${total} | ${avg} |
| Standard | ... | ... | ... |
| Express | ... | ... | ... |
| **TOTAL** | **{total_count}** | **${total_cost}** | **${avg}** |

**Savings Summary:**
- Total Cost (Optimized): ${optimized_total}
- Total Cost (Single Carrier - Most Expensive): ${single_carrier_total}
- Total Savings: ${savings} ({pct}%)
- Average Savings per Shipment: ${avg_savings}

**Formulas:**
- Use SUM() for totals
- Use AVERAGE() for averages
- Use COUNTIF() for counts by carrier/tier
- Use percentage formulas for % columns

#### Sheet 4: Dashboard
**Purpose:** Visual summary with charts and KPIs

**KPI Section (top of sheet):**
```
╔══════════════════════════════════════════════════════╗
║           DAILY CARRIER OPTIMIZATION                 ║
║                  {DATE}                              ║
╠══════════════════════════════════════════════════════╣
║  📦 Total Shipments: {count}                         ║
║  💰 Total Cost: ${total}                             ║
║  💵 Total Savings: ${savings} ({pct}%)               ║
║  📊 Avg Savings/Shipment: ${avg_savings}             ║
╚══════════════════════════════════════════════════════╝
```

**Chart 1: Cost by Carrier (Bar Chart)**
- X-axis: Carrier names
- Y-axis: Total cost ($)
- Title: "Total Shipping Cost by Carrier"
- Show data labels

**Chart 2: Shipment Distribution (Pie Chart)**
- Slices: Carrier names
- Values: Number of shipments
- Title: "Shipment Distribution by Carrier"
- Show percentages

**Chart 3: Service Tier Breakdown (Stacked Bar Chart)**
- X-axis: Carriers
- Y-axis: Number of shipments
- Stacks: Economy, Standard, Express
- Title: "Service Tier Distribution by Carrier"

**Chart 4: Savings Highlights (Horizontal Bar Chart)**
- Show top 10 shipments with highest savings
- X-axis: Savings amount ($)
- Y-axis: Shipment ID
- Title: "Top 10 Cost Savers"

## Validation Rules

### Data Validation
- Weight must be > 0 and ≤ 150 lbs
- Distance must be > 0 miles
- Service tier must be exactly: Economy, Standard, or Express
- If fragile = Yes, exclude carriers: Economy Freight
- If value > $1000, add signature requirement

### Calculation Validation
- All costs should be ≥ minimum handling fee ($5)
- Optimal carrier should always be the lowest valid cost
- Savings should never be negative
- Percentage calculations should sum to 100%

### Error Handling
- If shipment has missing required data, flag in output: "ERROR: Missing {field}"
- If no carrier serves destination, mark: "No Carrier Available - Review Manually"
- If calculation error, mark: "CALC ERROR - Verify Data"

## Output Format Requirements

### Professional Formatting
- **Color Scheme:**
  - Primary: Blue (#003366)
  - Secondary: Gray (#666666)
  - Success: Green (#28A745)
  - Warning: Yellow (#FFC107)
  - Error: Red (#DC3545)

- **Typography:**
  - Headers: Bold, 12pt
  - Data: Regular, 11pt
  - KPIs: Bold, 14pt

- **Charts:**
  - Professional color palette
  - Clear axis labels
  - Readable font sizes
  - Data labels on all charts

### Currency Formatting
- All cost columns: `$#,##0.00`
- Percentages: `0.0%`
- Whole numbers: `#,##0`

### Conditional Formatting
- Optimal carrier: Light green background
- High savings (>$50): Dark green text, bold
- Errors: Red background, white text
- Warnings: Yellow background

## Business Rules

### Carrier Constraints
1. **Economy Freight**
   - Does not handle fragile items
   - Maximum weight: 100 lbs
   - No express service tier

2. **Regional Express**
   - Limited to regions: Northeast, Midwest
   - No California, Texas, Florida service

3. **DHL**
   - Specializes in high-value items
   - Requires signature for all deliveries (included in price)

### Special Handling
1. **Fragile Items** (fragile = Yes)
   - Excluded carriers: Economy Freight
   - Add $15 fragile handling surcharge
   - Recommend carriers: FedEx, UPS, DHL

2. **High-Value Items** (value > $1000)
   - Require signature confirmation (+$5)
   - Recommend insurance upgrade
   - Preferred carriers: FedEx, UPS

3. **Dimensional Weight**
   - Apply if: (L × W × H) / 139 > actual weight
   - Use dimensional weight for billing
   - Note in output if dimensional weight applies

### Service Tier Requirements
- **Economy:** 7-10 business days delivery
- **Standard:** 3-5 business days delivery
- **Express:** 1-2 business days delivery

Must select carrier that can meet service tier promise for destination.

## Success Criteria

The analysis is successful if:
- ✅ All shipments have optimal carrier selected
- ✅ All costs calculated correctly using rate tables
- ✅ Business rules applied (fragile, high-value, service areas)
- ✅ Savings calculated and validated
- ✅ Excel professionally formatted with clear charts
- ✅ No errors or missing data
- ✅ Results are actionable for operations team

## Example Output

For a shipment:
- ID: SH-042
- Destination: Denver, CO
- Weight: 25 lbs
- Distance: 800 miles
- Service Tier: Standard
- Fragile: No
- Value: $500

**Expected Calculation:**
1. FedEx: $156.75 (selected - lowest)
2. UPS: $164.50
3. DHL: $172.25
4. Regional Express: $168.00
5. Economy Freight: $142.50 (excluded - can't meet Standard delivery)

**Selected:** FedEx at $156.75
**Savings:** $8.00 vs. next best option (UPS)

## Timeline
- **Processing time:** Typically 2-5 minutes for 100-200 shipments
- **Delivery:** Single Excel file with all sheets and charts

## Notes
- All calculations should be transparent and auditable
- Include methodology notes in Excel for reference
- Flag any anomalies or edge cases for manual review
- Ensure results can be used immediately by operations team without additional formatting
