#!/usr/bin/env node

/**
 * Post-install script
 * Runs automatically after npm install
 * Shows success message and next steps
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');

console.log('\n✅ Premium Calculator MCP Server - Installation Complete!\n');

// Check if build succeeded
if (existsSync(distDir)) {
  console.log('✅ TypeScript compiled successfully');
  console.log(`📦 Server ready at: ${resolve(distDir, 'index.js')}\n`);
} else {
  console.log('⚠️  Build directory not found. Run: npm run build\n');
}

console.log('📋 Next Steps:\n');
console.log('1. Run the setup helper:');
console.log('   npm run setup\n');
console.log('   This will guide you through configuring Claude Code.\n');
console.log('2. Or manually configure Claude Code:');
console.log(`   Add this to your Claude Code config:\n`);
console.log('   {');
console.log('     "mcpServers": {');
console.log('       "premium-calculator": {');
console.log('         "command": "node",');
console.log('         "args": [');
console.log(`           "${resolve(distDir, 'index.js')}"`);
console.log('         ]');
console.log('       }');
console.log('     }');
console.log('   }\n');
console.log('3. Restart Claude Code\n');
console.log('4. Test with: "List available MCP servers"\n');
console.log('📚 Documentation:');
console.log(`   - Quick Start: ${resolve(rootDir, 'QUICKSTART.md')}`);
console.log(`   - Full Guide: ${resolve(rootDir, 'README.md')}`);
console.log(`   - Examples: ${resolve(rootDir, 'EXAMPLES.md')}\n`);
