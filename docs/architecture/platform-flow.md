# Platform Flow

## From Config to Platforms

`onex.config.ts` is the single input. The CLI generates platform-specific configs:

| Generated File | Consumer | Purpose |
|----------------|----------|---------|
| `app.config.ts` | Expo | App metadata, plugins, env vars |
| `tauri.conf.json` | Tauri | Window config, build hooks, bundle ID |
| `metro.config.js` | Metro | Bundler config, SVG support |
| `.env` | All | Environment variables for target env |

## Build Targets

**Mobile (iOS/Android):** Expo compiles React Native code via Metro bundler. Distributed via App Store / Play Store using EAS Build.

**Web:** Expo exports a static web build using React Native Web. Components like `View` and `Text` compile to HTML equivalents. Can be deployed to any CDN/host.

**Desktop:** The Expo web export is loaded into a Tauri v2 native webview. Tauri compiles a Rust binary that wraps the web content. Produces `.dmg`, `.exe`, `.deb` etc.

## Desktop-Specific Flow

1. `TAURI_BUILD=true expo export --platform web` produces static assets in `/dist`
2. Tauri packages `/dist` into a native webview app
3. `app.config.ts` detects `TAURI_BUILD` to set `baseUrl: ""` (local filesystem) instead of a hosting subpath

## Metro Platform Resolution

Metro resolves platform-specific files automatically: `*.native.ts` for iOS/Android, `*.web.ts` for Web/Desktop, with `*.ts` as fallback. See [Platform Resolution](../platform/resolution.md) for full details.
