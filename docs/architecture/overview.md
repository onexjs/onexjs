# Architecture Overview

## What OnexJS Is

A cross-platform app framework + CLI. One codebase runs on iOS, Android, Web, and Desktop.

- React Native Expo handles mobile + web
- Expo's web export is wrapped by Tauri v2 for desktop
- A CLI automates all setup, dev, and build workflows

## Three npm Packages + One Template

| Package | Purpose | Used When |
|---------|---------|-----------|
| `create-onex-app` | Scaffolds new projects from template | Once at project creation |
| `onexjs` | Core runtime — `defineConfig()`, platform utils, config generators | Runtime dependency |
| `@onexjs/cli` | Dev/build orchestrator — `onex dev`, `onex build` | devDependency in user projects |

The `templates/default/` directory is a complete working project that `create-onex-app` copies.

## Key Architectural Decisions

**Single config file:** `onex.config.ts` is the source of truth. The CLI generates `app.config.ts`, `tauri.conf.json`, `metro.config.js`, and `.env` files from it.

**Convention over configuration:** Users never touch Metro, Tauri, or Expo configs directly. The framework owns those files.

**Shadcn pattern for features:** `onex add auth` copies feature code into the user's project. Users own the code, not a dependency.

**Platform-specific via file extensions:** `.native.ts` for iOS/Android, `.web.ts` for Web + Desktop. Metro resolves automatically.

**Tauri = web bundle in native shell:** Desktop uses the same `.web.ts` code paths. Runtime detection (`isTauri()`) differentiates browser vs desktop when needed.
