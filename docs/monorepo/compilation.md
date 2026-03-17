# Package Compilation

## How Packages Are Compiled

All packages use TypeScript compiled to CommonJS (CJS) output. This ensures compatibility with Node.js and npm.

### Compilation

| Package | Compiler | Output |
|---------|----------|--------|
| `@onexjs/cli` | SWC (via `tsup`) | CJS, single entry |
| `create-onex-app` | ncc | Single file bundle |
| `onexjs` | tsc | CJS + ESM dual |

### Why These Compilers?

**`create-onex-app` uses ncc:** Bundles everything into a single file. This is the same approach Next.js and Expo use for their `create-*` packages. Users get fast `npx` execution because there's nothing to install.

**`@onexjs/cli` uses tsup (SWC under the hood):** Fast compilation, tree-shaking, handles TypeScript natively. Next.js uses SWC + taskr for the same purpose.

**`onexjs` uses tsc:** Straightforward compilation. Dual output (CJS + ESM) for maximum compatibility. Declaration files (`.d.ts`) for type safety.

### Build Order

Turborepo resolves the dependency graph:

1. `onexjs` (no internal dependencies)
2. `@onexjs/cli` (depends on `onexjs`)
3. `create-onex-app` (independent, can build in parallel with 2)

### Shared TypeScript Config

All packages extend a root `tsconfig.base.json` for consistency (same target, module resolution, strict mode). This follows Expo's `expo-module-scripts/tsconfig.base` pattern.
