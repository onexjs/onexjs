# Config Generation

## The Problem

A cross-platform project needs 10+ config files: `app.json`, `app.config.ts`, `tauri.conf.json`, `metro.config.js`, `eas.json`, `.env.*`, `tsconfig.json`. Keeping them in sync is tedious and error-prone.

## The Solution

Users edit one file: `onex.config.ts`. The CLI generates everything else.

## Generation Flow

When `onex dev` or `onex build` runs:

1. Load `onex.config.ts` using `jiti` (runtime TS import)
2. Validate config with Zod (strict objects catch typos)
3. Generate `app.config.ts` — Expo app metadata, plugins, env detection
4. Generate `tauri.conf.json` — window config, `beforeDevCommand`, `devUrl`, `frontendDist`
5. Generate `metro.config.js` — SVG transformer, resolver config
6. Write `.env` file for the target environment
7. Spawn the appropriate dev server or build command

## Config Design Decisions

**Frozen default config:** A `defaultConfig` object provides sensible defaults and documents all options. Users spread/override only what they need.

**Zod strict validation:** Uses `z.strictObject()` to reject unknown keys. Catches typos at config load time with clear error messages.

**Functional config support:** `onex.config.ts` can export a function that receives build phase and defaults, enabling dynamic values based on environment.

**TypeScript-native:** Config is `.ts` — full type safety, autocompletion, and conditional logic. No JSON limitations.

## Tauri Config Specifics

The generated `tauri.conf.json` includes:
- `beforeDevCommand`: starts Expo web dev server
- `devUrl`: points to Expo's local dev server URL
- `beforeBuildCommand`: runs `expo export --platform web`
- `frontendDist`: points to the Expo web export output directory
