# Quick Start Testing Guide

## Setup Status ✅

- ✅ Plugin built successfully (`dist/index.js` exists)
- ✅ Data files validated (rate-tables.json and shipping-rules.json)
- ✅ Configuration file updated with correct path
- ⏳ **NEXT STEP**: Configure Claude Desktop and restart

## Step 1: Configure Claude Desktop

Copy the MCP server configuration to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

Add this configuration (or merge with existing):

```json
{
  "mcpServers": {
    "shipping-calculator": {
      "command": "node",
      "args": [
        "/Users/stelang/code/claude-skills-plugins-cowork/02-plugin/dist/index.js"
      ],
      "env": {}
    }
  }
}
```

## Step 2: Restart Claude Desktop

After updating the configuration, **completely quit and restart Claude Desktop** (not just reload the window).

## Step 3: Verify Installation

In Claude Desktop, ask:

```
List available MCP servers
```

You should see `shipping-calculator` in the list.

## Step 4: Run Quick Tests

### Test 1: Get Rate Table Info (Simplest Test)

```
Use the shipping-calculator MCP server to show me information about the current rate tables
```

**Expected output:**
```json
{
  "success": true,
  "version": "2026-Q1",
  "effectiveDate": "2026-01-01",
  "distanceBrackets": 6,
  "serviceTiers": ["economy", "standard", "express"],
  "weightRange": {
    "minimum": 1,
    "maximum": 150
  },
  "baseHandlingFee": 5.00
}
```

### Test 2: Simple Shipping Calculation

```
Calculate shipping cost using the shipping-calculator for:
- Weight: 25 lbs
- Distance: 450 miles
- Service Tier: standard
```

**Expected result:**
- Total cost around $117.50
- Delivery estimate: 3-5 business days

### Test 3: Get Shipping Recommendation

```
Get a shipping recommendation for:
- Weight: 75 lbs
- Package Characteristics:
  - Fragility: fragile
  - Perishability: non_perishable
  - Size: standard
  - Hazmat: none
  - Destination: residential
```

**Expected result:**
- Recommended tier: standard
- Total surcharges: $30 ($15 fragile + $10 heavy + $5 residential)
- Various requirements listed

### Test 4: Read Resources

```
Read the rate-tables resource from the shipping-calculator and explain the distance bracket structure
```

**Expected:** Claude should read and analyze the rate structure.

## Step 5: Run Full Test Suite

See `test-cases.md` for comprehensive testing covering:
- All distance brackets
- All service tiers
- Edge cases and error handling
- Complex multi-factor scenarios
- Resource access

## Troubleshooting

### Server Not Appearing

1. **Check path**: Ensure the path in config is absolute and correct
2. **Check build**: Run `ls -la /Users/stelang/code/claude-skills-plugins-cowork/02-plugin/dist/index.js`
3. **Check Node**: Run `node --version` (should be >= 18)
4. **Restart**: Completely quit and restart Claude Desktop

### Manual Server Test

You can verify the server starts (though you won't see output since it uses stdio):

```bash
cd /Users/stelang/code/claude-skills-plugins-cowork/02-plugin
node dist/index.js
```

You should see: `Shipping Cost Calculator MCP Server running on stdio` in stderr.
Press Ctrl+C to stop.

### Check Logs

Claude Desktop logs can help diagnose issues:

**macOS:** `~/Library/Logs/Claude/`

Look for MCP-related errors.

## Quick Test Checklist

- [ ] Claude Desktop config updated
- [ ] Claude Desktop restarted
- [ ] Server appears in MCP server list
- [ ] Test 1: Rate table info works
- [ ] Test 2: Shipping calculation works
- [ ] Test 3: Recommendation works
- [ ] Test 4: Resource reading works

## What's Working

Based on validation:
- ✅ Plugin compiled successfully
- ✅ Data files accessible (rate-tables.json, shipping-rules.json)
- ✅ JSON data valid
- ✅ Configuration file has correct path

## Demo Script Ideas

Once testing is confirmed working, try these realistic scenarios:

1. **Compare service tiers:**
   "Compare the cost of shipping 30 lbs for 1200 miles using all three service tiers"

2. **Complex package:**
   "I have a 60 lb fragile item to ship 800 miles to a rural address. Give me a recommendation and calculate the total cost."

3. **Perishable rush:**
   "I need to ship 25 lbs of perishable food 400 miles. What are my options and costs?"

4. **Analyze pricing:**
   "Read the rate tables and explain how shipping costs scale with distance"

## Success Criteria

You'll know everything is working when:
1. ✅ Server loads in Claude Desktop
2. ✅ All three tools respond correctly
3. ✅ Resources can be read and analyzed
4. ✅ Error handling works (invalid inputs show proper errors)
5. ✅ Calculations match expected values

## Next Steps After Testing

Once testing is complete:
- Document any issues found
- Test edge cases thoroughly
- Try complex multi-step scenarios
- Consider writing automated tests
- Explore combining multiple tool calls

---

**Current Status:** Ready for Claude Desktop integration testing
**Estimated Time:** 5-10 minutes for initial setup and basic tests
