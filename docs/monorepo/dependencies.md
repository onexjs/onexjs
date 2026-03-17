# Key Dependencies

## CLI Dependencies

| Library | Purpose |
|---------|---------|
| `commander` | Command/argument parsing (same as Next.js) |
| `@clack/prompts` | Interactive terminal prompts |
| `jiti` | Runtime TypeScript config loading |
| `execa` | Process spawning |
| `chalk` | Colored terminal output |
| `fs-extra` | File operations |
| `fast-glob` | File pattern matching |
| `zod` | Config validation |
| `tree-kill` | Cross-platform process tree killing |

## User Project Dependencies (in template)

| Library | Purpose |
|---------|---------|
| `expo` ~54.x | Mobile + web runtime |
| `expo-router` ~6.x | File-based routing |
| `react-native` 0.81.x | UI framework |
| `react` 19.x | Component model |
| `@tauri-apps/api` ^2.x | Desktop APIs |
| `@tanstack/react-query` ^5.x | Server state management |
| `zustand` ^5.x | Client state management |
| `axios` ^1.x | HTTP client |
| `react-hook-form` ^7.x | Form management |
| `zod` ^4.x | Validation schemas |
| `nativewind` | Tailwind CSS for React Native |

## Version Decisions

**React 19 + React Native 0.81:** Latest stable. Expo 54 supports both.

**Tauri v2 (not v1):** v2 has mobile support, better plugin system, and is the actively maintained version.

**NativeWind as primary styling:** Tailwind CSS utilities work across all platforms via NativeWind. Compiles to StyleSheet objects at build time (zero runtime overhead). `StyleSheet.create()` as fallback only for edge cases NativeWind cannot handle.

**Zustand over Redux:** Simpler API, less boilerplate, works well with React Native.

**Axios over fetch:** Interceptors enable transparent token refresh. Request/response transforms for API normalization.
