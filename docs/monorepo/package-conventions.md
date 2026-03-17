# Package Conventions

## Naming

| Package | npm Name | Binary |
|---------|----------|--------|
| CLI | `@onexjs/cli` | `onex` |
| Scaffolder | `create-onex-app` | `create-onex-app` |
| Core runtime | `onexjs` | (none) |

The `@onexjs/` scope is used for tooling packages. The core runtime uses the bare `onexjs` name for simplicity.

## Directory Structure Per Package

```
packages/cli/
├── src/           # TypeScript source
│   ├── index.ts   # Entry point
│   ├── commands/  # One file per command
│   └── utils/     # Shared utilities
├── dist/          # Compiled output (gitignored)
├── package.json
└── tsconfig.json
```

## Package.json Conventions

- `main` points to compiled output (`dist/index.js`)
- `types` points to declarations (`dist/index.d.ts`)
- `bin` defined for CLI packages
- `scripts.build` — compile TypeScript
- `scripts.dev` — watch mode for development
- `files` array controls what gets published to npm

## Entry Points

Each command in `@onexjs/cli` is lazy-loaded via dynamic `import()` for fast startup. Only the invoked command's code is loaded.

## Internal Dependencies

Packages reference each other via `workspace:*` protocol in `package.json`. pnpm resolves these to symlinks during development and replaces with actual versions during publish.
