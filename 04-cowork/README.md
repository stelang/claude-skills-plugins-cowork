# Part 4: Cowork - Enterprise Shipping Orchestration

This directory demonstrates **Cowork** - the most sophisticated level in Claude's capability progression. Cowork orchestrates entire business processes, handling multiple data sources, complex analysis, and professional deliverable generation.

## What's in This Part

### Overview: From Agent Teams to Cowork

In Part 3 (Agent Teams), we coordinated specialized agents to handle complex shipping quote generation. But what happens when you need to process hundreds of shipments, compare multiple carriers, and generate executive-ready reports with Excel dashboards and PowerPoint presentations?

**Cowork** solves this by:
- Automatically orchestrating complex multi-file workflows
- Processing large datasets efficiently (100+ shipments)
- Generating professional business deliverables (Excel, PowerPoint, Word)
- Handling enterprise-scale complexity without manual coordination
- Providing business-user-friendly automation

## What is Cowork?

Cowork is Claude's enterprise orchestration capability that handles complete business processes from start to finish. Think of it as having a senior operations manager who:
- Understands your business objectives
- Processes all relevant data sources
- Performs comprehensive analysis
- Generates professional deliverables
- All without requiring you to coordinate individual steps

### Key Differences from Agent Teams

| Aspect | Agent Teams | Cowork |
|--------|-------------|--------|
| **Scale** | 1-10 items | 100-1000+ items |
| **Files** | 1-3 files | 10-100+ files |
| **Coordination** | Manual (you define workflow) | Automatic (Cowork orchestrates) |
| **Outputs** | Text/structured data | Excel, PowerPoint, Word |
| **Use Case** | Individual quotes | Bulk analysis, reporting |
| **User** | Developers | Business users + developers |

## Enterprise Shipping Use Cases

### Use Case 1: Daily Carrier Optimization

**Business Need:**
Your logistics team receives 150 shipments daily. You have contracts with 5 carriers (FedEx, UPS, DHL, Regional Express, Economy Freight). You need to select the optimal carrier for each shipment to minimize costs.

**Traditional Approach:**
- 8 hours of manual rate comparisons
- Error-prone Excel formulas
- Inconsistent results

**With Cowork:**
- 10 minutes processing time
- Consistent, automated analysis
- Professional Excel dashboard with charts
- PowerPoint executive summary

**Files Provided:**
- `sample-data/daily-shipments-150.csv` - Sample shipment data
- `sample-data/carrier-rates/` - 5 carrier rate tables
- `instructions/daily-optimization.md` - Ready-to-use instructions

### Use Case 2: Multi-Carrier Rate Shopping

**Business Need:**
Compare rates across all carriers for each shipment, considering:
- Service tier requirements (Economy/Standard/Express)
- Geographic service areas
- Special handling requirements (fragile, hazmat, high-value)
- Volume discounts and contract terms

**Cowork Deliverables:**
- **Excel Workbook** with:
  - Shipment-by-shipment comparison (all carriers)
  - Cost summary and savings analysis
  - Interactive dashboard with charts
- **PowerPoint Presentation:**
  - Executive summary slides
  - Cost analysis visualizations
  - Recommendations
- **Word Report:**
  - Detailed analysis methodology
  - Carrier-by-carrier evaluation
  - Strategic recommendations

**Files Provided:**
- `sample-data/multi-carrier-comparison.csv`
- `sample-data/carrier-rates/*.json`
- `sample-data/business-rules/*.json`
- `instructions/multi-carrier-shopping.md`

### Use Case 3: Quarterly Logistics Review

**Business Need:**
Analyze 3 months of shipping history (90 files, ~13,500 shipments) to:
- Identify cost trends
- Evaluate carrier performance
- Recommend contract renegotiations
- Project future costs

**Cowork Deliverables:**
- Comprehensive Excel workbook with trend analysis
- Quarterly business review PowerPoint (15 slides)
- Strategic recommendations report (Word, 20+ pages)

**Files Provided:**
- `sample-data/quarterly/` - 90 daily shipment files (simulated)
- `sample-data/carrier-performance-metrics.csv`
- `instructions/quarterly-review.md`

## Directory Structure

```
04-cowork/
├── README.md                          # This file
├── QUICKSTART.md                      # Get started in 5 minutes
│
├── sample-data/                       # Example input files
│   ├── daily-shipments-150.csv       # 150 sample shipments
│   ├── daily-shipments-10.csv        # 10 shipments (starter)
│   ├── carrier-rates/                 # Rate tables
│   │   ├── fedex-rates.json
│   │   ├── ups-rates.json
│   │   ├── dhl-rates.json
│   │   ├── regional-express-rates.json
│   │   └── economy-freight-rates.json
│   ├── business-rules/                # Constraints and rules
│   │   ├── carrier-service-areas.json
│   │   ├── special-handling-rules.json
│   │   └── volume-discounts.json
│   └── quarterly/                     # Quarterly review data
│       └── [90 daily shipment files]
│
├── instructions/                      # Cowork instruction templates
│   ├── daily-optimization.md         # Daily carrier selection
│   ├── multi-carrier-shopping.md     # Comprehensive comparison
│   ├── quarterly-review.md           # Quarterly analysis
│   └── template-blank.md             # Blank template to customize
│
└── examples/                          # Sample Cowork outputs
    ├── sample-excel-dashboard.png    # Screenshot of Excel output
    ├── sample-powerpoint-slides.png  # Screenshot of PPT output
    └── example-outputs-description.md # Descriptions of outputs
```

## Prerequisites

### 1. Claude Desktop App
Cowork runs in **Claude Desktop**, not Claude Code. Download at: https://claude.ai/download

### 2. Cowork Access
Verify you have Cowork access by asking in Claude Desktop:
```
Do I have access to Cowork features?
```

### 3. Sample Data Files
Use the provided sample data in `sample-data/` or prepare your own following the format examples.

## Quick Start (5 Minutes)

### Step 1: Start Small

Begin with 10 shipments, not 150:

1. Open Claude Desktop
2. Upload these files:
   - `sample-data/daily-shipments-10.csv`
   - `sample-data/carrier-rates/fedex-rates.json`
   - `sample-data/carrier-rates/ups-rates.json`
   - `instructions/daily-optimization.md`

3. Send this message:
```
Please analyze these shipments using Cowork.

Process the 10 shipments in daily-shipments-10.csv and compare
rates from FedEx and UPS using the provided rate tables.

Follow the instructions in daily-optimization.md to:
1. Calculate cost from each carrier for each shipment
2. Select the optimal carrier (lowest cost)
3. Generate an Excel workbook with:
   - Sheet 1: Shipment details with optimal carrier
   - Sheet 2: Cost comparison (both carriers)
   - Sheet 3: Summary with total cost by carrier

Format the Excel file professionally with headers and basic formatting.
```

### Step 2: Review Results

Cowork will generate an Excel file. Review:
- Are calculations correct?
- Is formatting professional?
- Are all shipments analyzed?

### Step 3: Iterate

Refine your request:
```
Please regenerate the Excel file with these improvements:
1. Add conditional formatting (highlight savings > $20 in green)
2. Include a bar chart comparing total cost by carrier
3. Add a "Savings" column showing savings vs. most expensive option
```

### Step 4: Scale Up

Once comfortable, try:
- 50 shipments with 3 carriers
- 150 shipments with 5 carriers
- Add PowerPoint executive summary
- Add Word detailed report

## Understanding Cowork Workflow

### What You Provide

1. **Input Files** (data sources)
   - Shipment data (CSV/Excel)
   - Carrier rate tables (JSON/CSV)
   - Business rules (JSON/text)

2. **Instructions** (what to do)
   - Analysis objectives
   - Calculation methodology
   - Deliverable specifications
   - Business rules and constraints

### What Cowork Does

1. **Reads and understands** all input files
2. **Plans execution** (determines optimal workflow, parallelization)
3. **Performs analysis** (calculations, comparisons, aggregations)
4. **Generates deliverables** (Excel, PowerPoint, Word)
5. **Handles errors** (missing data, validation issues)

### What You Receive

- **Excel workbooks** with data, calculations, charts, formatting
- **PowerPoint presentations** with analysis summaries and visualizations
- **Word documents** with detailed reports and recommendations

All professional, business-ready, and immediately usable.

## Sample Data Explained

### Shipment Data Format

**File: `daily-shipments-150.csv`**

```csv
shipment_id,destination_city,destination_state,weight_lbs,length_in,width_in,height_in,service_tier,contents,fragile,value_usd,distance_miles
SH-001,Chicago,IL,25,18,14,10,Standard,Electronics,Yes,850,450
SH-002,Phoenix,AZ,15,12,10,8,Express,Documents,No,50,1200
SH-003,Portland,ME,50,24,20,16,Economy,Clothing,No,200,850
...
```

**Columns:**
- `shipment_id`: Unique identifier
- `destination_city`, `destination_state`: Delivery location
- `weight_lbs`: Package weight
- `length_in`, `width_in`, `height_in`: Dimensions
- `service_tier`: Economy, Standard, or Express
- `contents`: Package contents description
- `fragile`: Yes/No
- `value_usd`: Declared value
- `distance_miles`: Shipping distance

### Carrier Rate Format

**File: `carrier-rates/fedex-rates.json`**

```json
{
  "carrier": "FedEx",
  "rate_structure": {
    "distance_brackets": [
      {"min_miles": 1, "max_miles": 100, "base_rate_per_lb_per_100mi": 0.50},
      {"min_miles": 101, "max_miles": 300, "base_rate_per_lb_per_100mi": 0.75},
      {"min_miles": 301, "max_miles": 600, "base_rate_per_lb_per_100mi": 1.00},
      {"min_miles": 601, "max_miles": 1000, "base_rate_per_lb_per_100mi": 1.35},
      {"min_miles": 1001, "max_miles": 2000, "base_rate_per_lb_per_100mi": 1.75},
      {"min_miles": 2001, "max_miles": 99999, "base_rate_per_lb_per_100mi": 2.25}
    ],
    "service_tier_multipliers": {
      "Economy": 0.85,
      "Standard": 1.0,
      "Express": 1.45
    },
    "base_handling_fee": 5.00,
    "surcharges": {
      "fragile": 15.00,
      "signature_required": 5.00,
      "residential_delivery": 4.50
    }
  },
  "service_areas": {
    "all_states": true,
    "excluded_regions": []
  }
}
```

### Business Rules Format

**File: `business-rules/special-handling-rules.json`**

```json
{
  "fragile_handling": {
    "applies_when": "fragile = Yes",
    "required_carriers": ["FedEx", "UPS", "DHL"],
    "excluded_carriers": ["Economy Freight"],
    "surcharge_minimum": 15.00
  },
  "high_value": {
    "threshold_usd": 1000,
    "required_insurance": true,
    "signature_required": true,
    "recommended_carriers": ["FedEx", "UPS"]
  },
  "dimensional_weight": {
    "enabled": true,
    "dim_factor": 139,
    "calculation": "(length × width × height) / dim_factor",
    "use_higher_of": ["actual_weight", "dimensional_weight"]
  }
}
```

## Instruction Templates

### Template 1: Daily Optimization

**File: `instructions/daily-optimization.md`**

This template analyzes daily shipments and selects optimal carriers. Perfect for daily operations.

**Key Sections:**
- Objective: Minimize total shipping cost
- Analysis: Compare all carriers for each shipment
- Constraints: Service tier requirements, carrier service areas
- Deliverables: Excel dashboard

### Template 2: Multi-Carrier Shopping

**File: `instructions/multi-carrier-shopping.md`**

Comprehensive comparison across all carriers with detailed analysis.

**Key Sections:**
- Objective: Evaluate all carrier options
- Analysis: Per-shipment and aggregate comparison
- Deliverables: Excel + PowerPoint + Word

### Template 3: Quarterly Review

**File: `instructions/quarterly-review.md`**

Strategic analysis of 3 months of shipping data.

**Key Sections:**
- Objective: Identify trends and optimization opportunities
- Analysis: Historical trends, carrier performance, cost projections
- Deliverables: Executive presentation, strategic recommendations

## Example Cowork Outputs

See `examples/` directory for:
- Screenshots of Excel dashboards
- Sample PowerPoint slides
- Descriptions of Word report structure

**Key Output Features:**

### Excel Workbooks
- Multiple sheets (details, comparison, summary, dashboard)
- Professional formatting (headers, colors, borders)
- Charts and visualizations (bar charts, pie charts, trend lines)
- Formulas (for live updates)
- Conditional formatting (highlight key metrics)

### PowerPoint Presentations
- Title slide with key metrics
- Executive summary (1-slide overview)
- Cost analysis with charts
- Geographic insights
- Recommendations slide

### Word Reports
- Executive summary
- Detailed methodology
- Carrier-by-carrier analysis
- Strategic recommendations
- Appendices with edge cases

## Running Your First Cowork Task

### Complete Example

1. **Gather Files:**
   ```
   - daily-shipments-10.csv (provided)
   - fedex-rates.json (provided)
   - ups-rates.json (provided)
   - daily-optimization.md (provided)
   ```

2. **Open Claude Desktop**

3. **Upload Files** (drag and drop or click attach)

4. **Send This Prompt:**
   ```
   I need to optimize carrier selection for these 10 shipments using Cowork.

   Input files:
   - daily-shipments-10.csv (shipments to analyze)
   - fedex-rates.json (FedEx rate table)
   - ups-rates.json (UPS rate table)
   - daily-optimization.md (detailed instructions)

   Please follow the instructions in daily-optimization.md to:
   1. Calculate shipping cost from both carriers for each shipment
   2. Select the carrier with the lowest cost for each shipment
   3. Calculate total savings vs. using only the more expensive carrier
   4. Generate an Excel workbook with:
      - Shipment details with optimal carrier selection
      - Cost comparison showing both carrier options
      - Summary dashboard with total cost by carrier
      - Bar chart comparing carrier costs

   Format the Excel professionally with:
   - Clear headers
   - Conditional formatting (highlight optimal carrier in green)
   - Professional color scheme
   - Currency formatting for all cost columns
   ```

5. **Wait for Processing** (typically 1-3 minutes)

6. **Download Results** (Excel file)

7. **Review and Iterate** if needed

## Advanced Features

### Parallel Processing

Cowork automatically parallelizes independent work. For 150 shipments × 5 carriers = 750 calculations, Cowork processes many simultaneously.

### Error Handling

Cowork gracefully handles:
- Missing data (flags shipments with incomplete data)
- Invalid values (notes calculation errors)
- Constraint violations (identifies shipments where no carrier qualifies)

### Incremental Refinement

Start broad, refine iteratively:

1. **First pass:** Basic cost comparison
2. **Second pass:** Add special handling rules
3. **Third pass:** Include service area constraints
4. **Fourth pass:** Add volume discounts
5. **Fifth pass:** Refine Excel formatting and charts

### Custom Business Logic

Incorporate your specific rules:
```
"For high-value shipments (>$5000), always require signature
and only use FedEx or UPS, even if more expensive."

"For rural destinations (identified by ZIP code), add 15%
surcharge to account for final-mile delivery costs."

"Apply volume discounts: 10% off for carriers where we have
>30 shipments in a single day."
```

## Best Practices

### 1. Start Small, Scale Up
- Begin with 10 shipments, 2 carriers
- Verify calculations are correct
- Then scale to 150 shipments, 5 carriers

### 2. Structure Data Consistently
- Use consistent column names
- Clean data before uploading (remove merged cells, formatting)
- Provide complete data (no missing required fields)

### 3. Write Clear Instructions
- Be specific about deliverable format
- Include business rules explicitly
- Specify calculation methodology

### 4. Request Professional Formatting
- Specify color schemes
- Request specific chart types
- Define conditional formatting rules

### 5. Validate Results
- Spot-check calculations manually
- Verify edge cases are handled correctly
- Ensure business rules are applied

## Common Patterns

### Pattern 1: Daily Operations
- **Frequency:** Daily
- **Input:** Daily shipment export + carrier rates
- **Output:** Excel dashboard with optimal assignments
- **Time:** 10 minutes

### Pattern 2: Weekly Summary
- **Frequency:** Weekly
- **Input:** Week's shipments (5-7 files)
- **Output:** PowerPoint weekly review
- **Time:** 15 minutes

### Pattern 3: Monthly Review
- **Frequency:** Monthly
- **Input:** Month's shipments + invoices + contracts
- **Output:** Excel + PowerPoint + Word
- **Time:** 20-30 minutes

## Troubleshooting

### Issue: Cowork isn't available
**Solution:** Verify access in Claude Desktop. Cowork doesn't work in Claude Code.

### Issue: File upload fails
**Solution:** Check file size (<10 MB per file, <50 MB total). Convert large Excel files to CSV.

### Issue: Output missing expected data
**Solution:** Refine instructions to be more specific about what to include.

### Issue: Calculations seem wrong
**Solution:** Verify input data format matches what instructions describe. Spot-check manually.

### Issue: Excel formulas not working
**Solution:** Explicitly request formulas: "Use SUM formulas, not static calculated values."

## Performance Expectations

### Small Tasks (10 shipments, 2 carriers)
- Processing time: 1-2 minutes
- Excel output: 1 file, 3 sheets, basic charts

### Medium Tasks (50 shipments, 3 carriers)
- Processing time: 2-4 minutes
- Excel output: 1 file, 5 sheets, multiple charts
- PowerPoint: 5-7 slides

### Large Tasks (150 shipments, 5 carriers)
- Processing time: 3-6 minutes
- Excel output: 1 file, 7+ sheets, comprehensive dashboards
- PowerPoint: 10-15 slides
- Word report: 15-20 pages

### Very Large Tasks (1000+ shipments, quarterly review)
- Processing time: 5-10 minutes
- Excel output: Complex workbook with pivot tables, trend analysis
- PowerPoint: Full business review presentation
- Word report: Comprehensive strategic analysis

## Cost Considerations

Cowork uses more tokens than simpler capabilities due to:
- Processing multiple files
- Complex analysis and calculations
- Generating formatted deliverables

**Rough Token Usage:**
- Small task: ~50K-100K tokens
- Medium task: ~100K-200K tokens
- Large task: ~200K-400K tokens
- Very large task: ~400K-800K tokens

**When to use Cowork:**
- When the value of automation exceeds the cost
- For recurring tasks (daily/weekly/monthly)
- When manual work would take hours
- For executive reporting and strategic analysis

**When to use simpler tools:**
- Single shipment quotes (use Agent Teams)
- Quick cost estimates (use Skills)
- Simple rate lookups (use Plugin)

## Next Steps

1. **Read the blog post:** `../blog-part-4-cowork.md`
2. **Try the Quick Start:** Follow the 5-minute guide above
3. **Experiment with templates:** Modify instruction files for your needs
4. **Scale up:** Start small, then process larger datasets
5. **Create recurring workflows:** Build daily/weekly/monthly automation

## Key Takeaways

1. **Cowork orchestrates entire processes** - Don't coordinate manually; let Cowork handle workflow
2. **Scale is Cowork's strength** - 10 items vs 1,000 items takes similar time
3. **Professional outputs matter** - Excel/PowerPoint/Word ready for executives
4. **Preparation is key** - Clean data + clear instructions = excellent results
5. **Iterate and refine** - Start simple, add complexity incrementally
6. **Automate the tedious** - Stop doing manual data wrangling and formatting

## Resources

- **Blog Post:** `../blog-part-4-cowork.md` (comprehensive tutorial)
- **Quick Start:** `QUICKSTART.md` (5-minute guide)
- **Sample Data:** `sample-data/` (ready-to-use examples)
- **Instructions:** `instructions/` (templates to customize)
- **Examples:** `examples/` (sample outputs)

## Educational Note

This demonstrates Cowork's enterprise orchestration capabilities using shipping logistics as a practical example. Real production systems would include additional error handling, data validation, monitoring, and integration with existing business systems.

---

**Part of the Skills → Plugins → Agent Teams → Cowork series**

Previous parts:
- Part 1: Skills (`01-skill/`)
- Part 2: Plugins (`02-plugin/`)
- Part 3: Agent Teams (`03-agent-teams/`)
