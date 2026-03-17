# Roadmap

## Phase 1: Foundation — `create-onex-app` + Template

**Goal:** `npx create-onex-app my-app` scaffolds a working cross-platform project.

- Initialize monorepo (pnpm workspaces + Turborepo)
- Build `create-onex-app` — prompts, template copying, placeholder replacement
- Build `templates/default/` — working Expo + Tauri project with shared components, platform abstractions, design tokens, auth example
- All config files pre-configured (app.config, tsconfig, metro, tauri, eas)
- ESLint + Prettier + Husky pre-configured
- Test: scaffold and run on iOS, Android, web, desktop

## Phase 2: CLI — `@onexjs/cli`

**Goal:** `onex dev` and `onex build` orchestrate all platform workflows.

- Build `@onexjs/cli` — dev/build commands, config loading, process management
- Build `onexjs` core — `defineConfig()`, config generators, platform utils
- Auto local IP detection for mobile
- Environment switching (`--env`)
- Labeled multi-process output

## Phase 3: Feature System — `onex add`

**Goal:** Pluggable features copied into user's project (shadcn pattern).

- Create feature templates: auth, analytics, notifications, rich-text, image-crop
- Build `onex add <feature>` — copy files, update dependencies, print setup instructions
- Each feature is self-contained with API, store, renderers

## Phase 4: Polish + Publish

**Goal:** Published on npm, ready for community use.

- Publish all packages to npm
- Documentation website
- GitHub repo setup (issues, contributing guide)
- Example apps (minimal + full)
- Version management with changesets

## Future (Post-v1)

- `onex generate component|feature` — code scaffolding
- Plugin system for community extensions
- Pre-built themes / design systems
- `onex doctor` — environment health check
- CI/CD templates (GitHub Actions)
- Monorepo mode (multiple apps sharing packages)
