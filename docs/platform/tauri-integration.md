# Tauri Integration

## How Desktop Works

Tauri v2 wraps the Expo web export in a native webview with a Rust backend. The web app runs identically to the browser version, but gains access to native desktop APIs.

## Directory: `src-tauri/`

```
src-tauri/
├── src/
│   └── main.rs          # Rust entry point
├── Cargo.toml           # Rust dependencies
├── tauri.conf.json      # Auto-generated from onex.config.ts
└── capabilities/        # Permission declarations
```

`tauri.conf.json` is auto-generated. Users never edit it directly.

## Dev Mode

Tauri's `devUrl` points to the Expo web dev server. Changes to JS/TS trigger Metro's HMR. Changes to Rust trigger Tauri's built-in recompilation (1-second debounce).

## Build Mode

1. `TAURI_BUILD=true expo export --platform web` generates static files
2. `tauri build` compiles Rust + bundles the static files into a native app
3. `baseUrl` in `app.config.ts` is set to `""` (local filesystem) when `TAURI_BUILD=true`

## Desktop-Only Features

Available via Tauri plugins (only imported in `.web.ts` files, guarded by `isTauri()`):

- File system access — `@tauri-apps/plugin-fs`
- System tray — `@tauri-apps/plugin-tray`
- Global shortcuts — `@tauri-apps/plugin-global-shortcut`
- Auto-updater — `@tauri-apps/plugin-updater`
- Native notifications — `@tauri-apps/plugin-notification`
- Window management — `@tauri-apps/api/window`
- Encrypted store — `@tauri-apps/plugin-store`

## Tauri Plugin Config

Each Tauri plugin needs a capability declaration in `src-tauri/capabilities/`. The framework generates these from `onex.config.ts` based on which features are enabled.
