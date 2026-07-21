# HIDEBAF Requirements

## System Requirements

### Minimum Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **RAM** | 256 MB | 512 MB |
| **Disk Space** | 50 MB | 100 MB |
| **Processor** | Any modern CPU (64-bit) | Multi-core processor |
| **OS** | Windows 7+ / macOS 10.13+ / Linux | Windows 10+ / macOS 11+ / Ubuntu 18.04+ |

### Runtime Requirements

#### Bun Runtime
- **Version:** 1.3.14 or higher
- **Purpose:** JavaScript/TypeScript runtime and package manager
- **Installation:** Required before running HIDEBAF
- **License:** Proprietary with free tier

### Supported Operating Systems

#### Windows
- **Windows 7 SP1** and later
- **Windows Server 2012 R2** and later
- **Recommended:** Windows 10/11 (latest versions)
- **Architecture:** x86-64 (64-bit required)

#### macOS
- **macOS 10.13 High Sierra** and later
- **Recommended:** macOS 11 Big Sur or newer
- **Architecture:** x86-64 or Apple Silicon (M1/M2/M3)
- **Note:** Rosetta 2 compatibility for Apple Silicon

#### Linux
- **Ubuntu 16.04 LTS** and later
- **Debian 9** and later
- **CentOS/RHEL 7** and later
- **Fedora 28** and later
- **Architecture:** x86-64 (32-bit not supported)
- **Kernel:** Linux 2.6.32 or later

### Software Dependencies

#### Required
- **Bun:** 1.3.14+ (includes Node.js compatibility layer)
- **Node.js:** Not required (Bun is a standalone runtime)

#### Optional
- **Git:** For version control (not required for operation)
- **Terminal/Command Line:** For CLI operations

### Network Requirements
- **Internet Connection:** Not required for encryption/decryption operations
- **Offline Mode:** Fully supported
- **Network I/O:** No network activity during normal operation

## Hardware Specifications

### Processor
- **Minimum:** 1.0 GHz processor
- **Recommended:** 2.0 GHz or faster
- **Cores:** Single-core minimum; multi-core recommended for batch operations
- **Instruction Set:** x86-64 (SSE2 or later preferred)

### Memory (RAM)
- **Minimum:** 256 MB
- **Recommended:** 512 MB - 2 GB
- **For Large Files:** 4 GB+ recommended
- **Usage Pattern:** Scales with encrypted file size

### Storage
- **Installation:** 50 MB
- **Working Space:** Minimum 2x the size of files being encrypted
- **Temporary Files:** Space for cache and temporary archives
- **Recommended Free Space:** 10 GB minimum for comfortable operation

### Display
- **Terminal/Console:** Any standard terminal
- **No GUI:** Command-line interface only
- **Resolution:** No specific requirement (text-based)

## Encryption Requirements

### Cryptographic Support
- **AES-256-GCM:** Hardware acceleration recommended (AES-NI)
- **Performance:** Hardware AES can improve speed by 5-10x
- **Software Fallback:** Supported if hardware acceleration unavailable

### Key Management
- **Token Files (.EBFATs):** Stored locally on disk
- **Encryption Keys:** User-managed through tokens
- **Key Size:** 256-bit keys (AES-256)
- **IV/Nonce:** Randomly generated per encryption

## File System Requirements

### Supported File Systems
- **Windows:** NTFS, FAT32, exFAT
- **macOS:** APFS, HFS+, NTFS (via drivers)
- **Linux:** ext3, ext4, btrfs, XFS, NTFS (via ntfs-3g)

### File Permissions
- **Read Access:** Required to encrypt files
- **Write Access:** Required to create archives and token files
- **Execute Access:** Only for HIDEBAF executable

### Path Limitations
- **Maximum Path Length:** 
  - Windows: 260 characters (or 32,767 with long path support)
  - macOS/Linux: 4,096 characters
- **Special Characters:** Most supported; avoid null bytes and path separators

## Bandwidth & Performance

### Network (if applicable)
- **Bandwidth:** Not required for normal operations
- **Latency:** No network operations performed

### Disk I/O
- **Sequential Read/Write:** Minimum 10 MB/s recommended
- **Random Access:** Not heavily used
- **SSD:** Recommended for better performance

### CPU Usage
- **Single Thread:** 100% utilization during encryption
- **Multi-core:** Not parallelized in v1.0.0
- **Duration:** Proportional to file size and CPU speed

## Development Requirements (Optional)

Only required if building from source:

- **Bun:** 1.3.14+ (development version)
- **Git:** For source code management
- **Text Editor/IDE:** Any editor (VS Code recommended)
- **Build Tools:** Bun handles all build requirements

## Security Requirements

### User Access
- **Administrator Privileges:** Not required for normal operation
- **File Ownership:** User must have read/write access to files and directories

### Antivirus/Security Software
- **Compatibility:** Most antivirus software is compatible
- **False Positives:** May occur with newly generated archives (hash-based detection)
- **Scanning:** Archives can be scanned like regular files

### Encryption Standards
- **NIST Approved:** AES-256 is FIPS 140-2 approved
- **GCM Mode:** Provides authentication and encryption
- **Industry Standard:** Uses standard cryptographic implementations

## Installation Prerequisites

Before installing HIDEBAF, ensure you have:

1. ✅ **Bun 1.3.14+** installed and in system PATH
2. ✅ **Administrative access** (for installation only)
3. ✅ **50 MB free disk space**
4. ✅ **Supported operating system**
5. ✅ **Terminal/Command-line access**

## Verification Checklist

```bash
# Check Bun version
bun --version

# Should output: 1.3.14 or higher

# Check disk space
df -h          # macOS/Linux
dir            # Windows

# Verify system architecture
uname -m       # macOS/Linux (should show x86_64)
wmic OS get OSArchitecture  # Windows
```

## Troubleshooting Requirements Issues

### Issue: "Bun not found"
- **Solution:** Install Bun 1.3.14+ from https://bun.sh
- **Add to PATH:** Ensure Bun binary is in system PATH

### Issue: "Insufficient disk space"
- **Solution:** Free up disk space; need 2x file size minimum
- **Check:** Use `df` (macOS/Linux) or `dir` (Windows)

### Issue: "Permission denied"
- **Solution:** Ensure read/write permissions on target files and directories
- **Check:** File ownership and permissions with `ls -l` or properties

### Issue: "Unsupported platform"
- **Solution:** Ensure OS is in supported list; upgrade if necessary
- **Check:** Verify 64-bit architecture with `uname -m` or system settings

## Version Compatibility

- **HIDEBAF v1.0.0:** Requires Bun 1.3.14+
- **Future Versions:** May require newer Bun versions
- **Backward Compatibility:** Archives created in v1.0.0 will be compatible with future versions

## Support Resources

- **Bun Documentation:** https://bun.sh/docs
- **System Requirements FAQ:** See documentation.html
- **Troubleshooting:** Check README.md for common issues
