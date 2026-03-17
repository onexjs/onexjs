# Versioning

## Strategy: Fixed Versioning

All three packages (`onexjs`, `@onexjs/cli`, `create-onex-app`) share the same version number. When any package changes, all are bumped together.

This is the same approach Next.js uses (via Lerna fixed mode). It eliminates version compatibility confusion.

## Why Fixed Over Independent

With 3 packages, independent versioning creates confusion: "Does @onexjs/cli@2.3.0 work with onexjs@2.1.0?" Fixed versioning eliminates this question.

## Changelog

Use **changesets** (`@changesets/cli`) for change tracking:
1. Contributors run `pnpm changeset` to describe their change
2. Changesets accumulate between releases
3. On release: `pnpm changeset version` bumps all packages and generates changelog
4. `pnpm changeset publish` publishes to npm

## Semver Rules

- **Major:** Breaking changes to `onex.config.ts` schema, CLI command changes, template structure changes
- **Minor:** New features (new CLI commands, new template modules, new config options)
- **Patch:** Bug fixes, dependency updates, documentation

## Pre-release

Use `0.x.y` during development. No stability guarantees until `1.0.0`.
