# Getting Started - Premium Calculator MCP Plugin

## 🚀 Two-Minute Installation

### The Fastest Way:

```bash
cd 02-plugin
npm install
npm run setup
```

**Then restart Claude Code. Done!** ✨

---

## What Just Happened?

### Command 1: `npm install`

```
Running: npm install
├─ Installing @modelcontextprotocol/sdk...  ✓
├─ Installing typescript...                 ✓
├─ Installing @types/node...                ✓
├─ Running prepare script...                ✓
│  └─ Compiling TypeScript...               ✓
└─ Running postinstall script...            ✓
   └─ Showing success message               ✓

✅ Server ready at: dist/index.js
```

### Command 2: `npm run setup`

```
Running: Interactive Setup Wizard

🔍 Detecting your system...
   Platform: macOS
   Config: ~/Library/Application Support/Claude/claude_desktop_config.json

📝 Configuration:
   {
     "mcpServers": {
       "premium-calculator": {
         "command": "node",
         "args": ["/absolute/path/to/dist/index.js"]
       }
     }
   }

❓ Add this configuration to Claude Code? (yes/no): yes

✅ Configuration written!
⚠️  Please RESTART Claude Code
```

---

## Your First Calculation

After restarting Claude Code:

### 1. Verify Installation

```
List available MCP servers
```

Look for `premium-calculator` ✓

### 2. Calculate a Premium

```
Use premium-calculator to calculate:
- Age: 35
- Coverage: $500,000
- Health Class: standard
```

**Result:**
```json
{
  "monthlyPremium": "125.00",
  "annualPremium": "1500.00"
}
```

### 3. Get Underwriting Recommendation

```
Get underwriting recommendation from premium-calculator for:
- Age: 40
- Coverage: $1,000,000
- Risk Factors:
  - Smoker: never
  - BMI: 24
  - Blood Pressure: 118/75
  - Occupation: teacher
```

**Result:**
```json
{
  "recommendedClass": "preferred",
  "requiredTests": [...],
  "notes": ["Long-term non-smoker - preferred class eligible", ...]
}
```

---

## What's Available?

### 🛠️ 3 Tools

| Tool | Purpose |
|------|---------|
| `calculate_premium` | Calculate premiums with external rate tables |
| `get_underwriting_recommendation` | Assess risk and recommend health class |
| `get_rate_table_info` | Get rate table version info |

### 📚 2 Resources

| Resource | Content |
|----------|---------|
| `rate-tables` | Age brackets, health classes, rates |
| `underwriting-guidelines` | Risk factors, requirements, rules |

---

## Quick Examples

### Example 1: Compare Health Classes

```
Compare premiums for a 50-year-old with $1M coverage across all health classes
```

| Class | Monthly | Annual | vs Standard |
|-------|---------|--------|-------------|
| Preferred | $722.50 | $8,670 | -15% |
| Standard | $850.00 | $10,200 | baseline |
| Substandard | $1,147.50 | $13,770 | +35% |

### Example 2: Age Bracket Impact

```
Show how premiums change at age 40 vs 41 for $500K standard coverage
```

- **Age 40:** $125/month (bracket 31-40, rate $0.25)
- **Age 41:** $225/month (bracket 41-50, rate $0.45)
- **Increase:** $100/month (80% jump!)

### Example 3: Read Rate Tables

```
Read the rate-tables resource and explain the structure
```

Claude will read and explain:
- 6 age brackets (18-30, 31-40, 41-50, 51-60, 61-70, 71-80)
- 3 health classes with multipliers
- Coverage range: $50K - $5M

---

## File Structure

```
02-plugin/
├── 📖 Documentation
│   ├── GETTING-STARTED.md    ← You are here!
│   ├── INSTALL.md            Full installation guide
│   ├── QUICKSTART.md         5-minute tutorial
│   ├── README.md             Complete reference
│   └── EXAMPLES.md           17 usage examples
│
├── 💻 Source Code
│   ├── src/
│   │   └── index.ts          MCP server implementation
│   └── dist/                 Compiled JavaScript (auto-generated)
│       └── index.js
│
├── 📊 Data
│   ├── data/
│   │   ├── rate-tables.json  Rate data (edit freely!)
│   │   └── underwriting-guidelines.json  Rules (edit freely!)
│
├── 🔧 Scripts
│   └── scripts/
│       ├── postinstall.js    Runs after npm install
│       └── setup.js          Interactive configuration
│
└── ⚙️ Config
    ├── package.json          Dependencies & scripts
    ├── tsconfig.json         TypeScript config
    └── .gitignore           Git ignore rules
```

---

## Common Tasks

### Update Rate Tables

```bash
# Edit the file
nano 02-plugin/data/rate-tables.json

# No rebuild needed - changes take effect immediately!
```

### Modify Server Code

```bash
# Edit source
nano 02-plugin/src/index.ts

# Rebuild
cd 02-plugin
npm run build

# Restart Claude Code
```

### Development Mode

```bash
# Auto-rebuild on changes
npm run watch

# In another terminal, test changes
# (Restart Claude Code after each change)
```

---

## Troubleshooting Quick Fixes

### "Server not found"

```bash
# Re-run setup
npm run setup

# Verify file exists
ls dist/index.js
```

### "Module not found"

```bash
# Clean reinstall
rm -rf node_modules dist
npm install
```

### "Build failed"

```bash
# Check Node version (must be 18+)
node --version

# Rebuild
npm run build
```

---

## Learning Path

**Just Starting?**
1. ✅ You are here - Getting Started
2. ⏭️ Try the examples above
3. ⏭️ Read [QUICKSTART.md](QUICKSTART.md) for more examples

**Want Details?**
1. ✅ Getting Started (done!)
2. ⏭️ [INSTALL.md](INSTALL.md) - Deep dive on installation
3. ⏭️ [README.md](README.md) - Complete documentation
4. ⏭️ [EXAMPLES.md](EXAMPLES.md) - 17 practical examples

**Ready to Build?**
1. ✅ Getting Started (done!)
2. ⏭️ Modify rate tables in `data/`
3. ⏭️ Add new tools to `src/index.ts`
4. ⏭️ Create your own MCP plugin!

---

## Next Steps

### Learn More

- **5 minutes:** [QUICKSTART.md](QUICKSTART.md)
- **15 minutes:** [README.md](README.md)
- **30 minutes:** [EXAMPLES.md](EXAMPLES.md) - Try all 17 examples

### Build More

- **Part 3:** Agent Teams (coming next)
- **Part 4:** Cowork orchestration (coming soon)

### Customize

- Edit `data/rate-tables.json` to change rates
- Edit `data/underwriting-guidelines.json` to add rules
- Modify `src/index.ts` to add new tools

---

## Help & Support

### Quick Answers

**Q: Where's my Claude Code config?**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

**Q: How do I know it's working?**
Try: `List available MCP servers` - You should see `premium-calculator`

**Q: Can I rename the server?**
Yes! Change `"premium-calculator"` in the config to any name.

**Q: Do I need to rebuild after editing data files?**
No! Data file changes (rate-tables.json, underwriting-guidelines.json) take effect immediately.

---

## Success Checklist

Installation complete when:
- [ ] `npm install` completed successfully
- [ ] `npm run setup` configured Claude Code
- [ ] Claude Code restarted
- [ ] "List MCP servers" shows premium-calculator
- [ ] First calculation returns results
- [ ] Can read resources

---

**Ready to calculate? Try this now:**

```
Use premium-calculator to calculate a quote for:
- Age: 28
- Coverage: $500,000
- Health Class: preferred

Then show me what health class requirements exist by reading the rate-tables resource.
```

---

🎉 **You're all set!** Start exploring the plugin capabilities or dive into the documentation to learn more.

---

**Quick Links:**
- [Installation Guide](INSTALL.md) - Detailed setup
- [Quick Start](QUICKSTART.md) - 5-minute tutorial
- [Full Documentation](README.md) - Complete reference
- [17 Examples](EXAMPLES.md) - Practical use cases
