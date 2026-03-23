# Sample Data for Cowork Shipping Examples

This directory contains realistic sample data for testing and demonstrating Cowork shipping optimization capabilities.

## Files Overview

### Shipment Data

**`daily-shipments-10.csv`** - Starter file with 10 sample shipments
- Perfect for your first Cowork test
- Quick processing (~1-2 minutes)
- Covers diverse scenarios (fragile, high-value, different tiers)

**`daily-shipments-150.csv`** - Full daily analysis with 150 shipments
- Realistic daily operations volume
- Mix of service tiers (Economy 30%, Standard 52%, Express 18%)
- Diverse destinations across all US states
- Various package types and special handling requirements
- Processing time: ~3-5 minutes

### Carrier Rate Tables (`carrier-rates/`)

Each carrier has different pricing strategies and capabilities:

**`fedex-rates.json`**
- Premium carrier with excellent Express service
- Nationwide coverage including Alaska/Hawaii
- Higher base rates but strong Express reliability
- $5.50 base handling fee
- Alaska/Hawaii surcharge: $25

**`ups-rates.json`**
- Best Standard service value
- Competitive rates, excellent tracking
- Nationwide coverage including Alaska/Hawaii
- $5.00 base handling fee
- Alaska/Hawaii surcharge: $28

**`dhl-rates.json`**
- Specializes in high-value items
- Signature included (no extra charge)
- Strong international connections
- $6.00 base handling fee
- Alaska/Hawaii surcharge: $30

**`regional-express-rates.json`**
- Best rates for Northeast and Midwest regions
- **Limited service area** (23 states only)
- Does NOT serve: West Coast, South, Alaska/Hawaii
- $4.50 base handling fee
- Lowest rates in covered regions

**`economy-freight-rates.json`**
- Lowest cost option for eligible shipments
- **Cannot handle fragile items**
- **No Express service available**
- Does NOT serve Alaska/Hawaii
- $3.50 base handling fee
- Delivery time: 7-14 days

### Business Rules (`business-rules/`)

**`special-handling-rules.json`**
- Fragile item requirements (exclude Economy Freight)
- High-value item rules (signature required if >$1000)
- Dimensional weight calculations
- Medical/pharmaceutical handling
- Electronics protection requirements
- Hazmat restrictions
- Perishable goods rules

**`carrier-service-areas.json`**
- Geographic coverage by carrier
- Regional recommendations
- Alaska/Hawaii surcharges
- Rural delivery capabilities
- Optimization rules

## Data Characteristics

### Shipment Distribution (150-shipment file)

**By Service Tier:**
- Economy: 45 shipments (30%)
- Standard: 78 shipments (52%)
- Express: 27 shipments (18%)

**Special Handling:**
- Fragile items: ~20%
- High-value (>$1000): ~15%
- Electronics: ~12%
- Medical supplies: ~5%

**Geographic Distribution:**
- Northeast: 25%
- Midwest: 20%
- South: 25%
- West: 28%
- Alaska/Hawaii: 2%

**Weight Distribution:**
- Light (<20 lbs): 35%
- Medium (20-40 lbs): 45%
- Heavy (40+ lbs): 20%

## Expected Analysis Results

When processing the 150-shipment file with all 5 carriers:

**Anticipated Carrier Distribution:**
- FedEx: ~45 shipments (30%) - Express reliability, urban areas
- UPS: ~38 shipments (25%) - Standard service value
- DHL: ~28 shipments (19%) - High-value, specialty
- Regional Express: ~24 shipments (16%) - Northeast/Midwest best rates
- Economy Freight: ~15 shipments (10%) - Cost-sensitive, non-fragile

**Expected Savings:**
- Total optimized cost: ~$18,450
- Single-carrier baseline: ~$21,700
- Savings: ~$3,250 (15% reduction)
- Average savings per shipment: ~$22

## How to Use This Data

### Quick Start (10 shipments)

1. Open Claude Desktop
2. Upload files:
   - `daily-shipments-10.csv`
   - `carrier-rates/fedex-rates.json`
   - `carrier-rates/ups-rates.json`
3. Request simple 2-carrier comparison
4. Verify results make sense

### Full Analysis (150 shipments)

1. Open Claude Desktop
2. Upload files:
   - `daily-shipments-150.csv`
   - All 5 carrier rate files
   - Both business rules files
3. Request comprehensive analysis with Excel/PowerPoint/Word outputs
4. Review professional deliverables

### Custom Scenarios

Edit the CSV files to test specific scenarios:
- All fragile items
- All high-value items
- Specific geographic regions
- Single service tier
- Extreme weights or dimensions

## Data Format Details

### Shipment CSV Columns

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| shipment_id | String | Unique ID | SH-001 |
| destination_city | String | City name | Chicago |
| destination_state | String | 2-letter code | IL |
| weight_lbs | Number | Weight in pounds | 25 |
| length_in | Number | Length in inches | 18 |
| width_in | Number | Width in inches | 14 |
| height_in | Number | Height in inches | 10 |
| service_tier | String | Economy, Standard, or Express | Standard |
| contents | String | Package description | Electronics |
| fragile | String | Yes or No | Yes |
| value_usd | Number | Declared value | 850 |
| distance_miles | Number | Shipping distance | 450 |

### Rate JSON Structure

```json
{
  "carrier": "Carrier Name",
  "rate_structure": {
    "distance_brackets": [...],
    "service_tier_multipliers": {...},
    "base_handling_fee": 5.00,
    "surcharges": {...}
  },
  "service_areas": {...},
  "weight_limits": {...},
  "dimensional_weight": {...}
}
```

## Validation

All data has been validated for:
- ✅ Consistent formatting
- ✅ Realistic values
- ✅ Geographic accuracy
- ✅ Carrier capability constraints
- ✅ Business rule compliance

## Tips for Best Results

1. **Start small** - Use 10-shipment file first
2. **Verify calculations** - Spot-check a few results manually
3. **Understand constraints** - Regional Express limited coverage, Economy Freight restrictions
4. **Apply business rules** - Fragile items exclude certain carriers
5. **Optimize iteratively** - Start with basic cost comparison, add complexity

## Troubleshooting

**Issue: Regional Express selected for California shipment**
- Problem: Regional Express doesn't serve West Coast
- Solution: Ensure business rules file is loaded and applied

**Issue: Economy Freight selected for fragile item**
- Problem: Economy Freight can't handle fragile
- Solution: Apply special handling rules

**Issue: Very high costs for Alaska/Hawaii**
- Problem: Surcharges are significant for these destinations
- Solution: This is realistic - verify surcharges are being applied

## Next Steps

1. Try the 10-shipment quick start
2. Scale to 150 shipments with all carriers
3. Modify CSV to create custom scenarios
4. Build your own instruction templates
5. Create recurring daily/weekly workflows

---

**Note:** All data is synthetic and created for educational purposes. Real carrier rates and business rules would need to be obtained from actual carrier contracts.
