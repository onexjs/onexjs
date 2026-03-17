# Package Responsibilities

## `create-onex-app`

Scaffolder. Used once via `npx create-onex-app my-app`.

- Interactive prompts: project name, platforms, auth template, package manager
- Copies `templates/default/` to target directory
- Replaces placeholders (project name, slug) in config files
- Removes unchecked platforms (e.g., strips `src-tauri/` if no desktop)
- Builds `package.json` programmatically based on selections (not from template)
- Runs package manager install, initializes git
- Bundled with `ncc` into a single file for fast `npx` execution

## `onexjs`

Core runtime. Installed as a dependency in user projects.

- `defineConfig()` — type-safe config definition with autocompletion
- Config generators — transforms `onex.config.ts` into `app.config.ts`, `tauri.conf.json`, `metro.config.js`
- Platform utils — `getPlatform()`, `isTauri()`, `isNative()`, `isWeb()`
- Frozen `defaultConfig` object — defaults + documentation of all options
- Zod schema for config validation

## `@onexjs/cli`

Dev/build orchestrator. Installed as a devDependency. Exposes the `onex` binary.

- `onex dev` — starts dev servers for selected platforms
- `onex build` — builds for selected platforms
- `onex add` — copies feature modules into user's project (shadcn pattern)
- Config loading via `jiti` (runtime TS import)
- Process management — spawns Expo/Tauri, labeled output, graceful shutdown
- Environment switching — `--env dev|staging|prod`

## Relationship

```
create-onex-app  ──scaffolds──>  User Project
                                    │
                          uses:     ├── onexjs (runtime)
                                    └── @onexjs/cli (devDependency)
```
