# Build Pipeline

## `onex build` Sequence

Unlike dev mode (concurrent), builds run sequentially. Each step must succeed before the next.

### Mobile Build (iOS/Android)

1. Load config, generate `app.config.ts`
2. Set environment to prod (or specified `--env`)
3. Run `eas build --platform ios|android`
4. EAS handles compilation, signing, and distribution

### Web Build

1. Load config, generate configs
2. Run `expo export --platform web`
3. Output: static files in `/dist` ready for any CDN/host

### Desktop Build

1. Load config, generate all configs
2. Set `TAURI_BUILD=true`
3. Run `expo export --platform web` (blocking, must complete)
4. Verify web assets exist in output directory
5. Run `tauri build` (compiles Rust + bundles web assets into native app)
6. Output: `.dmg` (macOS), `.exe`/`.msi` (Windows), `.deb`/`.AppImage` (Linux)

### All Platforms (`--all`)

Runs mobile, web, and desktop builds in sequence. Each platform's build is independent but they share the same config generation step.

## Key Difference: Dev vs Build

| Aspect | Dev | Build |
|--------|-----|-------|
| Frontend process | Non-blocking (background) | Blocking (must complete) |
| Tauri | Dev server + webview | Compile + bundle |
| Environment | `dev` (default) | `prod` (default) |
| Output | Running dev servers | Build artifacts |

## Validation Before Build

- Config validation (Zod)
- Bundle identifier must not be default placeholder
- Required platform tools must be installed (Rust for desktop, EAS CLI for mobile)
