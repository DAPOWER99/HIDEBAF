# HIDEBAF Development & Architectural Instructions

HIDEBAF is a high-security Command Line Interface (CLI) file encryption and compression utility written in modern ECMAScript Modules (ESM) syntax, optimized to run on the **Bun v1.3.14+** runtime environment.

---

## 1. Project System Architecture

HIDEBAF uses a flat modular architecture bundled into a single runtime distribution script via Bun's transpiler engine.

### Key Architecture Modules:
- **`hidebaf.js` (Root Script):** Serves as the main orchestrator, registering subcommands (`hide`, `reveal`, `export-tokens`, `import-tokens`, `info`, `plugin`, `verify`, `benchmark`, `wipe`, `audit`, `compress-stats`, `theme`, `settings`, `script`), loading operational configurations, and handling error events.
- **Settings Config (`settings.yml`):** Regulates runtime themes, core feature flags (e.g., zlib compression defaults), security parameters (e.g., scrypt KDF work factors), self-destruction thresholds, and blocked command routes.
- **Crypto & Key Slots Layer:** Leverages native `node:crypto` functions for hardware-accelerated AES-256-GCM symmetric block ciphers and memory-hard key derivation.

---

## 2. Command Pipeline Reference

### 2.1 Archiving & Encryption Pipeline (`hide`)
1. **Inputs:** Accepts target file paths, optional plain hints, and custom output destinations.
2. **Bundle Construction:** Packs filenames, sizes, and binary contents. If Anonymize Mode is enabled, file names are scrubbed to `file_X.ext`.
3. **Symmetric Encryption:** Generates a cryptographically secure 32-byte sector key and encrypts the bundle.
4. **Key Slot Injection:** Envelopes the sector key inside slot headers using keys derived from user passwords via scrypt KDF.

### 2.2 Decryption & Extraction Pipeline (`reveal`)
1. **Header Parsing:** Reads Magic bytes (`"HIDEBAF\0"`) and parses key slots.
2. **Credential Decoupling:** Derives the decryption key using the password, matches the SHA-256 verifier digest, and decrypts the slot envelope to extract the sector key.
3. **Decryption:** Decrypts the payload sector. If Anonymize Mode is active, file modification and access timestamps are reset to the Unix Epoch (`1970-01-01`).
4. **Failsafe Self-Destruct:** On verification failure, if `self_destruct` configuration is active and the password failure threshold is reached, the target file payload and header are overwritten with inline decoy dragon logo data.

---

## 3. Operations & Compilation

### Setup and Bundle compilation
Install package dependencies:
```bash
bun install
```

Compile the source code directly from the root workspace directory into a standalone cross-platform executable:
```bash
bun build --compile c:\hidebaf\hidebaf.js --outfile c:\hidebaf\hidebaf.exe
```

Test archive cryptography:
```bash
bun test
```
