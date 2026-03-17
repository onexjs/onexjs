# Publishing

## npm Packages

| Package | npm Name | Published As |
|---------|----------|-------------|
| Core runtime | `onexjs` | Standard npm package |
| CLI | `@onexjs/cli` | Scoped package |
| Scaffolder | `create-onex-app` | Standard (for `npx` compatibility) |

## Publish Flow

1. `pnpm changeset version` — bump versions, generate changelog
2. `pnpm build` — compile all packages via Turborepo
3. `pnpm changeset publish` — publish all packages to npm
4. Git tag and push

## Build Before Publish

- `create-onex-app` — bundled via `ncc` into a single file (fast `npx` execution)
- `@onexjs/cli` — compiled via `tsup` (SWC)
- `onexjs` — compiled via `tsc` (CJS + ESM + declarations)
- Templates are included in `create-onex-app`'s `files` array

## CI/CD (Future)

GitHub Actions workflow:
1. On push to `main`: run tests, lint, typecheck
2. On changeset merge: auto-publish to npm
3. On PR: run tests, build, verify packages

## Access

- `@onexjs` scope on npm — register early
- `create-onex-app` name — register early
- Two-factor auth required for npm publishing
