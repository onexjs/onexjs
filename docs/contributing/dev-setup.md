# Dev Setup

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- Rust (for Tauri development)
- Xcode (for iOS, macOS only)
- Android Studio (for Android)

## Getting Started

```bash
git clone https://github.com/onexjs/onexjs.git
cd onexjs
pnpm install
pnpm build
```

## Development Workflow

### Working on packages

```bash
pnpm --filter @onexjs/cli dev     # Watch mode for CLI
pnpm --filter onexjs dev          # Watch mode for core
```

### Testing the scaffolder locally

```bash
pnpm --filter create-onex-app build
node packages/create-onex-app/dist/index.js test-app
```

### Testing the CLI locally

```bash
cd /path/to/test-app
pnpm link /path/to/onexjs/packages/cli
onex dev --web
```

### Running tests

```bash
pnpm test          # All packages
pnpm lint          # Lint all packages
pnpm typecheck     # Type check all packages
```

## Project Structure

See [Workspace Setup](../monorepo/workspace-setup.md) for repository layout.

## Useful Commands

| Command | What it does |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type check all packages |
| `pnpm clean` | Remove all build artifacts |
