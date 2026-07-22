import { readFileSync, existsSync } from "node:fs";

export default {
  name: "compressor",
  version: "1.0.0",
  description: "Analyzes payload compression efficiency, ratio, and space savings",
  type: "base",
  enabled: true,

  init(api) {
    api.on("postHide", (data) => {
      if (data.compress && api.ui) {
        api.ui.printInfo("[Compression Optimizer] Archive payload compressed with zlib level 9.");
      }
    });
  },

  analyzeArchive(archivePath, api) {
    if (!existsSync(archivePath)) {
      throw new Error(`Archive not found: ${archivePath}`);
    }
    const buf = readFileSync(archivePath);
    const magic = buf.subarray(0, 8);
    if (!magic.equals(Buffer.from([72, 73, 68, 69, 66, 65, 70, 1]))) {
      throw new Error("Invalid HIDEBAF archive");
    }
    const flags = buf.readUInt32LE(12);
    const isCompressed = (flags & 2) !== 0;
    const totalSize = buf.length;

    return {
      archivePath,
      totalSizeBytes: totalSize,
      isCompressed,
      compressionStatus: isCompressed ? "Enabled (zlib Deflate Level 9)" : "Disabled (Raw Bytes)",
      estimatedSavings: isCompressed ? "~30% to ~70% (depending on data entropy)" : "0%"
    };
  }
};
