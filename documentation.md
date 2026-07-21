# HIDEBAF Documentation

## Overview

HIDEBAF is a feature-rich archive and encryption toolkit built around the Scorched Earth methodology. It now supports multi-token archives, optional payload compression, plugin extensions, archive verification, secure wipe workflows, auditing, and visual CLI themes.

### What is HIDEBAF?

HIDEBAF stands for Highly Incubated Dragonian Encryptory Binary using an Archive of Files. It combines military-grade AES-256-GCM encryption with a flexible token model and a growing plugin ecosystem.

### Key Characteristics

- Encryption Algorithm: AES-256-GCM with 256-bit keys
- Archive Format: Custom binary .HIDEBAF archives
- Token Format: .EBFATs token export/import files
- Runtime: Bun 1.3.14+ with Node-compatible modules
- Plugin Support: Base plugins plus custom plugin installation
- Platform: Windows, macOS, Linux
- License: GPL-3.0
- Version: 1.0.0

## Features

### Core Encryption Features

- Military-grade encryption: AES-256-GCM payloads with authentication tags
- Scorched Earth methodology: Multi-token redirection with real and decoy tokens
- Archive hints: Store optional metadata directly in the archive header
- Compression control: Leave payload compression enabled by default or disable it with --no-compress
- Offline operation: Everything runs locally without a network dependency

### Token and Archive Controls

- Multiple tokens per archive: Create real and decoy tokens for layered access scenarios
- Token export/import: Build and inspect .EBFATs files from the CLI
- Archive inspection: View slot count, flags, hint text, and archive metadata without decrypting
- Batch processing: Encrypt multiple files into one archive in a single command
- Secure file handling: Supports large files, multiple file types, and custom output paths

### Plugin & Extensibility

- Base plugins: Built-in modules for logging, verification, compression analysis, and banners
- Custom plugins: Install new plugins from disk with plugin add
- Plugin lifecycle: Inspect, remove, and query plugin metadata from the CLI
- Hook-based design: Plugins can respond to hide/reveal lifecycle events

### Operational Utilities

- Archive verification: Confirm structure, flags, and checksums
- Benchmarking: Measure local AES-256-GCM and KDF throughput
- Secure wipe: Overwrite and remove files with the Scorched Earth shredder
- Audit logs: Inspect recent operations through the logger plugin
- Visual themes: Change the CLI banner experience with theme

## Installation

### Prerequisites

- Bun Runtime: Version 1.3.14 or higher
- Operating System: Windows 7+, macOS 10.13+, or Linux
- Disk Space: Minimum 50 MB for installation
- RAM: Minimum 256 MB (512 MB recommended)
- Terminal Access: Command-line interface access is required

### Installation Steps

1. Install Bun
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
2. Verify Bun
   ```bash
   bun --version
   ```
3. Open the project folder
   ```bash
   cd HIDEBAF/Com.DAPOWER99.hidebaf
   ```
4. Install dependencies
   ```bash
   bun install
   ```
5. Run the CLI
   ```bash
   bun ./Bin/Versions/1.0/hidebaff.js --help
   ```

## Usage Guide

### Basic Workflow

1. Encrypt files: Use hide to build a .HIDEBAF archive
2. Create tokens: Use export-tokens to build an .EBFATs file
3. Decrypt archives: Use reveal with a matching token
4. Inspect or verify: Use info, verify, or compress-stats

### Example: Encrypt with compression and a hint

```bash
bun ./Bin/Versions/1.0/hidebaff.js hide report.pdf --hint "finance" --export-tokens mytokens
```

### Example: Add decoy tokens

```bash
bun ./Bin/Versions/1.0/hidebaff.js hide secret.txt --decoy decoy-one --decoy decoy-two
```

### Example: Reveal an archive

```bash
bun ./Bin/Versions/1.0/hidebaff.js reveal report.HIDEBAF --token "my-secret-token"
```

### Example: Inspect plugins

```bash
bun ./Bin/Versions/1.0/hidebaff.js plugin list
```

### Example: Verify integrity

```bash
bun ./Bin/Versions/1.0/hidebaff.js verify report.HIDEBAF
```

## Command Reference

### hide [options] <files...>

Encrypt one or more files into a .HIDEBAF archive.

```bash
hidebaf hide [options] file1.txt file2.pdf
```

Options:

- -o, --output <file>: Output archive path
- --token <token>: Provide a real token non-interactively
- --hint <text>: Store a plaintext hint in the archive header
- --no-compress: Disable zlib payload compression
- --decoy <password>: Add a decoy token; repeatable
- --export-tokens <path>: Export all tokens to a .EBFATs file

### reveal [options] <archive>

Decrypt a .HIDEBAF archive using a token.

```bash
hidebaf reveal [options] archive.HIDEBAF
```

### export-tokens [options]

Interactively build and export a .EBFATs file.

```bash
hidebaf export-tokens --output tokens.EBFATs
```

### import-tokens <ebfats>

List the token labels and types stored in a .EBFATs file.

```bash
hidebaf import-tokens tokens.EBFATs
```

### info <archive>

Display archive metadata without decrypting the contents.

```bash
hidebaf info archive.HIDEBAF
```

### plugin <subcommand>

List, install, remove, or inspect plugins.

```bash
hidebaf plugin list
hidebaf plugin add ./my-plugin.js
hidebaf plugin remove my-plugin
hidebaf plugin info verifier
```

### verify <archive>

Cryptographically verify archive structure and checksums.

```bash
hidebaf verify archive.HIDEBAF
```

### benchmark

Measure local AES-256-GCM and scrypt KDF throughput.

```bash
hidebaf benchmark
```

### wipe <files...>

Securely overwrite and delete files using the Scorched Earth shredder.

```bash
hidebaf wipe secret.txt
```

### audit

Show recent operation logs from the logger plugin.

```bash
hidebaf audit
```

### compress-stats <archive>

Analyze compression ratio and space savings for an archive.

```bash
hidebaf compress-stats archive.HIDEBAF
```

### theme [themeName]

View or set the CLI banner theme.

```bash
hidebaf theme
hidebaf theme cyber
```

## Advanced Capabilities

- Plugin-ready workflow: The CLI now supports a plugin lifecycle, base plugins, and custom plugin installation under the project Lib folders.
- Compression analysis: Measure payload savings with compress-stats.
- Archive integrity verification: Validate archive structure and checksums with verify.
- Performance benchmarking: Check local AES-256-GCM and KDF throughput with benchmark.
- Secure deletion: Use wipe for irreversible file removal.
- Audit visibility: Review recent logs with audit.
- Visual presentation: Toggle between dragon, stealth, cyber, and classic themes.

## System Requirements

### Minimum Requirements

- Processor: 1.0 GHz 64-bit
- RAM: 256 MB
- Disk Space: 50 MB
- Operating System: Windows 7+ / macOS 10.13+ / Linux

### Runtime Requirements

- Bun Runtime: 1.3.14 or higher
- Purpose: JavaScript/TypeScript runtime and package manager

## Frequently Asked Questions

### What is the encryption strength?

HIDEBAF uses AES-256-GCM and is designed for strong local encryption with authenticated payloads. The implementation is suitable for personal and professional file protection.

### Can I decrypt my archive without the token?

No. Access to the archive still depends on the correct token. The archive metadata can be inspected without decryption, but the contents remain protected.

### Can I use decoy tokens?

Yes. HIDEBAF supports real and decoy tokens so you can create layered access scenarios without exposing a single master token.

### Can I add plugins?

Yes. The CLI includes plugin management commands so you can inspect built-in plugins or install custom ones from disk.

### Can I verify an archive after creation?

Yes. Use verify to inspect archive integrity and checksum-related metadata.

### Can I disable compression?

Yes. Use --no-compress when creating archives if you want to avoid zlib payload compression.

## Support & Resources

- Documentation: Review the markdown files in the package and the built-in CLI help
- Built-in Help: hidebaf help [command]
- GitHub Issues: https://github.com/DAPOWER99/HIDEBAF/issues
- GitHub Discussions: https://github.com/DAPOWER99/HIDEBAF/discussions

## License

This project is distributed under the GNU General Public License v3.0 (GPL-3.0).

## Version Information

- HIDEBAF v1.0.0
- Status: Stable CLI release
- License: GPL-3.0
- Bun Requirement: 1.3.14+
