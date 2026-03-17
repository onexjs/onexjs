# Workspace Setup

## Tools

- **pnpm workspaces** — package management and linking
- **Turborepo** — build orchestration, caching, task dependencies

This mirrors Next.js's approach (pnpm + Turborepo) while keeping it simpler than Expo's 115-package Yarn workspace.

## Workspace Layout

```
onexjs/
├── packages/
│   ├── cli/              # @onexjs/cli
│   ├── create-onex-app/  # create-onex-app
│   └── onexjs/           # onexjs (core runtime)
├── templates/
│   └── default/          # Project template
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## pnpm-workspace.yaml

```yaml
packages:
  - "packages/*"
```

Templates are NOT workspace packages — they are copied to user projects, not linked.

## Turborepo Config

Tasks defined in `turbo.json`:
- `build` — compile TypeScript, depends on `^build` (build dependencies first)
- `lint` — ESLint across all packages
- `test` — Jest tests
- `typecheck` — `tsc --noEmit`

Turborepo caches outputs so unchanged packages skip rebuilding.

## Why Not Lerna?

Next.js uses Lerna for versioning/publishing, but pnpm + Turborepo + changesets is simpler and more modern. Lerna adds complexity without clear benefit at this scale (3 packages vs Next.js's 18).
