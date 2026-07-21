# HIDEBAF Dependencies

## Overview

HIDEBAF is a JavaScript/Bun application. Unlike traditional compiled applications, it doesn't use Windows DLLs. Instead, it uses npm (Node Package Manager) modules and built-in runtime libraries.

## Runtime

### Required
- **Bun:** 1.3.14 or higher
  - URL: https://bun.sh
  - Description: JavaScript/TypeScript runtime and package manager
  - Includes: Node.js compatibility layer and built-in modules

## NPM Dependencies

### Core Dependencies

#### cli-width ^4.1.0
- **Purpose:** Detect terminal/console width for formatting output
- **Usage:** Terminal UI formatting and responsive CLI output
- **GitHub:** https://github.com/knownasilya/cli-width
- **Install:** `bun install cli-width`

#### chalk ^5.3.0
- **Purpose:** Terminal string styling with colors and text formatting
- **Usage:** Colored console output for CLI messages
- **GitHub:** https://github.com/chalk/chalk
- **Install:** `bun install chalk`

#### commander ^11.1.0
- **Purpose:** Command-line interface (CLI) framework
- **Usage:** Command parsing, options, arguments, and help text
- **GitHub:** https://github.com/tj/commander.js
- **Install:** `bun install commander`

#### inquirer ^8.2.5
- **Purpose:** Interactive command line prompts
- **Usage:** User input for token creation and configuration
- **GitHub:** https://github.com/SBoudrias/Inquirer.js
- **Install:** `bun install inquirer`

#### fs-extra ^11.2.0
- **Purpose:** Extended filesystem operations
- **Usage:** Advanced file handling, directory operations
- **GitHub:** https://github.com/jprichardson/node-fs-extra
- **Install:** `bun install fs-extra`

#### crypto (builtin)
- **Purpose:** Node.js built-in cryptography module
- **Usage:** AES-256-GCM encryption/decryption operations
- **Source:** Built-in Node.js module (no installation needed)
- **Note:** Available through `node:crypto` in imports

## Installation Instructions

### Install All Dependencies

```bash
# Using Bun package manager
bun install

# Or install individual packages
bun install cli-width chalk commander inquirer fs-extra
```

### Verify Installation

```bash
# Check if all dependencies are installed
bun list

# Test HIDEBAF execution
bun ./Bin/Versions/1.0/hidebaff.js --version
```

## Dependency Versions

All dependencies are pinned to specific versions for stability:

```json
{
  "cli-width": "^4.1.0",
  "chalk": "^5.3.0",
  "commander": "^11.1.0",
  "inquirer": "^8.2.5",
  "fs-extra": "^11.2.0"
}
```

## Troubleshooting

### Issue: "Cannot find module"
```bash
# Solution: Install dependencies
bun install
```

### Issue: "Bun command not found"
```bash
# Solution: Install Bun runtime
curl -fsSL https://bun.sh/install | bash
export PATH="$PATH:$HOME/.bun/bin"
```

### Issue: Module version conflicts
```bash
# Solution: Reinstall with lock file
rm -rf node_modules
rm bunfig.lock
bun install
```

## Dependency Tree

```
hidebaf@1.0.0
├── cli-width@4.1.0
├── chalk@5.3.0
├── commander@11.1.0
├── inquirer@8.2.5
│   ├── ansi-escapes
│   ├── cli-cursor
│   ├── cli-width
│   ├── mute-stream
│   ├── run-async
│   ├── rxjs
│   └── string-width
├── fs-extra@11.2.0
│   └── graceful-fs
└── crypto (builtin)
```

## Security Considerations

### Dependency Scanning

```bash
# Check for known vulnerabilities
bun audit

# Update dependencies safely
bun update
```

### Trust Chain

- All dependencies are from npm registry
- Verified packages with active maintenance
- No malicious code detected in current versions
- Regular updates recommended for security patches

## File System Structure

After running `bun install`, your directory structure will be:

```
Com.DAPOWER99.hidebaf/
├── node_modules/              (Created after install)
│   ├── cli-width/
│   ├── chalk/
│   ├── commander/
│   ├── inquirer/
│   ├── fs-extra/
│   └── ... (other dependencies)
├── bunfig.lock               (Package lock file)
├── package.json
├── package-lock.json         (If using npm)
└── ...
```

## Optional Dependencies

### For Development

If you plan to contribute or modify the source:

```bash
# TypeScript support (optional)
bun install --save-dev typescript

# Testing framework (optional)
bun install --save-dev jest

# Linting (optional)
bun install --save-dev eslint
```

### Development Scripts

In `package.json`:

```bash
# Run in watch mode (auto-reload on changes)
bun run dev

# Build optimized version
bun run build

# Run tests
bun run test
```

## Version Compatibility Matrix

| Component | Version | Status |
|-----------|---------|--------|
| Bun | 1.3.14+ | ✅ Required |
| Node.js | 18.0.0+ | ✅ Compatible |
| cli-width | 4.1.0 | ✅ Stable |
| chalk | 5.3.0 | ✅ Stable |
| commander | 11.1.0 | ✅ Stable |
| inquirer | 8.2.5 | ✅ Stable |
| fs-extra | 11.2.0 | ✅ Stable |

## Updating Dependencies

### Check for Updates

```bash
# Show available updates
bun outdated

# Update specific package
bun upgrade chalk

# Update all packages
bun upgrade --latest
```

### Lock File Management

- `bunfig.lock` - Bun's lock file (auto-generated)
- `package-lock.json` - npm compatibility lock file
- Both should be committed to version control

## Differences from DLLs

**Why HIDEBAF doesn't use DLLs:**

1. **JavaScript Runtime:** Bun is a runtime that executes JavaScript code
2. **Package Management:** npm handles all library management
3. **Cross-Platform:** npm packages work on Windows, macOS, and Linux
4. **Dynamic Loading:** Modules are loaded at runtime, not compiled into binary
5. **Portability:** No platform-specific binaries needed

## Deployment

### Production Deployment

```bash
# Install dependencies in production
bun install --frozen-lockfile

# Build optimized bundle (optional)
bun run build

# Run application
bun ./Bin/Versions/1.0/hidebaff.js
```

### Docker/Container Deployment

```dockerfile
FROM oven/bun:latest

WORKDIR /app
COPY package.json .
RUN bun install --frozen-lockfile

COPY . .
ENTRYPOINT ["bun", "./Bin/Versions/1.0/hidebaff.js"]
```

## Support & Resources

- **Bun Documentation:** https://bun.sh/docs
- **NPM Registry:** https://www.npmjs.com
- **HIDEBAF Repository:** https://github.com/DAPOWER99/HIDEBAF
- **Package Management:** https://docs.npmjs.com

## Glossary

- **npm:** Node Package Manager - package management system for JavaScript
- **Bun:** Modern JavaScript runtime environment and package manager
- **Module:** Reusable code package with specific functionality
- **Dependency:** External code that your project relies on
- **Lock File:** File that locks dependency versions for reproducible installs
- **DLL:** Windows-specific compiled binary library (not used in HIDEBAF)
