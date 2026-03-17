# OnexJS - Claude Session Context

## What is this project?

OnexJS is a **cross-platform application framework** with CLI tooling. It enables frontend developers to write **one codebase** that runs on all platforms: iOS, Android, Web, and Desktop.

**Core idea:** React Native Expo handles mobile + web. The web output is wrapped by Tauri for desktop apps. A CLI automates all setup, dev, and build workflows — so developers don't have to configure 10+ tools manually.

Think: **Next.js but for every platform, not just web.**

## Why does this exist?

From building production cross-platform apps, it became clear that:

1. Setting up React Native Expo + Tauri + shared code is extremely tedious
2. There's no framework that handles all platforms from a single codebase with a simple CLI
3. Developers shouldn't need to understand Metro config, Tauri config, env management, platform-specific file resolution, etc. — a framework should abstract that away

## Tech decisions (already finalized)

- **Language for framework/CLI source:** TypeScript (runs on Node.js)
- **Language for generated user code:** TypeScript (React Native)
- **Mobile + Web:** React Native Expo (Expo Router for file-based routing)
- **Desktop:** Tauri v2 (wraps the Expo web export in a native webview + Rust backend)
- **Cross-platform UI:** React Native components (View, Text, Pressable) — works on all platforms via React Native Web
- **Monorepo tool:** pnpm workspaces + Turborepo
- **State management pattern:** Zustand
- **Data fetching pattern:** TanStack React Query
- **Styling pattern:** NativeWind (Tailwind CSS for React Native) as primary; fallback to StyleSheet.create() only when NativeWind can't handle a specific case
- **Platform-specific code:** `.native.ts` / `.web.ts` file extension convention (Metro resolves automatically)

## Repository structure

```
onexjs/
├── packages/
│   ├── cli/                  # `onex dev`, `onex build` — dev/build orchestrator
│   ├── create-onex-app/      # `npx create-onex-app my-app` — project scaffolder
│   └── onexjs/               # Core runtime (defineConfig, platform utils, hooks)
├── templates/
│   └── default/              # Template copied into user's new project
│       ├── app/              # Expo Router file-based routing
│       ├── shared/           # Shared components, hooks, utils, forms
│       ├── platform/         # Platform-specific implementations (.native/.web)
│       ├── features/         # Feature modules (self-contained)
│       ├── constants/        # Design tokens (colors, typography, breakpoints)
│       ├── src-tauri/        # Tauri desktop backend (Rust)
│       └── onex.config.ts    # Single config file for all platforms
├── docs/                     # Architecture and design docs
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Documentation

Full index at `docs/README.md`. Key sections:

- `docs/architecture/` — System design, package responsibilities, platform flow, config generation
- `docs/cli/` — Commands, config loading, process management, dev/build orchestration
- `docs/monorepo/` — Workspace setup, package compilation, package conventions, dependencies
- `docs/template/` — Project structure, scaffolding flow
- `docs/platform/` — File resolution, platform abstractions, Tauri integration, responsive design
- `docs/patterns/` — Feature modules, state management, API layer, forms, components, routing
- `docs/release/` — Versioning strategy, publishing workflow
- `docs/contributing/` — Dev setup, coding conventions
- `docs/roadmap.md` — Development phases and priorities

## Development guidelines

- This framework targets **frontend developers** — API should be simple and opinionated
- Prefer conventions over configuration
- The CLI should do the heavy lifting — users shouldn't need to touch Metro, Tauri, or Expo configs directly
- `onex.config.ts` is the single source of truth — it generates all other config files
- Everything the framework generates must be TypeScript, well-typed, and follow React Native best practices
