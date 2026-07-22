#!/usr/bin/env bun
/**
 * checksum-report.js — HIDEBAF Sample Script
 *
 * Usage:
 *   hidebaf script run checksum-report <file1> [file2 ...]
 *   bun Lib/Scripts/checksum-report.js <file1> [file2 ...]
 *
 * Prints SHA-256 checksums for each file passed as arguments.
 * Also callable from a plugin via:
 *   api.runScript("checksum-report", [filePath])
 */

import { createHash } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error("Usage: checksum-report <file1> [file2 ...]");
  process.exit(1);
}

async function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}

console.log("\n  Checksum Report");
console.log("  " + "─".repeat(60));

for (const file of files) {
  if (!existsSync(file)) {
    console.error(`  ✖ Not found: ${file}`);
    continue;
  }
  try {
    const checksum = await sha256File(file);
    const short = file.length > 30 ? "..." + file.slice(-27) : file;
    console.log(`  ✔ ${short.padEnd(32)} ${checksum}`);
  } catch (err) {
    console.error(`  ✖ Error reading ${file}: ${err.message}`);
  }
}

console.log();
