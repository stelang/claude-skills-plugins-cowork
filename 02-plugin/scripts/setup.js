#!/usr/bin/env node

/**
 * Interactive setup script
 * Helps configure Claude Code to use this MCP server
 */

import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { homedir, platform } from 'os';
import * as readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');
const serverPath = resolve(distDir, 'index.js');

// Get Claude Code config path based on platform
function getClaudeConfigPath() {
  const home = homedir();
  const platformName = platform();

  if (platformName === 'darwin') {
    return join(home, 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else if (platformName === 'win32') {
    return join(process.env.APPDATA || join(home, 'AppData', 'Roaming'), 'Claude', 'claude_desktop_config.json');
  } else {
    return join(home, '.config', 'Claude', 'claude_desktop_config.json');
  }
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n🚀 Premium Calculator MCP Server - Setup Wizard\n');
  console.log('═══════════════════════════════════════════════\n');

  // Check if server is built
  if (!existsSync(serverPath)) {
    console.log('❌ Server not built yet. Building now...\n');
    console.log('Run: npm run build\n');
    process.exit(1);
  }

  console.log('✅ Server built successfully');
  console.log(`📦 Server location: ${serverPath}\n`);

  // Get Claude config path
  const configPath = getClaudeConfigPath();
  console.log(`📁 Claude Code config location: ${configPath}\n`);

  // Check if config exists
  const configExists = existsSync(configPath);
  let config = { mcpServers: {} };

  if (configExists) {
    console.log('✅ Claude Code config file found\n');
    try {
      const configContent = readFileSync(configPath, 'utf-8');
      config = JSON.parse(configContent);
      if (!config.mcpServers) {
        config.mcpServers = {};
      }
    } catch (error) {
      console.log('⚠️  Could not parse existing config. Creating new one.\n');
    }
  } else {
    console.log('ℹ️  Claude Code config file not found. Will create new one.\n');
  }

  // Check if premium-calculator already exists
  if (config.mcpServers['premium-calculator']) {
    console.log('⚠️  premium-calculator server already configured!\n');
    console.log('Current configuration:');
    console.log(JSON.stringify(config.mcpServers['premium-calculator'], null, 2));
    console.log();

    const answer = await question('Do you want to overwrite it? (yes/no): ');
    if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
      console.log('\n✋ Setup cancelled. Existing configuration preserved.\n');
      rl.close();
      return;
    }
  }

  // Add/update the configuration
  config.mcpServers['premium-calculator'] = {
    command: 'node',
    args: [serverPath]
  };

  // Ask for confirmation
  console.log('\n📝 Configuration to be added/updated:\n');
  console.log(JSON.stringify({ mcpServers: { 'premium-calculator': config.mcpServers['premium-calculator'] } }, null, 2));
  console.log();

  const confirm = await question('Add this configuration to Claude Code? (yes/no): ');

  if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
    console.log('\n✋ Setup cancelled.\n');
    console.log('To manually configure, add this to your Claude Code config:');
    console.log(JSON.stringify(config.mcpServers['premium-calculator'], null, 2));
    console.log();
    rl.close();
    return;
  }

  // Create config directory if it doesn't exist
  const configDir = dirname(configPath);
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
    console.log(`\n✅ Created config directory: ${configDir}`);
  }

  // Write the configuration
  try {
    writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log('\n✅ Configuration written successfully!\n');
  } catch (error) {
    console.log(`\n❌ Failed to write configuration: ${error.message}\n`);
    console.log('Please manually add this configuration:\n');
    console.log(JSON.stringify(config.mcpServers['premium-calculator'], null, 2));
    console.log();
    rl.close();
    process.exit(1);
  }

  console.log('═══════════════════════════════════════════════\n');
  console.log('🎉 Setup Complete!\n');
  console.log('Next steps:\n');
  console.log('1. ⚠️  RESTART CLAUDE CODE (required for changes to take effect)\n');
  console.log('2. Verify installation:');
  console.log('   - Open Claude Code');
  console.log('   - Type: "List available MCP servers"');
  console.log('   - You should see "premium-calculator" in the list\n');
  console.log('3. Try your first calculation:');
  console.log('   "Use premium-calculator to calculate a quote for:');
  console.log('   - Age: 35');
  console.log('   - Coverage: $500,000');
  console.log('   - Health Class: standard"\n');
  console.log('📚 Documentation:');
  console.log('   - QUICKSTART.md - 5-minute guide');
  console.log('   - README.md - Complete documentation');
  console.log('   - EXAMPLES.md - 17 usage examples\n');

  rl.close();
}

main().catch((error) => {
  console.error('\n❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
});
