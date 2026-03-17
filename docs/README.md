# OnexJS Documentation

## Architecture
- [Overview](architecture/overview.md) — System design and package relationships
- [Platform Flow](architecture/platform-flow.md) — How code flows from source to each platform
- [Config Generation](architecture/config-generation.md) — Single config to many configs
- [Package Responsibilities](architecture/packages.md) — What each npm package does

## CLI
- [Commands](cli/commands.md) — `onex dev`, `onex build`, `onex add`
- [Config Loading](cli/config-loading.md) — How `onex.config.ts` is loaded and validated
- [Process Management](cli/process-management.md) — Spawning and orchestrating dev servers
- [Dev Server Orchestration](cli/dev-orchestration.md) — How `onex dev` coordinates Expo + Tauri
- [Build Pipeline](cli/build-pipeline.md) — How `onex build` sequences platform builds
- [Logging](cli/logging.md) — Structured terminal output

## Monorepo
- [Workspace Setup](monorepo/workspace-setup.md) — pnpm workspaces + Turborepo
- [Package Compilation](monorepo/compilation.md) — How packages are compiled
- [Package Conventions](monorepo/package-conventions.md) — Naming, structure, entry points
- [Dependencies](monorepo/dependencies.md) — Key libraries and version decisions

## Template
- [Project Structure](template/project-structure.md) — Generated project layout
- [Scaffolding Flow](template/scaffolding-flow.md) — What `create-onex-app` does step-by-step

## Platform
- [Platform Resolution](platform/resolution.md) — `.native.ts` / `.web.ts` file convention
- [Platform Abstractions](platform/abstractions.md) — Storage, device, alert modules
- [Tauri Integration](platform/tauri-integration.md) — Desktop via Tauri webview
- [Responsive Design](platform/responsive-design.md) — Breakpoints and adaptive layouts

## Patterns
- [Feature Modules](patterns/feature-modules.md) — Self-contained feature directories
- [State Management](patterns/state-management.md) — Zustand + React Query
- [API Layer](patterns/api-layer.md) — Axios client, interceptors, token refresh
- [Forms](patterns/forms.md) — react-hook-form + Zod
- [Component Design](patterns/component-design.md) — Wrapper components and design tokens
- [Routing](patterns/routing.md) — Expo Router file-based routing

## Release
- [Versioning](release/versioning.md) — Version strategy and changelog
- [Publishing](release/publishing.md) — npm publishing workflow

## Contributing
- [Dev Setup](contributing/dev-setup.md) — Getting started as a contributor
- [Coding Conventions](contributing/coding-conventions.md) — Code style and standards

## Roadmap
- [Roadmap](roadmap.md) — Development phases and priorities
