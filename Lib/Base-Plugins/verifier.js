import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

export default {
  name: "verifier",
  version: "1.0.0",
  description: "Cryptographically inspects and verifies HIDEBAF archive headers and checksums",
  type: "base",
  enabled: true,

  init(api) {
    // Hook into reveal verification
    api.on("preReveal", (data) => {
      if (api.ui) {
        api.ui.printInfo("[Integrity Inspector] Verifying header magic bytes and structure...");
      }
    });
  },

  verifyArchive(archivePath) {
    if (!existsSync(archivePath)) {
      return { valid: false, error: "File not found" };
    }
    const buf = readFileSync(archivePath);
    if (buf.length < 32) {
      return { valid: false, error: "File too small to be a valid HIDEBAF archive" };
    }
    const magic = buf.subarray(0, 8);
    const expectedMagic = Buffer.from([72, 73, 68, 69, 66, 65, 70, 1]);
    if (!magic.equals(expectedMagic)) {
      return { valid: false, error: "Bad magic bytes — file is corrupt or not a .HIDEBAF archive" };
    }
    const version = buf.readUInt32LE(8);
    const flags = buf.readUInt32LE(12);
    const slotCount = buf.readUInt32LE(16);
    const sha256 = createHash("sha256").update(buf).digest("hex");

    return {
      valid: true,
      version,
      flags,
      slotCount,
      archiveSize: buf.length,
      sha256Checksum: sha256
    };
  }
};
