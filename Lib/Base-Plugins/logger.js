import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export default {
  name: "logger",
  version: "1.0.0",
  description: "Records audit log of all archive operations into Content/audit.log",
  type: "base",
  enabled: true,

  init(api) {
    const logDir = api.resolvePath("Content");
    const logFile = join(logDir, "audit.log");

    const logEvent = (action, details) => {
      try {
        if (!existsSync(logDir)) {
          mkdirSync(logDir, { recursive: true });
        }
        const timestamp = new Date().toISOString();
        const entry = `[${timestamp}] [${action.toUpperCase()}] ${JSON.stringify(details)}\n`;
        appendFileSync(logFile, entry, "utf8");
      } catch (err) {
        // Ignore logging errors
      }
    };

    api.on("preHide", (data) => logEvent("HIDE_START", { files: data.files, output: data.outputPath }));
    api.on("postHide", (data) => logEvent("HIDE_SUCCESS", { output: data.outputPath, tokenCount: data.tokens?.length }));
    api.on("preReveal", (data) => logEvent("REVEAL_START", { archive: data.archivePath, outputDir: data.outputDir }));
    api.on("postReveal", (data) => logEvent("REVEAL_SUCCESS", { archive: data.archivePath, extractedCount: data.extractedFiles?.length }));
  },

  getLogs(api, limit = 20) {
    const logFile = api.resolvePath("Content/audit.log");
    if (!existsSync(logFile)) return [];
    const lines = readFileSync(logFile, "utf8").trim().split("\n").filter(Boolean);
    return lines.slice(-limit);
  }
};
