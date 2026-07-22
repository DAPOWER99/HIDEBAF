# HIDEBAF Features & Specifications

This document outlines the core and advanced operational features of the HIDEBAF encryption engine.

---

## 1. Core Cryptographic Features

### 🔐 Authenticated AES-256-GCM Encryption
- **Key Strength:** 256-bit AES (Advanced Encryption Standard).
- **Mode of Operation:** GCM (Galois/Counter Mode) provides authenticated encryption. This guarantees data integrity and confidentiality, preventing cipher tampering or bit-flipping attacks.
- **Hardware Acceleration:** Native utilization of CPU instruction sets (AES-NI) through Bun's Crypto APIs.

### 🌍 Scorched Earth Multi-Token Redirection
- **Concept:** Obfuscate the existence of sensitive payloads by mapping multiple key slots inside the same file header.
- **Decoy Redirection:** Users can specify decoy tokens that resolve to distinct, random data segments, providing plausible deniability under coercion.
- **Key Separation:** Archive decryption keys remain abstracted within individual slot envelopes, keeping key files (`.EBFATs`) isolated.

---

## 2. Advanced Security & Privacy Features

### 🕵️ Anonymize Mode (Traces & Forensics Erasure)
A toggleable operational flag designed to eliminate forensic history during packing and unpacking:
- **Filename Obfuscation:** Maps real filenames inside the encrypted bundle to sequence placeholders (`file_0.ext`, `file_1.ext`).
- **Hint Protection:** Suppresses plaintext header hints during encryption.
- **Log Concealment:** Disables audit logs to prevent operational telemetry collection.
- **Timestamp Scrubbing:** Resets extracted file timestamps (modification, access, and creation times) to the Unix Epoch (`1970-01-01 00:00:00 UTC`).

### 💥 Failsafe Self-Destruct
Protects archives against persistent offline attacks:
- **Attempt Threshold:** Customizable password attempt limit (defaults to 5).
- **Rulesets:**
  - `always`: Triggers self-destruct on every threshold breach.
  - `firstTime`: Triggers once, then preserves the decoy payload.
  - `custom` (number): Restricts how many times self-destruct is allowed to execute.
- **Eradication:** Overwrites the archive with inline base64 decoy image data to destroy the original encrypted payload.

---

## 3. Operations & Controls

### 🚫 Command Disabling
Restrict access to specific commands (e.g., `reveal`, `export-tokens`) by adding them to the `disabled_commands` list in `settings.yml` (or via `settings` menu). Disabled commands terminate early with a warning.

### 🔌 Extensible Plugin Engine
A hook-based lifecycle manager supporting both base and custom plugins. Custom plugins can be installed locally from disk via:
```bash
hidebaf plugin add ./path/to/plugin.js
```
