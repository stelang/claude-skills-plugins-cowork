# Cowork Quick Start - 5 Minutes to Your First Shipping Analysis

Get started with Cowork enterprise orchestration in 5 minutes.

## What is Cowork?

Cowork is Claude's most powerful capability - it orchestrates entire business processes, analyzes multiple data sources, and generates professional deliverables (Excel, PowerPoint, Word) automatically.

**Perfect for:** Analyzing 100+ shipments, comparing multiple carriers, generating executive dashboards.

## Before You Begin

### Prerequisites
1. **Claude Desktop App** (download at https://claude.ai/download)
   - ⚠️ Cowork runs in Claude Desktop, NOT Claude Code
2. **Cowork Access** - Verify in Claude Desktop by asking: "Do I have Cowork access?"
3. **Sample Data Files** - Use the files in `sample-data/` (provided)

## Quick Start: Your First Cowork Task

### Step 1: Prepare Files (1 minute)

You'll need these files (all provided in `sample-data/`):

```
✅ daily-shipments-10.csv         # 10 sample shipments
✅ carrier-rates/fedex-rates.json # FedEx rate table
✅ carrier-rates/ups-rates.json   # UPS rate table
```

### Step 2: Open Claude Desktop (1 minute)

1. Launch Claude Desktop (not Claude Code)
2. Start a new conversation
3. Upload the 3 files above (drag and drop or click attach)

### Step 3: Send Your Request (1 minute)

Copy and paste this prompt:

```
I need to optimize carrier selection for these 10 shipments using Cowork.

Please analyze the shipments in daily-shipments-10.csv and compare
rates from FedEx and UPS using the provided rate tables.

For each shipment:
1. Calculate cost from both carriers
2. Select the carrier with the lowest cost
3. Calculate savings vs. the more expensive option

Generate an Excel workbook with these sheets:

Sheet 1 - Shipment Details:
- Columns: Shipment ID, Destination, Weight, Service Tier,
  Optimal Carrier, Cost, Savings

Sheet 2 - Carrier Comparison:
- Show cost from both carriers for each shipment
- Highlight the optimal choice

Sheet 3 - Summary Dashboard:
- Total cost by carrier
- Total number of shipments by carrier
- Total savings achieved
- Bar chart comparing carrier costs

Format professionally with:
- Clear column headers
- Currency formatting ($X.XX)
- Conditional formatting (highlight optimal carrier in green)
- Professional color scheme (blue headers, white/light gray alternating rows)
```

### Step 4: Wait for Processing (2 minutes)

Cowork will:
- Read and parse your files
- Calculate costs for all shipments and carriers
- Generate the Excel workbook
- Format it professionally

Typical processing time: 1-3 minutes

### Step 5: Download and Review Results (1 minute)

1. Download the generated Excel file
2. Open and verify:
   - ✅ All 10 shipments analyzed
   - ✅ Costs calculated correctly (spot-check 2-3)
   - ✅ Optimal carrier selected for each
   - ✅ Charts and formatting look professional

## What You'll See

### Excel Output Preview

**Sheet 1: Shipment Details**
| Shipment ID | Destination | Weight | Service Tier | Optimal Carrier | Cost | Savings |
|-------------|-------------|--------|--------------|-----------------|------|---------|
| SH-001 | Chicago, IL | 25 lbs | Standard | UPS | $87.50 | $12.50 |
| SH-002 | Phoenix, AZ | 15 lbs | Express | FedEx | $245.00 | $35.00 |
| SH-003 | Portland, ME | 50 lbs | Economy | UPS | $125.50 | $18.00 |
| ... | ... | ... | ... | ... | ... | ... |

**Sheet 3: Dashboard**
```
Total Shipments: 10
Total Cost (Optimized): $1,245.75
Total Savings: $156.25 (11.1%)

By Carrier:
FedEx:  4 shipments | $498.50
UPS:    6 shipments | $747.25

[Bar Chart showing cost comparison]
```

## Next Steps

### Level 1: Add More Carriers (10 minutes)

Repeat the process but include all 5 carriers:

```
Upload files:
- daily-shipments-10.csv
- fedex-rates.json
- ups-rates.json
- dhl-rates.json
- regional-express-rates.json
- economy-freight-rates.json

Prompt: "Compare all 5 carriers and select the optimal one for each shipment"
```

### Level 2: Scale to 50 Shipments (15 minutes)

Use a larger dataset:

```
Upload files:
- daily-shipments-50.csv (create or use sample)
- All 5 carrier rate files

Add to deliverables:
- PowerPoint presentation with executive summary (3-5 slides)
```

### Level 3: Full Daily Analysis (20 minutes)

Process the complete 150-shipment daily file:

```
Upload files:
- daily-shipments-150.csv
- All 5 carrier rate files
- business-rules/carrier-service-areas.json
- business-rules/special-handling-rules.json

Deliverables:
- Excel workbook (7 sheets with comprehensive analysis)
- PowerPoint presentation (10 slides)
- Word report (executive summary and recommendations)
```

## Common Use Cases

### Daily Operations
**When:** Every morning
**Input:** Yesterday's shipments + carrier rates
**Output:** Excel dashboard for operations team
**Time:** 10 minutes

### Weekly Summary
**When:** Friday afternoon
**Input:** Week's shipments (5 files)
**Output:** PowerPoint weekly review for manager
**Time:** 15 minutes

### Monthly Executive Report
**When:** First of month
**Input:** Month's data + contracts + performance metrics
**Output:** Excel + PowerPoint + Word for C-suite
**Time:** 25 minutes

## Tips for Success

### ✅ DO

- **Start small** (10 shipments) before scaling to 150
- **Be specific** in your instructions about deliverable format
- **Verify data** format is clean (consistent columns, no merged cells)
- **Iterate** - refine your request if first output isn't perfect
- **Spot-check** calculations to ensure accuracy

### ❌ DON'T

- **Don't use Claude Code** - Cowork only works in Claude Desktop
- **Don't upload messy data** - clean Excel formatting first (remove merged cells, formatting)
- **Don't be vague** - specify exactly what you want in outputs
- **Don't skip validation** - always verify calculations are correct
- **Don't overwhelm** - start simple, add complexity gradually

## Troubleshooting

### "I don't see Cowork features"
**Problem:** Using Claude Code instead of Claude Desktop
**Solution:** Switch to Claude Desktop app

### "File upload fails"
**Problem:** Files too large (>10 MB each or >50 MB total)
**Solution:** Convert large Excel files to CSV, reduce dataset size

### "Calculations look wrong"
**Problem:** Data format doesn't match expectations
**Solution:** Review CSV column names, verify rate table structure

### "Missing data in output"
**Problem:** Instructions weren't specific enough
**Solution:** Refine request with exact column names and sheet structure

### "Excel formulas don't work"
**Problem:** Cowork generated static values
**Solution:** Explicitly request: "Use Excel formulas (SUM, AVERAGE) not static values"

## Sample Prompts

### Basic Analysis
```
Analyze 10 shipments, compare FedEx and UPS rates,
generate Excel with optimal carrier selection.
```

### Comprehensive Analysis
```
Process 150 shipments across 5 carriers. Apply special
handling rules for fragile items. Generate Excel workbook
with shipment details, cost comparison, summary dashboard
with charts, and PowerPoint executive summary.
```

### Custom Requirements
```
Compare carriers for 50 shipments. For high-value items
(>$1000), require signature and only use FedEx/UPS even if
more expensive. For fragile items, exclude Economy Freight.
Generate Excel with recommendations and cost analysis.
```

### Monthly Report
```
Analyze 30 days of shipments (3,000 total). Compare actual
costs vs. contract rates. Identify trends and anomalies.
Generate comprehensive Excel workbook, PowerPoint quarterly
business review, and Word strategic recommendations report.
```

## Resources

- **Full Documentation:** `README.md` (comprehensive guide)
- **Sample Data:** `sample-data/` (ready-to-use files)
- **Instructions:** `instructions/` (templates to customize)
- **Blog Post:** `../blog-part-4-cowork.md` (detailed tutorial)

## Your First Cowork Checklist

- [ ] Verify Cowork access in Claude Desktop
- [ ] Locate sample data files in `sample-data/`
- [ ] Upload 10-shipment CSV + 2 carrier rate files
- [ ] Send the provided sample prompt
- [ ] Wait 1-3 minutes for processing
- [ ] Download and review Excel output
- [ ] Spot-check 2-3 calculations manually
- [ ] Verify formatting looks professional
- [ ] Try a refinement request (add charts, change colors)
- [ ] Scale up to 50 shipments with 3 carriers

## Time Savings

### Manual Approach
- Data preparation: 15 min
- Rate lookups: 2 min × 10 shipments = 20 min
- Excel setup: 10 min
- Calculations and formulas: 20 min
- Formatting and charts: 15 min
- **Total: 80 minutes**

### With Cowork
- Data preparation: 5 min (one-time)
- Upload files and send prompt: 2 min
- Processing: 2 min (automated)
- Review: 5 min
- **Total: 14 minutes** (after initial setup)

**Savings: 66 minutes (83% faster)**

And that's for just 10 shipments. With 150 shipments, manual approach could take 8+ hours.

## What's Next?

1. **Complete this quick start** (5 minutes)
2. **Read the full README** for advanced features
3. **Review the blog post** for comprehensive examples
4. **Explore instruction templates** in `instructions/`
5. **Try the provided sample data** at different scales

## Questions?

**Q: How many files can I upload?**
A: Up to ~100 files, ~50 MB total size

**Q: What file formats work?**
A: CSV, JSON, TXT, Excel (.xlsx), PDF (for reading)

**Q: Can Cowork write formulas or only static values?**
A: Both! Request "use Excel formulas" for live calculations

**Q: How long does processing take?**
A: 1-3 minutes for small tasks, 5-10 minutes for large

**Q: Can I modify the output?**
A: Yes! Request refinements: "Add conditional formatting" or "Change chart type to pie chart"

**Q: Does this cost more than regular Claude?**
A: Cowork uses more tokens due to complex processing, but saves massive amounts of manual time

---

**Ready?** Open Claude Desktop and try your first Cowork shipping analysis!

After completing this quick start, you'll understand:
✅ How to structure Cowork requests
✅ What professional deliverables look like
✅ How to scale from 10 to 150+ shipments
✅ When to use Cowork vs. simpler tools
