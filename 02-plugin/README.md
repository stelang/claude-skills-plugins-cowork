# Part 2: Building a Premium Calculator MCP Plugin

This directory contains all the code and documentation for **Part 2** of the blog series: "From Skills to Cowork - Building an MCP Plugin."

## What's New in Part 2

In Part 1, we built a simple **Skill** that calculated premiums using hardcoded formulas. In Part 2, we're upgrading to a **Plugin (MCP Server)** that:

- ✅ Reads actual rate tables from external JSON files
- ✅ Accesses comprehensive underwriting guidelines
- ✅ Provides multiple tools for calculation and assessment
- ✅ Exposes resources that Claude can read and reason about
- ✅ Demonstrates the power of Model Context Protocol (MCP)

## Architecture Overview

```
Premium Calculator Plugin
├── MCP Server (TypeScript)
│   ├── Tools (calculate_premium, get_underwriting_recommendation)
│   └── Resources (rate tables, underwriting guidelines)
├── Data Files
│   ├── rate-tables.json (age brackets, health classes)
│   └── underwriting-guidelines.json (risk factors, requirements)
└── Claude Code Integration
```

## What's Included

### 1. MCP Server Implementation
**Location:** `src/index.ts`

A full-featured MCP server with:
- **3 Tools:**
  - `calculate_premium` - Calculate premiums using external rate tables
  - `get_underwriting_recommendation` - Assess risk and recommend health class
  - `get_rate_table_info` - Get version and effective dates
- **2 Resources:**
  - `file:///rate-tables` - Complete rate table data
  - `file:///underwriting-guidelines` - Full underwriting rules

### 2. Data Files
**Location:** `data/`

- **rate-tables.json** - Industry-realistic rate structures:
  - 6 age brackets (18-80)
  - 3 health classifications (Preferred, Standard, Substandard)
  - Coverage limits and requirements

- **underwriting-guidelines.json** - Comprehensive underwriting rules:
  - Risk factors (smoking, BMI, blood pressure)
  - Occupation ratings
  - Hobby risk assessments
  - Coverage-specific test requirements
  - Age-specific rules

### 3. Configuration
- `package.json` - Node.js dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `claude_desktop_config.json` - Example MCP server configuration

## Installation & Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Claude Code CLI

### ⚡ Quick Install (Automated)

**One command to install everything:**

```bash
cd 02-plugin && npm install && npm run setup
```

This automatically:
1. ✅ Installs all dependencies
2. ✅ Builds the TypeScript server
3. ✅ Runs interactive setup wizard
4. ✅ Configures Claude Code

**Then just restart Claude Code and you're done!**

See [INSTALL.md](INSTALL.md) for detailed installation guide.

---

### Manual Installation (Alternative)

If you prefer manual setup:

### Step 1: Install Dependencies

```bash
cd 02-plugin
npm install
```

This automatically installs dependencies AND builds the server (via `prepare` script).

### Step 2: Verify Build

```bash
ls dist/index.js
```

If the file doesn't exist, manually build:

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Step 3: Configure Claude Code

Add the MCP server to your Claude Code configuration. The configuration file location varies by platform:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**Linux:** `~/.config/Claude/claude_desktop_config.json`

Add this to your configuration (replace with your actual path):

```json
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

### Step 4: Restart Claude Code

Restart Claude Code to load the new MCP server.

### Step 5: Verify Installation

In Claude Code, you can verify the server is running:

```
List available MCP servers
```

You should see `premium-calculator` in the list.

## Usage Examples

### Example 1: Calculate Premium with External Data

```
Use the premium-calculator MCP server to calculate a premium for:
- Age: 45
- Coverage: $750,000
- Health Class: standard
```

**What's happening behind the scenes:**
1. Claude invokes the `calculate_premium` tool
2. The MCP server reads `rate-tables.json`
3. Server finds the appropriate age bracket (41-50, rate $0.45)
4. Applies standard health multiplier (1.0)
5. Returns calculated premium

**Response:**
```json
{
  "success": true,
  "input": {
    "age": 45,
    "coverage": 750000,
    "healthClass": "standard"
  },
  "result": {
    "monthlyPremium": "337.50",
    "annualPremium": "4050.00",
    "baseRate": 0.45,
    "healthMultiplier": 1.0,
    "adjustedRate": 0.45
  },
  "rateTableVersion": "2026-Q1",
  "effectiveDate": "2026-01-01"
}
```

### Example 2: Get Underwriting Recommendation

```
Use the premium-calculator MCP server to get an underwriting recommendation for:
- Age: 52
- Coverage: $1,500,000
- Risk Factors:
  - Smoker: former_recent (quit 3 years ago)
  - BMI: 28
  - Blood Pressure: 135/85
  - Occupation: software engineer
```

**What's happening:**
1. Claude invokes `get_underwriting_recommendation` tool
2. Server reads `underwriting-guidelines.json`
3. Evaluates each risk factor against guidelines
4. Determines recommended health class
5. Identifies required medical tests
6. Calculates any additional adjustments

**Response:**
```json
{
  "success": true,
  "recommendation": {
    "recommendedClass": "standard",
    "requiredTests": [
      "comprehensive blood panel",
      "EKG",
      "urinalysis",
      "blood pressure",
      "height/weight"
    ],
    "additionalAdjustments": 1.0,
    "notes": [
      "Recent former smoker - may qualify for standard",
      "BMI 30-35 - standard classification",
      "Stage 1 hypertension - standard classification"
    ]
  }
}
```

### Example 3: Access Rate Table Information

```
Use the premium-calculator MCP server to show me information about the current rate tables
```

**Response:**
```json
{
  "success": true,
  "version": "2026-Q1",
  "effectiveDate": "2026-01-01",
  "ageBrackets": 6,
  "healthClasses": ["preferred", "standard", "substandard"],
  "coverageRange": {
    "minimum": 50000,
    "maximum": 5000000
  }
}
```

### Example 4: Read Resources Directly

```
Read the rate-tables resource from the premium-calculator MCP server and explain the age bracket structure
```

Claude will:
1. Read the `file:///rate-tables` resource
2. Parse the JSON structure
3. Explain the age brackets and rate progression

## Comparison: Skill vs Plugin

### Part 1 Skill (Hardcoded)
```markdown
## Age Brackets (hardcoded in prompt)
- 18-30: $0.15
- 31-40: $0.25
...
```
**Limitations:**
- Can't be updated without editing the skill file
- No access to real data
- Single calculation method

### Part 2 Plugin (External Data)
```typescript
// Loads from external JSON file
const rateTables = await loadRateTables();
const bracket = rateTables.ageBrackets.find(...);
```
**Advantages:**
- ✅ Update rate tables without changing code
- ✅ Access multiple data sources
- ✅ Complex underwriting logic
- ✅ Multiple specialized tools
- ✅ Version tracking and effective dates

## Development

### Running in Development Mode

```bash
npm run watch
```

This will watch for changes and recompile automatically.

### Project Structure

```
02-plugin/
├── src/
│   └── index.ts              # MCP server implementation
├── data/
│   ├── rate-tables.json      # Rate data
│   └── underwriting-guidelines.json  # Underwriting rules
├── dist/                     # Compiled JavaScript (generated)
├── tests/                    # Test files (to be added)
├── package.json
├── tsconfig.json
├── .gitignore
├── claude_desktop_config.json
└── README.md
```

### Modifying Rate Tables

Edit `data/rate-tables.json` to update:
- Age brackets and base rates
- Health class multipliers
- Coverage limits
- Effective dates

The changes will be reflected immediately (no server restart needed for data files).

### Adding New Tools

To add a new tool:

1. Add tool definition in `ListToolsRequestSchema` handler
2. Implement tool logic in `CallToolRequestSchema` handler
3. Update this README with usage examples

### Adding New Resources

To add a new resource:

1. Add resource definition in `ListResourcesRequestSchema` handler
2. Implement read logic in `ReadResourceRequestSchema` handler
3. Create the data file in `data/` directory

## Understanding MCP Concepts

### Tools vs Resources

**Tools** (like functions):
- Claude can *call* them
- Take parameters
- Perform actions
- Return results
- Example: `calculate_premium(age, coverage, healthClass)`

**Resources** (like files):
- Claude can *read* them
- Provide context and data
- Static or dynamic content
- Claude reasons about the content
- Example: Rate tables JSON that Claude can analyze

### When to Use Each

**Use Tools when:**
- You need to perform calculations
- Action requires logic/algorithms
- Input validation needed
- Output should be formatted specifically

**Use Resources when:**
- You want Claude to understand data structure
- Claude should reason about the content
- Data should be analyzed or interpreted
- You're providing reference material

## Testing

### Manual Testing Checklist

- [ ] Calculate premium for each age bracket
- [ ] Test all health classes (preferred, standard, substandard)
- [ ] Verify coverage limits (minimum/maximum)
- [ ] Test underwriting recommendations with various risk factors
- [ ] Verify rate table version is returned
- [ ] Test error cases (invalid age, coverage, health class)

### Example Test Cases

See `test-cases.md` (to be created) for comprehensive test scenarios.

## Troubleshooting

### Server won't start
- Check Node.js version (`node --version` should be >= 18)
- Verify build completed successfully (`npm run build`)
- Check the path in `claude_desktop_config.json` is absolute and correct

### Tools not appearing
- Restart Claude Code after configuration changes
- Verify server is listed in MCP servers
- Check server logs for errors

### Data file not found
- Ensure `data/` directory is at correct location relative to `dist/index.js`
- Verify JSON files are valid (use a JSON validator)

### Calculation errors
- Validate input ranges (age 18-80, coverage >= $50,000)
- Check health class spelling (case-insensitive but must match)

## Key Learnings

### From Skill to Plugin

**What we gained:**
1. **External Data Access** - Read real files instead of hardcoded values
2. **Multiple Tools** - Specialized functions for different tasks
3. **Resources** - Claude can read and reason about data
4. **Versioning** - Track rate table versions and effective dates
5. **Scalability** - Easy to add new data sources or tools

**What we kept:**
1. Clear input requirements
2. Validation logic
3. Error handling
4. Formatted output

### MCP Power

The Model Context Protocol enables:
- **Separation of concerns** - Data, logic, and AI are separate
- **Reusability** - Same server can be used by multiple AI systems
- **Maintainability** - Update data without touching AI prompts
- **Extensibility** - Easy to add new capabilities

## What's Next

In **Part 3**, we'll build **Agent Teams** that coordinate multiple specialized agents:

- **Underwriting Agent** - Assesses risk using our MCP plugin
- **Pricing Agent** - Calculates premiums
- **Proposal Agent** - Generates quote documents

Each agent will use this MCP plugin as a shared resource!

## Educational Notes

**Important:** This is a learning exercise. Real insurance systems involve:
- Regulatory compliance
- Actuarial analysis
- Medical underwriting
- Legal requirements
- Data privacy considerations
- Integration with legacy systems

This plugin demonstrates **concepts and patterns**, not production-ready insurance software.

## Files Summary

| File | Purpose |
|------|---------|
| `src/index.ts` | MCP server implementation |
| `data/rate-tables.json` | Age brackets and health classes |
| `data/underwriting-guidelines.json` | Risk factors and requirements |
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `claude_desktop_config.json` | Example MCP configuration |
| `README.md` | This file |

## Related Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Claude Code Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- [Blog Post - Part 2](#) (link to published post)

## Questions or Issues?

Common issues:
1. **Path problems** - Use absolute paths in configuration
2. **Build errors** - Run `npm install` and `npm run build`
3. **Server not appearing** - Restart Claude Code
4. **Data not loading** - Check file paths relative to dist/

---

**Next in Series:** Part 3 - Agent Teams for Quote Generation

---

*This is a learning resource. All data and calculations are for educational purposes only.*
