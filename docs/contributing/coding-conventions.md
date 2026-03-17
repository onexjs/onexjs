# Coding Conventions

## Code Style

**Prettier** handles formatting. Config:

| Option | Value | Rationale |
|--------|-------|-----------|
| `printWidth` | 100 | Matches Expo; balances readability and screen use |
| `singleQuote` | true | Universal across Next.js, Expo, Tauri |
| `semi` | false | Cleaner TS; matches Next.js and Tauri |
| `trailingComma` | "es5" | Matches Next.js and Expo |
| `bracketSameLine` | true | Matches Expo; reduces JSX line count |

**ESLint** catches bugs, not style. Config:
- Extend `eslint:recommended` + `@typescript-eslint/recommended`
- `import/order` enforced (alphabetical, newlines between groups) -- borrowed from Expo
- `no-console: warn` -- log via the CLI logger, not `console.log`
- `consistent-type-imports` enforced -- keeps runtime and type imports separate

## TypeScript

Strict mode on. Specific flags:

- `strict: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `verbatimModuleSyntax: true`

All packages extend a shared `tsconfig.base.json`.

## File Naming

- **kebab-case** for all files: `config-loading.ts`, `dev-orchestration.ts`
- **Exception:** React components use **PascalCase**: `LoginForm.tsx`, `Box.tsx`
- **Platform suffix:** `.native.ts`, `.web.ts`
- **Feature prefix:** `auth.store.ts`, `auth.requests.ts`

## Imports

- Named exports preferred (better refactoring). Exception: Expo Router pages use default exports.
- Relative imports within packages. No `@/` path aliases in framework source.
- Barrel files (`index.ts`) only for public APIs of features and platform modules.

## Commit Messages

Conventional commits: `type(scope): description`

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`

Scope is optional but encouraged: `feat(cli): add onex dev --desktop command`

Keep the subject under 72 characters. Body is optional for small changes.

## Git Hooks

**Husky + lint-staged** on pre-commit:
1. Prettier formats staged files
2. ESLint checks staged `.ts`/`.tsx` files

No CI-only enforcement. Hooks catch issues before they reach the repo.

## Test Files

- Co-located in `__tests__/` directories next to source
- Name pattern: `*-test.ts` or `*-test.tsx` (hyphenated, following Expo convention)
- Jest as test runner

## Changelog

Use **changesets** (`@changesets/cli`). Contributors run `pnpm changeset` to describe changes. On release, changesets generate the changelog and bump versions.

No per-PR changelog entries. Changesets handle it.

## PR Workflow

- One feature or fix per PR
- Include a changeset if the change affects published packages
- Tests required for new features and bug fixes
- No CODEOWNERS -- trust-based review (appropriate for small team)
