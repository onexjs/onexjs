# Config Loading

## How `onex.config.ts` Is Loaded

1. **Discovery:** Find config file in project root (supports `.ts`, `.js`, `.mjs`)
2. **Runtime import:** Use `jiti` to import TypeScript config at runtime without requiring `ts-node` or `tsx`
3. **Default resolution:** If config exports a function, call it with `{ phase, defaultConfig }`. If it exports an object, use directly.
4. **Validation:** Validate with Zod strict schema. Unknown keys are rejected (catches typos).
5. **Merge:** Deep merge with frozen `defaultConfig` object
6. **Cache:** Cache the loaded config for the duration of the CLI process

## Validation Strategy

**Strict objects** (`z.strictObject()`) reject unknown keys. This catches typos like `widnow` instead of `window`.

**Categorized errors:**
- Fatal errors — invalid types, missing required fields. CLI exits.
- Warnings — deprecated options, unusual values. CLI continues with a warning.

**Clear error messages** include the config key path and expected type.

## Design Decisions (from Next.js + Tauri research)

| Decision | Rationale |
|----------|-----------|
| `jiti` for TS loading | Framework handles transpilation; no user-installed tools needed |
| Zod for validation | Type-safe, good error messages, strict mode catches typos |
| Frozen default config | Serves as both defaults and documentation of available options |
| Functional config support | Enables dynamic values based on build phase and environment |
| Config file watching in dev | Auto-restart on config changes (Watchpack, same as Webpack) |

## Environment-Specific Values

Config can use `process.env` or the build phase argument to vary values:
- API URLs per environment
- Feature flags
- Debug settings
