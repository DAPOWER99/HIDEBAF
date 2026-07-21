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

## Overview

HIDEBAF is a powerful file encryption tool that implements "scorched earth" encryption methodology combined with multi-token redirection. It allows you to securely encrypt one or more files into a `.HIDEBAF` archive format and decrypt them using token-based authentication.

## Features

- 🔐 **AES-256-GCM Encryption** - Military-grade encryption for your files
- 🌍 **Scorched Earth Encryption** - Advanced encryption methodology with multi-token support
- 📦 **Binary Archive Format** - Efficient and secure file packaging
- 🔑 **Token-Based Access** - Multi-token redirection for flexible key management
- 🛡️ **Archive Metadata** - View archive information without decryption
- 🎯 **Batch Operations** - Encrypt multiple files at once

## Requirements

- **Bun 1.3.14** or higher

## Installation

1. Extract the HIDEBAF package to your desired location
2. Ensure Bun 1.3.14+ is installed on your system
3. Run the executable or use the CLI commands

## Quick Start

### Basic Commands

```bash
# Encrypt files into a .HIDEBAF archive
hidebaf hide [options] <files...>

# Decrypt a .HIDEBAF archive using a token
hidebaf reveal [options] <archive>

# Create and export tokens to a .EBFATs file
hidebaf export-tokens [options]

# List tokens in a .EBFATs file
hidebaf import-tokens <ebfats>

# View archive metadata without decrypting
hidebaf info <archive>

# Display help
hidebaf help [command]
```

## Command Reference

### hide [options] &lt;files...&gt;
Encrypt one or more files into a `.HIDEBAF` archive.

```bash
hidebaf hide file1.txt file2.pdf
```

### reveal [options] &lt;archive&gt;
Decrypt a `.HIDEBAF` archive using a token.

```bash
hidebaf reveal encrypted-archive.HIDEBAF
```

### export-tokens [options]
Interactively build and export token credentials to a `.EBFATs` token file.

```bash
hidebaf export-tokens
```

### import-tokens &lt;ebfats&gt;
List tokens stored in a `.EBFATs` file (note: passwords are not displayed for security).

```bash
hidebaf import-tokens tokens.EBFATs
```

### info &lt;archive&gt;
Display archive metadata including slot count, flags, and hint without decrypting the contents.

```bash
hidebaf info archive.HIDEBAF
```

## Options

```
-V, --version               Output the version number
-h, --help                  Display help for command
```

## File Formats

- **`.HIDEBAF`** - Encrypted archive file
- **`.EBFATs`** - Token file containing encryption keys

## Security Notes

- Always keep your `.EBFATs` token files in a secure location
- Use strong, unique tokens for maximum security
- Tokens are never displayed when imported for security purposes
- Archive metadata can be viewed without the token, but contents remain encrypted

## Architecture

HIDEBAF uses a multi-token redirection system that allows for:
- Flexible key management
- Enhanced security through token abstraction
- Support for multiple decryption paths

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).

See [LICENSE](./LICENSE) for the full license text.

## Version Info

- **App Version:** 1.0.0
- **Runtime:** Bun 1.3.14+

## Support

For issues or questions, please refer to the documentation included with this package.
