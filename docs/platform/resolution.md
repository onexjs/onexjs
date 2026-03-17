# Platform Resolution

## File Extension Convention

Metro bundler automatically resolves platform-specific files based on the build target:

```
storage.ts           <- default export (barrel file)
storage.native.ts    <- used for iOS/Android builds
storage.web.ts       <- used for Web AND Desktop builds
```

**No configuration needed.** Metro handles this natively. The `platform/` directory uses this convention extensively.

## Key Insight: Desktop = Web

Tauri desktop loads the **web** bundle in a native webview. So `.web.ts` files serve both browser and Tauri desktop.

To differentiate between browser-web and Tauri-desktop within `.web.ts` files, use runtime detection:

```
isTauri() → checks window.__TAURI__ at runtime
```

## Resolution Priority

For a native build, Metro checks in order:
1. `file.native.ts`
2. `file.ios.ts` / `file.android.ts` (platform-specific)
3. `file.ts` (fallback)

For a web build:
1. `file.web.ts`
2. `file.ts` (fallback)

## When to Use Platform Files

Use `.native.ts` / `.web.ts` when:
- Different APIs are needed (e.g., AsyncStorage vs localStorage)
- Different third-party libraries per platform
- Different UI behavior (native Alert vs web toast)

Use a single `.ts` file when:
- Pure logic (utils, types, constants)
- React Native components that work everywhere (View, Text, Pressable)
- Hooks that use only cross-platform APIs
