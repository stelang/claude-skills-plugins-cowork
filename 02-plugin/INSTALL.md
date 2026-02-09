# Installation Guide - Premium Calculator MCP Server

## One-Command Installation ⚡

```bash
cd 02-plugin && npm install && npm run setup
```

That's it! This will:
1. ✅ Install all dependencies
2. ✅ Build the TypeScript server automatically
3. ✅ Guide you through Claude Code configuration
4. ✅ Get you ready to use the plugin

---

## What Happens Automatically

### Step 1: `npm install`
When you run `npm install`, these happen automatically:

1. **Installs dependencies** - MCP SDK and TypeScript
2. **Runs prepare script** - Compiles TypeScript to JavaScript
3. **Runs postinstall script** - Shows success message and next steps

You'll see output like:
```
✅ Premium Calculator MCP Server - Installation Complete!
✅ TypeScript compiled successfully
📦 Server ready at: /path/to/02-plugin/dist/index.js
```

### Step 2: `npm run setup`
Interactive configuration wizard that:

1. **Detects your platform** - macOS, Windows, or Linux
2. **Finds Claude Code config** - Automatically locates the config file
3. **Checks existing config** - Won't overwrite without asking
4. **Adds server configuration** - Writes the proper JSON config
5. **Confirms success** - Shows next steps

You'll be asked:
```
Add this configuration to Claude Code? (yes/no):
```

Type `yes` and you're done!

---

## Detailed Installation Steps

### Prerequisites

- **Node.js 18+** - Check: `node --version`
- **npm** - Check: `npm --version`
- **Claude Code** - Installed and working

### Method 1: Automated (Recommended)

```bash
# Navigate to plugin directory
cd 02-plugin

# Install and build (automatic)
npm install

# Configure Claude Code (interactive)
npm run setup
```

Follow the prompts, then **restart Claude Code**.

### Method 2: Manual Configuration

If you prefer manual setup:

```bash
# Install and build
cd 02-plugin
npm install

# Get the server path
pwd
# Copy the output, you'll need it

# Manually edit Claude Code config
# Location varies by platform:
# - macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
# - Windows: %APPDATA%\Claude\claude_desktop_config.json
# - Linux: ~/.config/Claude/claude_desktop_config.json

# Add this configuration:
{
  "mcpServers": {
    "premium-calculator": {
      "command": "node",
      "args": [
        "/absolute/path/to/02-plugin/dist/index.js"
      ]
    }
  }
}
```

Save and restart Claude Code.

---

## Verification

After installation and restart:

### 1. Check Server is Loaded

In Claude Code:
```
List available MCP servers
```

You should see `premium-calculator` in the list.

### 2. Test Basic Calculation

```
Use premium-calculator to calculate a quote for:
- Age: 35
- Coverage: $500,000
- Health Class: standard
```

Expected result:
```json
{
  "monthlyPremium": "125.00",
  "annualPremium": "1500.00"
}
```

### 3. Test Resource Access

```
Read the rate-tables resource from premium-calculator
```

You should see the JSON structure with age brackets and health classes.

---

## Troubleshooting

### "Server not found" after restart

**Cause:** Configuration path might be wrong

**Fix:**
```bash
# Run setup again
npm run setup

# Or verify the path manually
ls 02-plugin/dist/index.js
# Should show the file exists
```

### "Build failed" during npm install

**Cause:** TypeScript compilation error or missing dependencies

**Fix:**
```bash
# Clean install
rm -rf node_modules dist
npm install

# If still fails, check Node version
node --version  # Must be 18+
```

### "Permission denied" when writing config

**Cause:** Setup script can't write to Claude Code config

**Fix:** Use manual configuration method (see Method 2 above)

### "Module not found" when server starts

**Cause:** Dependencies not installed or build didn't complete

**Fix:**
```bash
# Ensure dependencies are installed
npm install

# Rebuild
npm run build

# Verify dist exists
ls dist/index.js
```

---

## Platform-Specific Notes

### macOS

Config location: `~/Library/Application Support/Claude/claude_desktop_config.json`

The setup script handles spaces in the path automatically.

### Windows

Config location: `%APPDATA%\Claude\claude_desktop_config.json`

Use forward slashes or escaped backslashes in paths:
```json
"C:/Users/YourName/02-plugin/dist/index.js"
// OR
"C:\\Users\\YourName\\02-plugin\\dist\\index.js"
```

### Linux

Config location: `~/.config/Claude/claude_desktop_config.json`

Ensure the config directory exists:
```bash
mkdir -p ~/.config/Claude
```

---

## What Gets Installed

### Dependencies (in node_modules/)

- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `@types/node` - TypeScript definitions for Node.js
- `typescript` - TypeScript compiler

### Built Files (in dist/)

- `index.js` - Compiled MCP server
- `index.d.ts` - TypeScript definitions
- `index.js.map` - Source maps for debugging

### Total Size

- node_modules: ~50MB
- dist: ~50KB
- Total: ~50MB

---

## Configuration File Explained

The setup script adds this to your Claude Code config:

```json
{
  "mcpServers": {
    "premium-calculator": {
      "command": "node",
      "args": ["/absolute/path/to/02-plugin/dist/index.js"]
    }
  }
}
```

**What this means:**
- `mcpServers` - List of MCP servers Claude Code can use
- `premium-calculator` - The name Claude will use to identify this server
- `command` - The program to run (Node.js)
- `args` - Arguments to pass (path to our server)

**Important:** The path MUST be absolute, not relative.

---

## Updating the Plugin

If you pull updates from git:

```bash
# Rebuild
npm run build

# Configuration doesn't need updating
# Just restart Claude Code
```

If data files change (rate-tables.json, underwriting-guidelines.json):
- No rebuild needed
- No restart needed
- Changes take effect immediately

---

## Uninstalling

### Remove from Claude Code

1. Edit Claude Code config file
2. Remove the `premium-calculator` section
3. Restart Claude Code

### Remove Plugin Files

```bash
# From project root
rm -rf 02-plugin/node_modules
rm -rf 02-plugin/dist

# Or delete the entire directory
rm -rf 02-plugin
```

---

## Development Setup

For developers who want to modify the plugin:

```bash
# Install
npm install

# Development mode (auto-rebuild on changes)
npm run watch

# Manual build
npm run build

# Test server directly
npm start
```

When developing:
1. Make changes to `src/index.ts`
2. Save (auto-builds if using `npm run watch`)
3. Restart Claude Code to load changes

---

## Next Steps

After successful installation:

1. **Read QUICKSTART.md** - 5-minute tutorial
2. **Read EXAMPLES.md** - 17 practical examples
3. **Read README.md** - Complete documentation
4. **Try calculations** - Start using the plugin!

---

## Support

### Common Questions

**Q: Do I need to run setup every time?**
A: No, only once. Configuration persists across restarts.

**Q: Can I have multiple MCP servers?**
A: Yes! Each server gets its own entry in `mcpServers`.

**Q: Can I rename the server?**
A: Yes, change `premium-calculator` to any name in the config.

**Q: How do I update rate tables?**
A: Just edit `data/rate-tables.json`. No rebuild needed.

**Q: Does this work with Claude web interface?**
A: No, MCP servers only work with Claude Code (desktop app).

### Getting Help

1. Check troubleshooting section above
2. Review error messages in Claude Code console
3. Verify paths are absolute and correct
4. Ensure Node.js version is 18+

---

## Installation Checklist

- [ ] Node.js 18+ installed
- [ ] Navigated to `02-plugin` directory
- [ ] Ran `npm install` successfully
- [ ] Saw build success message
- [ ] Ran `npm run setup`
- [ ] Confirmed configuration
- [ ] Restarted Claude Code
- [ ] Verified server appears in list
- [ ] Tested basic calculation
- [ ] Read documentation

---

**Installation complete? Try this:**

```
Use premium-calculator to calculate a quote for:
- Age: 45
- Coverage: $750,000
- Health Class: standard

Then get underwriting recommendation for:
- Age: 45
- Coverage: $750,000
- Risk Factors:
  - Smoker: never
  - BMI: 25
  - Blood Pressure: 120/80
  - Occupation: software engineer
```

Welcome to MCP plugins! 🎉
