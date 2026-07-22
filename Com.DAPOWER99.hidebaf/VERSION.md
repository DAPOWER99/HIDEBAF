# HIDEBAF Release Changelogs & Version Information

## Current Release

### **HIDEBAF v1.0.0** — Initial Production Release (Stable)
- **Release Date:** July 22, 2026
- **Status:** Active
- **Target Runtime:** Bun 1.3.14 or higher (Node-compatible modules)

---

## Complete Release History

### **v1.0.0 (July 22, 2026)**
Initial release of the HIDEBAF cli tool and encryption engine.

#### **Key Implementations:**
1. **Core Cryptography & Archiving:**
   - Designed a custom slot-based binary archive format (`.HIDEBAF`).
   - Integrated AES-256-GCM envelope encryption with scrypt key derivation.
   - Built an interactive `.EBFATs` token manager for key files.

2. **Advanced Privacy Protections:**
   - **Anonymize Mode:** Implemented filename obfuscation, hint suppression, log redaction, and Unix Epoch timestamp resetting (`1970-01-01`) on decryption.
   - **Self-Destruct Failsafe:** Tracks decryption failure counts. Exceeding the maximum password attempt threshold triggers a failsafe that overwrites the archive with inline base64 decoy data. Supported rules include `always`, `firstTime`, and `custom` limits.

3. **Command Policy Management:**
   - Added command validation checks (`disabled_commands`) configured via `settings.yml` or the interactive `settings` menu to disable specific CLI command routes.

4. **Extensibility & Visual Styling:**
   - Configured custom visual themes (dragon, stealth, cyber, classic) and dynamic banner assets.
   - Integrated custom plugin loading hooks (`plugin add`, `plugin remove`).

---

## Compatibility Matrix

| Environment | Version | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Bun** | v1.3.14+ | ✅ Supported | Required for compilation and native scrypt/crypto hooks. |
| **Node.js** | Any | ❌ Unsupported | Native standalone execution is optimized for the Bun runtime. |
| **Windows** | 7+ (x64) | ✅ Supported | Fully compatible shell execution. |
| **macOS** | 10.13+ | ✅ Supported | Compatible. |
| **Linux** | Any | ✅ Supported | Compatible. |

---

## Semantic Versioning (SemVer)
HIDEBAF updates follow standard semantic versioning rules:
1. **MAJOR** version bumps represent breaking api changes, file format modifications, or significant core upgrades.
2. **MINOR** version bumps add new backward-compatible features (e.g., new plugins, CLI visual updates).
3. **PATCH** version bumps contain backward-compatible bug fixes and security hotfixes.
