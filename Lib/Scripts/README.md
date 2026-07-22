# HIDEBAF — Lib/Scripts

This folder contains **executable scripts** that can be run from the CLI or called by plugins.

## Running a script from the CLI

```
hidebaf script list                     # list all scripts
hidebaf script run <name> [args...]     # run a script
hidebaf script info <name>              # see path & size
```

Supported file types: `.js`, `.ts`, `.ps1`, `.sh`, `.py`, `.bat`, `.cmd`

## Calling a script from a Plugin

Inside your plugin's `init(api)` function:

```js
api.on("postHide", (data) => {
  api.runScript("my-post-hook", [data.outputPath]);
});
```

`api.runScript(name, args?)` resolves names from this folder automatically.

## Adding your own scripts

Just drop any supported file into this folder. No registration required.
