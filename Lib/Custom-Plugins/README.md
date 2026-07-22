# HIDEBAF Custom Plugins

Place your custom plugins in this directory (`Lib/Custom-Plugins/`).
HIDEBAF automatically loads all `.js` plugin files located here upon CLI startup.

## Plugin Structure

```javascript
export default {
  name: "my-custom-plugin",
  version: "1.0.0",
  description: "Description of what this plugin does",
  type: "custom",
  enabled: true,

  init(api) {
    // Register event listeners
    api.on("preHide", (data) => { ... });
    api.on("postHide", (data) => { ... });
    api.on("preReveal", (data) => { ... });
    api.on("postReveal", (data) => { ... });
  }
};
```
