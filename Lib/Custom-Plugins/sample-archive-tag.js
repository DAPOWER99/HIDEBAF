import fs from "fs";
import path from "path";

export default {
  name: "sample-archive-tag",
  version: "1.0.0",
  description: "Writes a small tag file beside the archive after hiding or revealing content",
  type: "custom",
  enabled: true,

  init(api) {
    api.on("postHide", (data) => {
      const outputPath = data?.outputPath;
      if (!outputPath) return;

      const tagPath = path.join(path.dirname(outputPath), `${path.basename(outputPath, path.extname(outputPath))}.tag.txt`);
      fs.writeFileSync(tagPath, `Archive created: ${path.basename(outputPath)}\nPlugin: sample-archive-tag\n`);

      if (api.ui) {
        api.ui.printInfo(`[Archive Tag Plugin] Wrote tag file: ${tagPath}`);
      }
    });

    api.on("postReveal", (data) => {
      const outputDir = data?.outputDir;
      if (!outputDir) return;

      const tagPath = path.join(outputDir, "reveal.tag.txt");
      fs.writeFileSync(tagPath, `Reveal completed: ${new Date().toISOString()}\nPlugin: sample-archive-tag\n`);

      if (api.ui) {
        api.ui.printInfo(`[Archive Tag Plugin] Wrote reveal tag file: ${tagPath}`);
      }
    });
  }
};
