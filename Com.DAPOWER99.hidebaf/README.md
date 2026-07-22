# HIDEBAF 1.0.0

```
██╗  ██╗██╗██████╗ ███████╗██████╗  █████╗ ███████╗
██║  ██║██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝
███████║██║██║  ██║█████╗  ██████╔╝███████║█████╗
██╔══██║██║██║  ██║██╔══╝  ██╔══██╗██╔══██║██╔══╝
██║  ██║██║██████╔╝███████╗██████╔╝██║  ██║██║
╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝
```

**Highly Incubated Dragonian Encryptory Binary using an Archive of Files**

> Binary Archive Format · Scorched Earth Encryption with AES-256-GCM Payloads

---

## Overview

HIDEBAF is a file encryption tool implementing the "scorched earth" multi-token redirection methodology. It allows users to securely encrypt files into a `.HIDEBAF` archive and decrypt them using token-based authentication (`.EBFATs`).

---

## Key Features

- 🔐 **AES-256-GCM Authenticated Encryption** — High security local file envelopes.
- 🌍 **Scorched Earth Redirection** — Multi-slot decryption mapping pointing real and decoy tokens to separate virtual sectors.
- 🕵️ **Anonymize Mode** — Strips absolute filename paths, overrides filenames with indices, suppresses plaintext hints, and resets timestamps of decrypted files to the Unix Epoch (`1970-01-01`).
- 💥 **Failsafe Self-Destruct** — Tracks wrong password entries and permanently overwrites target archives with inline base64 decoy data if the attempt threshold is breached.
- 🚫 **Command Restrictions** — Programmable blocking of specific CLI commands via `disabled_commands`.

---

## Installation & Setup

1. **Requirements:** Bun 1.3.14 or higher is required.
2. **Build CLI:**
   ```bash
   bun build --compile c:\hidebaf\hidebaf.js --outfile c:\hidebaf\hidebaf.exe
   ```

## Quick Start

```bash
# Encrypt files
hidebaf hide -o secret.HIDEBAF confidential.txt

# Decrypt archives
hidebaf reveal secret.HIDEBAF

# Interactively manage settings (Themes, Secret Modes, Self-Destruct, Command restrictions)
hidebaf settings
```

## System Reference
- **Architecture Spec:** See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Features List:** See [FEATURES.md](./FEATURES.md)
- **Version History:** See [VERSION.md](./VERSION.md)
- **Technical Documentation:** See [documentation.md](../documentation.md)
