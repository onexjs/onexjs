# CLI Commands

## `onex dev`

Starts dev servers for selected platforms.

| Flag | Behavior |
|------|----------|
| (none) | Interactive platform selector |
| `--mobile` | Spawns `expo start` (iOS + Android) |
| `--web` | Spawns `expo start --web` |
| `--desktop` | Spawns `tauri dev` (Expo web + Tauri webview) |
| `--all` | All platforms simultaneously |
| `--env <name>` | Use specific environment (dev/staging/prod) |

Automatically detects local IP for mobile dev. Sets `TAURI_BUILD` env var for desktop. Forwards output with colored labels: `[mobile]`, `[web]`, `[desktop]`.

## `onex build`

Builds for selected platforms.

| Flag | Behavior |
|------|----------|
| `--ios` | `eas build --platform ios` |
| `--android` | `eas build --platform android` |
| `--web` | `expo export --platform web` |
| `--desktop` | `expo export` then `tauri build` |
| `--all` | All platforms |
| `--env <name>` | Environment (default: prod) |

## `onex add` (shadcn pattern)

Copies feature code into the user's project. User owns the code.

| Feature | What it adds |
|---------|-------------|
| `auth` | Login, signup, OTP, token refresh, auth store |
| `analytics` | Platform-specific analytics setup |
| `notifications` | Push notifications per platform |
| `rich-text` | Rich text editor (web + native variants) |
| `image-crop` | Image cropping (platform-specific) |

## Future Commands

- `onex config validate` — validate `onex.config.ts`
- `onex config generate` — regenerate derived configs
- `onex generate component|feature` — scaffold code
- `onex doctor` — check environment (Node, Expo, Tauri, Rust)
