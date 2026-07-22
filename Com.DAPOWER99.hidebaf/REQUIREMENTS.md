# HIDEBAF Execution & Hardware Resource Requirements

This document details the hardware, system environment, and execution requirements for HIDEBAF.

---

## 1. System Requirements

### 1.1 Memory Allocation & scrypt KDF Constraints
The key derivation function (KDF) uses `scrypt` to protect archives against brute-force attacks. This memory-hard function has specific RAM requirements:

* **Default Mode ($N=16384$, $r=8$, $p=1$):**
  - **Memory Requirement:** ~16 MB of system RAM per derivation.
  - **Execution Latency:** ~80ms to 150ms on standard CPUs.
* **Paranoid Mode ($N=65536$, $r=8$, $p=1$):**
  - **Memory Requirement:** ~64 MB of system RAM per derivation.
  - **Execution Latency:** ~400ms to 700ms on standard CPUs.

### 1.2 Resource Allocation Guidelines

| Component | Minimum | Recommended | Large File Processing |
| :--- | :--- | :--- | :--- |
| **RAM** | 256 MB | 512 MB | 4 GB+ (for archives > 2GB) |
| **Disk Space** | 50 MB | 100 MB | 2x size of target files (working buffer) |
| **Processor** | Any 64-bit CPU | Multi-core 2.0 GHz+ | Multi-core with AES-NI instructions |
| **OS** | Windows 7+ / macOS 10.13+ / Linux | Windows 10+ / macOS 11+ | Linux Kernel 4.0+ |

---

## 2. Operating System Compatibility

### 2.1 Windows (64-bit Only)
- **Supported Versions:** Windows 7 SP1, Windows Server 2012 R2, Windows 10, Windows 11.
- **Paths:** Long path support enabled (`\\?\` prefix) is recommended for deeply nested directory structures.

### 2.2 macOS
- **Supported Versions:** macOS 10.13 (High Sierra) and newer.
- **Architectures:** Native compatibility with x86-64 (Intel) and Apple Silicon (M1/M2/M3) runtimes.

### 2.3 Linux
- **Supported Distributions:** Ubuntu 16.04+, Debian 9+, RHEL/CentOS 7+, Fedora 28+.
- **Architectures:** x86-64 (32-bit platforms are unsupported).

---

## 3. Cryptographic Hardware Accelerations

- **AES-NI Support:** Highly recommended. The GCM cipher engine automatically detects and leverages AES-NI instructions when available, reducing CPU usage during encryption.
- **CSPRNG Source:** Requires access to the operating system's entropy pool (`/dev/urandom` on Linux/macOS, CryptGenRandom on Windows). If the entropy source is blocked, execution will halt.
