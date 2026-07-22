# HIDEBAF Code-Level Dependency Specifications

This document details the software dependencies, runtime requirements, and internal APIs used by HIDEBAF.

---

## 1. Runtime Environment: Bun (v1.3.14+)

HIDEBAF runs natively on the Bun runtime. It leverages Bun's built-in APIs and Node-compatible layers for high-performance operations.

### Key Bun & Node APIs Utilized:
- **`node:crypto`**: Core module for KDF and payload security.
  - `scryptSync(password, salt, keylen, options)`: Translates credentials into a 64-byte key.
  - `createCipheriv('aes-256-gcm', key, iv)`: Standard AES-256 GCM encryption pipeline.
  - `createDecipheriv('aes-256-gcm', key, iv)`: Standard AES-256 GCM decryption pipeline.
  - `randomBytes(size)`: Generate secure salts, IVs, and decoy noise.
- **`node:fs` / `node:path`**: File system operations.
  - `readFileSync` / `writeFileSync`: Binary I/O on archives.
  - `utimesSync`: Used in Anonymize Mode to set file access/modification timestamps to the Unix Epoch (`1970-01-01`).
- **`Bun.build`**: Compiler and packaging tool. Bundles modular files into a single distribution JS (`hidebaff.js`) and compiles it into a standalone executable.

---

## 2. Core NPM Dependencies

### 2.1 cli-width (^4.1.0)
- **Usage:** Identifies active console boundaries to adjust ASCII tables.
- **Implementation:** `cliWidth()` is called on startup to set responsive columns in diagnostic tables.

### 2.2 chalk (^5.3.0)
- **Usage:** CLI coloring engine.
- **Implementation:** Wrapped in theme stylesheets to output visual components (dragon, stealth, cyber, classic).

### 2.3 commander (^11.1.0)
- **Usage:** CLI parser framework.
- **Implementation:** Defines program structure, subcommands (`hide`, `reveal`, `settings`), and parameter options.

### 2.4 inquirer (^8.2.5)
- **Usage:** Command-line prompts.
- **Implementation:** Power settings configuration menus, command toggles, and token export prompts.

---

## 3. Installation & Setup

All packages are pinned in `package.json`:
```json
{
  "dependencies": {
    "cli-width": "^4.1.0",
    "chalk": "^5.3.0",
    "commander": "^11.1.0",
    "inquirer": "^8.2.5"
  }
}
```

Deploy dependencies via:
```bash
bun install --frozen-lockfile
```
