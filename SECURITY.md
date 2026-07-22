# HIDEBAF Cryptographic Security & Vulnerability Policy

This document defines HIDEBAF's security design goals, vulnerability reporting pipelines, and cryptographic threat vectors.

---

## 1. Security Architecture & Threat Model

HIDEBAF relies on standard cryptographic algorithms (`AES-256-GCM` and `scrypt`) to secure archives. 

### 1.1 Mitigation Vectors
- **Brute-Force Protection:** Passwords undergo a high cost factor function (`scrypt` key derivation) to increase the time needed to compute possible keys. If **Paranoid Mode** is enabled, the work factor increases from $16384$ to $65536$, making brute-force attempts resource-intensive.
- **Offline Attacks & Self-Destruct:** While standard KDF functions slow down online attacks, offline key verification can be targeted by automated script brute-forcers. To mitigate this risk, the **Self-Destruct** module tracks unsuccessful verification attempts and overwrites the entire archive (payload and slots headers) with decoy image data upon reaching the maximum try limit (default 5 attempts).
- **Data Tampering Protection:** GCM (Galois/Counter Mode) authenticated tags are appended to each ciphertext sector to verify data integrity before decryption. If any segment of the ciphertext is modified, verification fails, halting the decryption process.

---

## 2. Vulnerability Management & Reporting

### 2.1 Scope & Policies
If you identify a security vulnerability in HIDEBAF's implementation, please report it privately:
- **Do not open a public issue on GitHub.** This helps prevent vulnerability disclosures before a patch is ready.
- **Reporting Email:** Submit detailed vulnerability reports, including proof-of-concepts, to: **DRAGON_YG@outlook.com**

### 2.2 Response Process
1. **Acknowledgement:** Reports are reviewed within 48 hours.
2. **Analysis:** The vulnerability is verified on the target codebase.
3. **Patch Preparation:** Updates are prepared and tested.
4. **Coordinated Disclosure:** A release version is published, and the advisory is disclosed.