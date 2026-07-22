# HIDEBAF In-Depth Architectural & Cryptographic Specification

This document provides a comprehensive breakdown of HIDEBAF's architecture, memory constraints, data formats, execution lifecycles, and security protocols.

---

## 1. Cryptographic System Design

HIDEBAF relies on standard cryptographic primitives implemented via Bun's native runtime interfaces. It operates under a zero-trust model where data remains fully encrypted at rest, and file/directory structures are hidden inside a flat binary payload sector.

```
                              CRYPTOGRAPHIC PIPELINE
                              
  [User Password]
         |
         v
  [scrypt KDF Derivation (N=16384/65536, r=8, p=1)]
         |
         +-------------------------------------+
         |                                     |
         v (First 32 bytes)                    v (Last 32 bytes)
  [Derived Sector Key]                 [SHA-256 Verifier Key]
         |                                     |
         v (AES-256-GCM Decrypt)               v (Compare Slot Verifier)
  [Decrypt Sector Metadata Block]      [Header Match Check]
         |                                     |
         | (Get Payload Offset & Size)         +---> Fail: [Increment Count]
         v                                                      |
  [Decrypt Payload Sector Block]                                v
         |                                      If count >= limit: [Self-Destruct]
         v
  [Uncompressed Tar-like File Streams]
```

### 1.1 Key Derivation Function (KDF)
Before any key slots can be read, the user password is transformed into a cryptographic key using `scrypt`:
* **Default Profile:**
  - Cost Factor ($N$): $16384$
  - Block Size ($r$): $8$
  - Parallelization ($p$): $1$
  - Memory Requirement: ~16 MB of system RAM per derivation.
  - Execution Latency: ~80ms to 150ms on standard CPUs.
* **Paranoid Profile:** (Activated via Settings, increasing memory/time cost to deter offline attackers)
  - Cost Factor ($N$): $65536$
  - Block Size ($r$): $8$
  - Parallelization ($p$): $1$
  - Memory Requirement: ~64 MB of system RAM per derivation.
  - Execution Latency: ~400ms to 700ms on standard CPUs.

The KDF outputs a 64-byte sequence. This sequence is divided:
* **Decryption Key (Bytes 0-31):** Key utilized to decrypt the slot envelope.
* **Verification Seed (Bytes 32-63):** Hashed via SHA-256 to generate the **Verification Digest** stored in the slot header.

### 1.2 Galois/Counter Mode (AES-256-GCM)
HIDEBAF uses AES-256-GCM to prevent plaintext tampering:
* **Initialization Vector (IV):** A 12-byte cryptographically secure random value generated via `crypto.getRandomValues()`.
* **Authentication Tag:** A 16-byte tag verifying the integrity of the ciphertext.
* **Additional Authenticated Data (AAD):** The 16-byte magic identifier and flags are bound to the encryption context of each slot, preventing headers from being swapped between archives.

---

## 2. File Format Specification

A `.HIDEBAF` archive is a single contiguous binary stream. 

### 2.1 Complete File Layout Map

```
+-----------------------------------------------------------------------+
| Magic Bytes (8 Bytes) - ASCII "HIDEBAF\0"                              |
+-----------------------------------------------------------------------+
| Version (4 Bytes) - uint32LE                                          |
+-----------------------------------------------------------------------+
| Flags (4 Bytes) - uint32LE                                            |
+-----------------------------------------------------------------------+
| Slot Count (4 Bytes) - uint32LE                                       |
+-----------------------------------------------------------------------+
| Key Slot 0 (212 Bytes)                                                |
|   - Token Salt (16 Bytes)                                             |
|   - SHA-256 Verifier (32 Bytes)                                       |
|   - Slot IV (12 Bytes)                                                |
|   - GCM Tag (16 Bytes)                                                |
|   - Slot Ciphertext (136 Bytes)                                       |
+-----------------------------------------------------------------------+
| Key Slot 1..N (212 Bytes each)                                        |
+-----------------------------------------------------------------------+
| Hint Length (4 Bytes) - uint32LE                                      |
+-----------------------------------------------------------------------+
| Hint Content (Variable) - Plaintext Hint (Omitted in Anonymize Mode)  |
+-----------------------------------------------------------------------+
| Payload Length (8 Bytes) - uint64LE                                   |
+-----------------------------------------------------------------------+
| Encrypted Payload Sector (AES-256-GCM)                                |
|   - Bundle Header (1 Byte) - Compression flag                         |
|   - File Count (4 Bytes) - uint32LE                                   |
|   - File Entry 0..M                                                   |
|       - Name Length (4 Bytes) - uint32LE                              |
|       - Name Content (Variable)                                       |
|       - Data Length (8 Bytes) - uint64LE                              |
|       - Binary File Content Data (Compressed/Raw)                     |
+-----------------------------------------------------------------------+
```

---

## 3. Operational Logic & Pipelines

### 3.1 The Encryption & Packaging Pipeline (`hide`)
1. **Gather Inputs:** Read list of files from CLI args.
2. **Bundle Construction (`packBundle`):**
   - If **Anonymize Mode** is active:
     - Map each filename to a sequence: `file_0.ext`, `file_1.ext`, etc.
     - Omit directory structures.
   - If compression is enabled: Compress file streams using zlib.
   - Combine metadata (filename lengths, names, sizes) and file data into a single payload buffer.
3. **Decryption Slots Encryption:**
   - Generate a random 32-byte `Sector Key`.
   - Encrypt the payload sector using AES-256-GCM with the `Sector Key`.
   - For each token/decoy token:
     - Generate a random 16-byte salt.
     - Derive the 64-byte key material using `scrypt`.
     - Hash the last 32 bytes via SHA-256 to generate the verifier.
     - Encrypt the metadata slot envelope (Sector Key, offset, length) using the derived key.
4. **Header Assembly:** Concatenate Magic, Version, Flags, Slots, Hints (suppressed if Anonymize is active), Payload Length, and the Encrypted Payload Sector. Write the final stream to the output path.

### 3.2 The Decryption & Unpacking Pipeline (`reveal`)
1. **Header Parsing:** Match Magic Bytes and extract the slot count.
2. **Slot Matching:**
   - For each slot in the header:
     - Derive scrypt key material using the user-provided password and the slot's salt.
     - Generate the verification hash and compare it with the stored slot verifier.
     - If matched: Unlock the slot, decrypt the sector reference metadata, and retrieve the `Sector Key`.
3. **Failsafe Monitoring:**
   - If no slot matches: Increment the archive's decryption failure counter.
   - If the counter hits `max_attempts` (configured via `settings`):
     - Check the self-destruct rule: `always`, `firstTime` (runs once, records state flag), or `custom` limit.
     - If triggered: Securely overwrite the archive header and payload with the inline base64 decoy image.
     - Terminate execution.
4. **Decryption and Unpacking (`unpackBundle`):**
   - Decrypt the payload sector using the retrieved `Sector Key`.
   - Extract files to the output directory.
   - If **Anonymize Mode** is active: Update the modification (`mtime`) and access (`atime`) times of all extracted files to the Unix Epoch (`1970-01-01 00:00:00 UTC`).

---

## 4. Settings Configuration Policy (`settings.yml`)

The settings system regulates visual theme output, secret mode filters, and self-destruction thresholds:
- **Theme Selection:** Custom banners loaded dynamically.
- **Scorched Earth Mode:** Forces shredding on decoy slots.
- **Ghost Mode:** Disables diagnostic banners and header prints.
- **Paranoid Mode:** Mandates Cost Factor $N=65536$ on new slot creation.
- **Anonymize Mode:** Forces filename mapping, hint suppression, log redaction, and timestamp epoch resets.
- **Command Restrictions:** Restricts execution of target CLI routes. Any route listed in `disabled_commands` will exit with a disabled warning notice.
