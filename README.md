# OnexJS

**The React Native framework for every platform.**

One codebase. iOS, Android, Web, and Desktop.

## What is OnexJS?

OnexJS is a cross-platform application framework built on React Native Expo and Tauri. It provides a CLI that scaffolds, develops, and builds apps for all platforms from a single TypeScript codebase.

```bash
npx create-onex-app my-app
cd my-app

onex dev --mobile      # iOS + Android (Expo)
onex dev --web         # Web (Expo Web)
onex dev --desktop     # Desktop (Tauri)
onex dev               # All platforms

onex build --ios
onex build --android
onex build --web
onex build --desktop
onex build --all
```

## How it works

```
Your TypeScript code (React Native components)
        │
        ├──► Expo ──► iOS app
        ├──► Expo ──► Android app
        ├──► Expo Web ──► Web app
        └──► Expo Web ──► Tauri ──► Desktop app (macOS, Windows, Linux)
```

- **Mobile + Web**: React Native Expo handles iOS, Android, and web using Metro bundler
- **Desktop**: The web export is wrapped by Tauri v2 into a native desktop app with a Rust backend
- **Shared UI**: React Native components (View, Text, Pressable) work everywhere via React Native Web
- **Platform-specific code**: Use `.native.ts` / `.web.ts` file extensions — Metro resolves automatically

## Project structure (generated)

```
my-app/
├── app/                    # File-based routing (Expo Router)
│   ├── (auth)/             # Auth screens
│   ├── (app)/              # App screens (tabs, features)
│   └── _layout.tsx         # Root layout
├── shared/                 # Cross-platform code
│   ├── components/         # Design system (Box, Text, Button...)
│   ├── hooks/              # useBreakpoint, useAppState...
│   ├── utils/              # API client, token manager, env...
│   └── forms/              # Zod schemas + form hooks
├── platform/               # Platform abstractions
│   ├── storage/            # AsyncStorage / localStorage / Tauri store
│   ├── device/             # Platform detection
│   └── alert/              # Toast/alert per platform
├── features/               # Feature modules (self-contained)
├── constants/              # Design tokens (colors, typography)
├── src-tauri/              # Tauri desktop backend
├── onex.config.ts          # Single config for all platforms
└── package.json
```

## Single config

Instead of managing `app.json`, `app.config.ts`, `tauri.conf.json`, `metro.config.js`, `.env.*` files separately:

```ts
// onex.config.ts
import { defineConfig } from 'onexjs'

export default defineConfig({
  name: 'My App',
  slug: 'my-app',
  platforms: ['ios', 'android', 'web', 'desktop'],

  desktop: {
    width: 1280,
    height: 800,
  },

  env: {
    dev: { API_URL: 'http://localhost:8000' },
    staging: { API_URL: 'https://staging.api.com' },
    prod: { API_URL: 'https://api.com' },
  },

  deepLink: {
    scheme: 'my-app',
  },

  fonts: {
    heading: 'Lora',
    body: 'Manrope',
  },
})
```

OnexJS generates and manages all underlying config files from this single source.

## Packages

| Package | npm | Purpose |
|---------|-----|---------|
| `onexjs` | `import { defineConfig } from 'onexjs'` | Core runtime |
| `@onexjs/cli` | `onex dev`, `onex build` | Dev/build orchestrator |
| `create-onex-app` | `npx create-onex-app` | Project scaffolder |

## Status

Under active development.

## License

MIT
