export default {
  name: "stego-banner",
  version: "1.0.0",
  description: "Provides CLI security visual themes and banner enhancements",
  type: "base",
  enabled: true,

  themes: {
    dragon: { primary: "#ff3c00", secondary: "#ff6b2b", accent: "#ff9a00" },
    stealth: { primary: "#00ffcc", secondary: "#00b386", accent: "#008060" },
    cyber: { primary: "#ff00ff", secondary: "#00ffff", accent: "#ffff00" },
    classic: { primary: "#ffffff", secondary: "#aaaaaa", accent: "#555555" }
  },

  currentTheme: "dragon",

  init(api) {
    api.on("preHide", (data) => {
      if (api.ui && data.hint) {
        api.ui.printStep("Stego-Banner", `Embedded plaintext header metadata hint: "${data.hint}"`);
      }
    });
  },

  setTheme(themeName) {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
      return true;
    }
    return false;
  }
};
