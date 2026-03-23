# Example Cowork Outputs

This document describes what Cowork generates for shipping optimization tasks.

## Overview

When you run a Cowork shipping optimization task, you receive professional business deliverables ready for immediate use by operations teams and executives.

## Excel Workbook Example

### File: `carrier-optimization-2026-03-22.xlsx`

#### Sheet 1: Shipment Details (Sample Rows)

| Shipment ID | Destination | Weight | Dimensions | Service Tier | Contents | Special Handling | Optimal Carrier | Optimal Cost | Savings | Delivery |
|-------------|-------------|--------|------------|--------------|----------|------------------|-----------------|--------------|---------|----------|
| SH-001 | Chicago, IL | 25 lbs | 18×14×10 | Standard | Electronics | Fragile | UPS | $87.50 | $12.50 | 3-5 days |
| SH-002 | Phoenix, AZ | 15 lbs | 12×10×8 | Express | Documents | None | FedEx | $245.00 | $35.00 | 1-2 days |
| SH-003 | Portland, ME | 50 lbs | 24×20×16 | Economy | Clothing | None | Regional Express | $125.50 | $45.00 | 7-10 days |
| SH-004 | Miami, FL | 8 lbs | 10×8×6 | Standard | Books | None | DHL | $78.25 | $8.75 | 3-5 days |
| SH-005 | Denver, CO | 35 lbs | 20×18×14 | Standard | Home Goods | None | UPS | $156.75 | $23.25 | 3-5 days |

**Features:**
- ✅ Color-coded headers (blue background, white text)
- ✅ Optimal carrier highlighted in green
- ✅ Currency formatted ($X,XXX.XX)
- ✅ Alternating row colors for readability
- ✅ Frozen header row for scrolling

#### Sheet 2: Carrier Comparison Matrix (Sample Rows)

| Shipment | Dest | Weight | Tier | FedEx | UPS | DHL | Regional | Economy | Optimal | Cost |
|----------|------|--------|------|-------|-----|-----|----------|---------|---------|------|
| SH-001 | Chicago | 25 lbs | Std | $100.00 | **$87.50** | $95.00 | $92.00 | N/A | UPS | $87.50 |
| SH-002 | Phoenix | 15 lbs | Exp | **$245.00** | $280.00 | $265.00 | N/A | N/A | FedEx | $245.00 |
| SH-003 | Portland | 50 lbs | Eco | $170.50 | $145.00 | N/A | **$125.50** | $140.00 | Regional | $125.50 |
| SH-004 | Miami | 8 lbs | Std | $87.00 | $92.00 | **$78.25** | N/A | N/A | DHL | $78.25 |
| SH-005 | Denver | 35 lbs | Std | $180.00 | **$156.75** | $172.00 | $165.00 | N/A | UPS | $156.75 |

**Features:**
- ✅ All carrier options visible for comparison
- ✅ "N/A" for carriers that don't serve area or tier
- ✅ Optimal cost highlighted in each row
- ✅ Heat map coloring (green = low cost, red = high cost)

#### Sheet 3: Cost Summary

**By Carrier:**

| Carrier | Shipment Count | Total Cost | Avg Cost/Shipment | % of Total |
|---------|----------------|------------|-------------------|------------|
| FedEx | 45 | $5,678.25 | $126.18 | 30.0% |
| UPS | 38 | $4,892.50 | $128.75 | 25.3% |
| DHL | 28 | $3,456.00 | $123.43 | 18.7% |
| Regional Express | 24 | $2,845.00 | $118.54 | 16.0% |
| Economy Freight | 15 | $1,579.00 | $105.27 | 10.0% |
| **TOTAL** | **150** | **$18,450.75** | **$123.01** | **100.0%** |

**By Service Tier:**

| Service Tier | Shipment Count | Total Cost | Avg Cost/Shipment |
|--------------|----------------|------------|-------------------|
| Economy | 45 | $3,937.50 | $87.50 |
| Standard | 78 | $9,808.50 | $125.75 |
| Express | 27 | $7,708.50 | $285.50 |
| **TOTAL** | **150** | **$21,454.50** | **$143.03** |

**Savings Summary:**

```
╔════════════════════════════════════════╗
║         OPTIMIZATION RESULTS           ║
╠════════════════════════════════════════╣
║  Total Cost (Optimized):  $18,450.75  ║
║  Cost (Single Carrier):   $21,698.25  ║
║  Total Savings:           $3,247.50   ║
║  Savings Rate:            15.0%        ║
║  Avg Savings/Shipment:    $21.65      ║
╚════════════════════════════════════════╝
```

**Features:**
- ✅ Excel formulas (SUM, AVERAGE, COUNTIF) for live calculations
- ✅ Percentage calculations
- ✅ Professional summary box with key metrics

#### Sheet 4: Dashboard

**Visual Elements:**

1. **KPI Cards (Top Section):**
```
┌────────────────────────────────────────────────┐
│  DAILY SHIPPING OPTIMIZATION - MARCH 22, 2026  │
├────────────────────────────────────────────────┤
│                                                │
│  📦 Total Shipments: 150                       │
│  💰 Total Cost (Optimized): $18,450.75         │
│  💵 Total Savings: $3,247.50 (15.0%)           │
│  📊 Average Savings per Shipment: $21.65       │
│                                                │
└────────────────────────────────────────────────┘
```

2. **Chart 1: Total Cost by Carrier (Bar Chart)**
```
Cost by Carrier ($)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FedEx              ████████████ $5,678
UPS                ██████████ $4,893
DHL                ███████ $3,456
Regional Express   ██████ $2,845
Economy Freight    ███ $1,579
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

3. **Chart 2: Shipment Distribution (Pie Chart)**
```
      FedEx 30%
   ┌─────────────┐
   │   ╱──╲      │  UPS 25%
   │  │FedEx│    │
   │   ╲──╱      │
   │    ╱────────┤  DHL 19%
   │   │ UPS    ││
   │   │        ││  Regional 16%
   │   └────────┘│
   │   DHL       │  Economy 10%
   └─────────────┘
```

4. **Chart 3: Service Tier Distribution (Stacked Bar)**
Shows breakdown of Economy/Standard/Express by carrier

5. **Chart 4: Top 10 Cost Savers (Horizontal Bar)**
```
Top 10 Shipments by Savings
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SH-047  ████████████████ $125.50
SH-089  ███████████████ $118.25
SH-134  ████████████ $98.75
SH-023  ███████████ $87.50
SH-156  ██████████ $82.00
SH-078  █████████ $76.25
SH-092  ████████ $71.50
SH-045  ████████ $68.00
SH-111  ███████ $64.75
SH-087  ███████ $62.50
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Features:**
- ✅ Professional chart formatting
- ✅ Clear titles and axis labels
- ✅ Data labels on all charts
- ✅ Consistent color scheme
- ✅ Executive-ready visualization

---

## PowerPoint Presentation Example

### File: `executive-briefing-2026-03-22.pptx`

#### Slide 1: Title Slide
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       DAILY SHIPPING OPTIMIZATION REPORT
              March 22, 2026

           [Company Logo]

         Operations Analysis Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Slide 2: Executive Summary
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 ANALYSIS SCOPE
• 150 shipments analyzed
• 5 carriers compared (FedEx, UPS, DHL, Regional, Economy)
• 3 service tiers (Economy, Standard, Express)

💰 FINANCIAL IMPACT
• Optimized Cost:      $18,450.75
• Single-Carrier Cost: $21,698.25
• Savings Achieved:    $3,247.50 (15.0%)

📅 MONTHLY PROJECTION
• Estimated Monthly Savings: $97,425
  (based on 30-day average)

✅ RECOMMENDATION
Multi-carrier optimization strategy delivers consistent
15% cost savings vs. single-carrier approach.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Slide 3: Cost Analysis
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             CARRIER COST BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Bar Chart: Total Cost by Carrier]

KEY INSIGHTS
• FedEx handles 30% of volume at competitive rates
• UPS selected for 25% of shipments (best for suburban)
• Regional Express offers 16% of shipments at lowest cost
• Economy Freight used for 10% (price-sensitive shipments)

CARRIER UTILIZATION
FedEx:            45 shipments (30%)
UPS:              38 shipments (25%)
DHL:              28 shipments (19%)
Regional Express: 24 shipments (16%)
Economy Freight:  15 shipments (10%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Slide 4: Service Tier Analysis
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SERVICE TIER DISTRIBUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Stacked Bar Chart: Service Tiers by Carrier]

BREAKDOWN
Economy:  45 shipments (30%) | Avg Cost: $87.50
Standard: 78 shipments (52%) | Avg Cost: $125.75
Express:  27 shipments (18%) | Avg Cost: $285.50

OBSERVATIONS
• Standard tier dominates (52% of volume)
• Express premium averages 127% over Standard
• Economy option saves 30% vs Standard when applicable
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Slide 5: Recommendations
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         STRATEGIC RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 SHORT-TERM ACTIONS
1. Continue daily carrier optimization program
2. Implement automated carrier selection in shipping system
3. Train operations team on carrier guidelines

📊 PERFORMANCE MONITORING
1. Track daily/weekly savings trends
2. Monitor carrier service quality scores
3. Review monthly cost variance reports

🔍 STRATEGIC OPPORTUNITIES
1. Negotiate volume discounts with FedEx (30% of volume)
2. Expand Regional Express usage (best rates in 16% of cases)
3. Consider contract renegotiation with DHL for specialty items

💡 COST OPTIMIZATION TARGETS
• Current savings: 15.0%
• Target savings: 18-20% with contract renegotiations
• Potential annual impact: $1.2M in savings
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Features:**
- ✅ Professional slide design
- ✅ Clear data visualizations
- ✅ Executive-level summary (not too technical)
- ✅ Actionable recommendations
- ✅ Business impact highlighted

---

## Word Report Example

### File: `detailed-analysis-2026-03-22.docx`

#### Table of Contents
1. Executive Summary
2. Analysis Methodology
3. Detailed Findings
4. Carrier-by-Carrier Analysis
5. Special Handling Summary
6. Cost Optimization Opportunities
7. Recommendations
8. Appendices

#### Sample Section: Executive Summary

> **Daily Shipping Optimization Analysis**
> *March 22, 2026*
>
> **Overview**
>
> This report presents the results of our daily shipping carrier optimization analysis for 150 outbound shipments. By comparing rates across five contracted carriers (FedEx, UPS, DHL, Regional Express, and Economy Freight), we identified optimal carrier selections that minimize total shipping costs while maintaining service level commitments.
>
> **Key Findings**
>
> Our multi-carrier optimization strategy achieved significant cost savings:
> - **Total Optimized Cost:** $18,450.75
> - **Single-Carrier Baseline:** $21,698.25 (using most expensive carrier for all)
> - **Savings Achieved:** $3,247.50 (15.0% reduction)
> - **Average Savings per Shipment:** $21.65
>
> **Carrier Distribution**
>
> Optimal carrier selection resulted in the following distribution:
> - **FedEx:** 45 shipments (30%) - Selected for Express reliability and urban coverage
> - **UPS:** 38 shipments (25%) - Best rates for Standard service, suburban delivery
> - **DHL:** 28 shipments (19%) - Specialty handling, high-value items
> - **Regional Express:** 24 shipments (16%) - Lowest cost for regional destinations
> - **Economy Freight:** 15 shipments (10%) - Price-sensitive, non-urgent deliveries
>
> **Recommendations**
>
> Based on this analysis, we recommend:
> 1. Continuing the daily optimization program
> 2. Implementing automated carrier selection in our shipping system
> 3. Pursuing volume discount negotiations with FedEx (30% volume concentration)
> 4. Expanding Regional Express usage for eligible routes (strong cost performance)
>
> [... continues with detailed sections ...]

**Features:**
- ✅ Professional business writing
- ✅ Clear structure with sections and subsections
- ✅ Executive-friendly language (not too technical)
- ✅ Data-driven insights
- ✅ Actionable recommendations
- ✅ Comprehensive analysis (15-25 pages typical)

---

## Summary: What You Receive

### From a Single Cowork Request

**Input:**
- Daily shipment CSV (150 rows)
- 5 carrier rate files (JSON)
- Business rules files (JSON)
- Instruction file (Markdown)

**Processing Time:** 3-6 minutes

**Output:**

1. **Excel Workbook** (4 sheets, ~200 KB)
   - Shipment details with optimal carrier
   - Full carrier comparison matrix
   - Cost summary with formulas
   - Visual dashboard with 4+ charts

2. **PowerPoint Presentation** (5-10 slides, ~2 MB)
   - Title slide
   - Executive summary
   - Cost analysis with charts
   - Service tier breakdown
   - Strategic recommendations

3. **Word Report** (15-20 pages, ~500 KB)
   - Executive summary
   - Methodology
   - Detailed findings
   - Carrier evaluations
   - Recommendations

**Total Value:**
- Replaces 8+ hours of manual work
- Professional, executive-ready format
- Immediately actionable
- Reproducible and consistent
- Scales to 10x volume with same effort

---

## Use These Examples

Use these descriptions to understand:
1. What level of quality to expect from Cowork
2. How to structure your own instruction files
3. What specific deliverables to request
4. How professional the outputs will be

When creating your own Cowork tasks, reference these examples to set expectations and specify desired output formats.
