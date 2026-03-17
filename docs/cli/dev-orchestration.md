# Dev Server Orchestration

## The Challenge

`onex dev --desktop` needs three things running simultaneously:
1. Expo web dev server (serves the frontend)
2. Tauri dev process (compiles Rust, opens native webview)
3. Metro bundler (JavaScript bundling, runs inside Expo)

Tauri cannot start until Expo is serving content.

## Orchestration Sequence

### Step 1: Load Config
Read `onex.config.ts`, generate derived configs (`app.config.ts`, `tauri.conf.json`, `metro.config.js`).

### Step 2: Start Expo (non-blocking)
Spawn `expo start --web` as a background process. This starts Metro + the web dev server.

### Step 3: Wait for Readiness
Poll the Expo dev server via TCP connection:
- Poll every 2 seconds
- Timeout after 3 minutes (90 attempts)
- Log progress warnings at intervals

This pattern comes directly from Tauri's implementation.

### Step 4: Start Tauri
Once Expo responds, spawn `tauri dev`. Tauri opens a native webview pointed at the Expo dev URL.

### Step 5: Watch for Changes
- Config file changes: reload config, restart affected processes
- Rust changes: Tauri's built-in watcher handles recompilation (1-second debounce)
- JS changes: Metro's hot module replacement handles it automatically

## Auto Local IP Detection

For `onex dev --mobile`, the CLI auto-detects the local network IP so mobile devices on the same network can connect. Replaces the manual `ipconfig getifaddr en0` scripts.

## Environment Variables

- `TAURI_BUILD` — set automatically when running desktop dev/build
- Expo dev server URL — passed to Tauri config as `devUrl`
- User-defined env vars from `onex.config.ts` — written to `.env`
