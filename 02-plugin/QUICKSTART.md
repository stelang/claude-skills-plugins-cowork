# Quick Start Guide - Premium Calculator Plugin

Get up and running with the Premium Calculator MCP Plugin in 2 minutes with automated setup!

## Prerequisites

- Node.js 18+ installed
- Claude Code installed
- Basic familiarity with terminal/command line

## ⚡ Automated Installation (Recommended)

### One Command Setup:

```bash
cd 02-plugin && npm install && npm run setup
```

That's it! This will:
1. ✅ Install dependencies automatically
2. ✅ Build the server automatically
3. ✅ Launch interactive setup wizard
4. ✅ Configure Claude Code for you

**After setup completes:**
- Restart Claude Code
- You're ready to go!

See [INSTALL.md](INSTALL.md) for detailed installation guide.

---

## Manual Installation (Alternative)

If you prefer to configure manually, follow these 5 steps:

### 1. Navigate to Plugin Directory

```bash
cd 02-plugin
```

### 2. Install Dependencies

```bash
npm install
```

This installs the MCP SDK and TypeScript compiler.

### 3. Build the Server

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### 4. Get Absolute Path

```bash
pwd
```

Copy the output (e.g., `/Users/yourname/project/02-plugin`)

### 5. Configure Claude Code

**macOS:**
```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
code %APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
code ~/.config/Claude/claude_desktop_config.json
```

Add this configuration (replace with YOUR absolute path):

```json
{
  "mcpServers": {
    "premium-calculator": {
      "command": "node",
      "args": [
        "/YOUR/ABSOLUTE/PATH/02-plugin/dist/index.js"
      ]
    }
  }
}
```

**Save the file and restart Claude Code.**

## Verify Installation

Open Claude Code and try:

```
List available MCP servers
```

You should see `premium-calculator` listed.

## Your First Calculation

Try this:

```
Use the premium-calculator plugin to calculate a quote for:
- Age: 35
- Coverage: $500,000
- Health Class: standard
```

Expected response:
```json
{
  "monthlyPremium": "125.00",
  "annualPremium": "1500.00",
  ...
}
```

## Your First Underwriting Assessment

Try this:

```
Get underwriting recommendation from premium-calculator for:
- Age: 40
- Coverage: $1,000,000
- Risk Factors:
  - Smoker: never
  - BMI: 24
  - Blood Pressure: 120/78
  - Occupation: teacher
```

You'll receive a recommended health class and required tests.

## What's Available

### 3 Tools

1. **calculate_premium** - Calculate premiums
2. **get_underwriting_recommendation** - Assess risk
3. **get_rate_table_info** - Get version info

### 2 Resources

1. **rate-tables** - Age brackets and health classes
2. **underwriting-guidelines** - Complete underwriting rules

## Read Resources

Try this:

```
Read the rate-tables resource from premium-calculator and show me the age brackets
```

Claude will read and explain the rate structure.

## Troubleshooting

### "Server not found"
- Did you restart Claude Code after editing config?
- Is the path in config absolute (not relative)?
- Check: does `02-plugin/dist/index.js` exist?

### "Build failed"
- Run: `npm install` (installs dependencies)
- Check Node version: `node --version` (needs 18+)
- Delete `node_modules` and `dist`, then retry

### "Cannot find module"
- Make sure you ran `npm run build`
- Check that `dist/` directory exists
- Verify `data/` directory has JSON files

### "Age must be between 18-80"
- This is expected validation - adjust your test input

## Development Mode

To work on the plugin:

```bash
npm run watch
```

This rebuilds automatically when you edit `src/index.ts`.

You'll need to restart Claude Code to pick up changes.

## Next Steps

1. ✅ Read `README.md` - Complete documentation
2. ✅ Try examples from `EXAMPLES.md` - 17 usage examples
3. ✅ Modify rate tables in `data/rate-tables.json`
4. ✅ Explore guidelines in `data/underwriting-guidelines.json`
5. ✅ Add your own tools or resources

## Common First Tasks

### Update Rate Tables

Edit `data/rate-tables.json`:
```json
{
  "ageBrackets": [
    {
      "minAge": 18,
      "maxAge": 30,
      "baseRate": 0.15  // ← Change this
    }
  ]
}
```

Changes take effect immediately (no restart needed).

### Add a New Health Class

Edit `data/rate-tables.json`:
```json
{
  "healthClasses": {
    "super_preferred": {
      "multiplier": 0.75,
      "description": "Exceptional health",
      "requirements": ["Perfect health markers"]
    }
  }
}
```

Now you can use "super_preferred" in calculations.

## Getting Help

1. **Check README.md** - Full documentation
2. **Review EXAMPLES.md** - 17 practical examples
3. **Validate JSON** - Use jsonlint.com for data files
4. **Check logs** - Server logs appear in Claude Code console

## Key Commands

```bash
# Install dependencies
npm install

# Build server
npm run build

# Development mode (auto-rebuild)
npm run watch

# Start server manually (for testing)
npm start

# Get current directory (for config)
pwd
```

## Configuration Template

Save this to your Claude Code config (with YOUR path):

```json
{
  "mcpServers": {
    "premium-calculator": {
      "command": "node",
      "args": ["/absolute/path/to/02-plugin/dist/index.js"],
      "env": {}
    }
  }
}
```

**Critical:** Use absolute path (starts with `/` on Mac/Linux or `C:\` on Windows).

## Success Checklist

- [ ] Node.js 18+ installed
- [ ] `npm install` completed successfully
- [ ] `npm run build` completed successfully
- [ ] `dist/index.js` file exists
- [ ] Claude Code config updated with absolute path
- [ ] Claude Code restarted
- [ ] "List MCP servers" shows premium-calculator
- [ ] First calculation works
- [ ] Can read resources

## What You Just Built

You now have a working MCP plugin that:
- ✅ Reads external data files (rate tables, guidelines)
- ✅ Provides 3 specialized tools
- ✅ Exposes 2 readable resources
- ✅ Validates inputs and handles errors
- ✅ Integrates with Claude Code

This is the foundation for Part 3 (Agent Teams)!

## File Structure Reference

```
02-plugin/
├── src/
│   └── index.ts          # Your MCP server code
├── data/
│   ├── rate-tables.json  # Rates (you can edit this!)
│   └── underwriting-guidelines.json  # Rules (you can edit this!)
├── dist/                 # Compiled JS (generated by build)
│   └── index.js          # ← This is what runs
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── README.md             # Full documentation
```

## Pro Tips

1. **Edit data files freely** - No rebuild needed
2. **Code changes need rebuild** - Run `npm run build`
3. **Use absolute paths** - Relative paths won't work in config
4. **Restart Claude after config changes** - Required for new servers
5. **Check console for errors** - Server logs help debug

---

**Ready to go deeper?** Read `README.md` for complete documentation and `EXAMPLES.md` for 17 practical examples.

**Having issues?** Check the Troubleshooting section in `README.md`.

---

*You've just built your first MCP plugin! 🎉*
