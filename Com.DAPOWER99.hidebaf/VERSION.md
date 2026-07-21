# Version Information

## Current Version

**HIDEBAF v1.0.0** - Initial Release

### Release Date
June 25, 2026

## System Requirements

### Runtime
- **Bun:** 1.3.14 or higher

### Supported Platforms
- Windows
- macOS
- Linux

### Minimum System Specifications
- RAM: 256 MB minimum (512 MB recommended)
- Disk Space: 50 MB for installation
- Processor: Any modern processor

## Version History

### v1.0.0 (Initial Release)
**Release Date:** June 25, 2026

#### Features
- ✨ **Core Encryption Engine** - AES-256-GCM encryption implementation
- 🔐 **Scorched Earth Methodology** - Advanced multi-token redirection system
- 📦 **Binary Archive Format** - Efficient `.HIDEBAF` file format
- 🔑 **Token Management** - `.EBFATs` token file support
- 🎯 **Batch Processing** - Multiple file encryption support
- 📊 **Archive Metadata** - View archive information without decryption
- 💻 **CLI Interface** - Full command-line tooling

#### Commands
- `hide` - Encrypt files into archive
- `reveal` - Decrypt archive with token
- `export-tokens` - Create and export tokens
- `import-tokens` - List tokens from file
- `info` - Display archive metadata
- `help` - Command assistance

#### Known Limitations
- Token files (.EBFATs) passwords are not displayed for security
- Archive decryption requires valid token credentials
- Batch operations process files sequentially

## Compatibility Matrix

| Component | Version | Status |
|-----------|---------|--------|
| Bun Runtime | 1.3.14+ | ✅ Supported |
| Node.js | N/A | ⚠️ Not Supported |
| Windows | All | ✅ Supported |
| macOS | 10.13+ | ✅ Supported |
| Linux | Any | ✅ Supported |

## Migration Guide

### Upgrading from Previous Versions
This is the initial 1.0.0 release. No migration needed for new installations.

## Security Updates

### v1.0.0
- Initial release with AES-256-GCM encryption
- Token-based authentication system
- Scorched earth encryption methodology

## API Stability

### Stable APIs
- `hide [options] <files...>` ✅
- `reveal [options] <archive>` ✅
- `export-tokens [options]` ✅
- `import-tokens <ebfats>` ✅
- `info <archive>` ✅

### Experimental Features
None in v1.0.0

## Deprecations

No deprecated features in v1.0.0

## Support Policy

- **LTS Status:** Pending
- **End of Life:** TBD
- **Security Patches:** Available as needed
- **Bug Fixes:** Continuous updates

## Version Format

HIDEBAF follows Semantic Versioning (SemVer):
- **MAJOR** - Breaking changes or significant features
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes and patches

Current version: `1.0.0` (MAJOR.MINOR.PATCH)

## Checking Your Version

To check your installed version:

```bash
hidebaf --version
```

Or check directly in the application:

```bash
hidebaf -V
```

## Release Notes

For detailed release notes and changelog, refer to the package documentation.

## Contact & Support

For version-specific issues or support, please consult the documentation included with your HIDEBAF installation.
