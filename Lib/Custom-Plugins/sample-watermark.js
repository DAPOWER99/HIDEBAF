export default {
  name: "sample-watermark",
  version: "1.0.0",
  description: "Example custom plugin that logs custom security watermarks during encryption",
  type: "custom",
  enabled: true,

  init(api) {
    api.on("postHide", (data) => {
      if (api.ui) {
        api.ui.printInfo(`[Watermark Plugin] Archive payload watermarked for output: ${data.outputPath}`);
      }
    });
  }
};
