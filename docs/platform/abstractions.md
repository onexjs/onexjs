# Platform Abstractions

## The `platform/` Directory

Each module exports the same API with different implementations per platform. Consumers import from the barrel file and Metro resolves the correct implementation.

## Storage

| Platform | Persistent Storage | Secure Storage |
|----------|-------------------|----------------|
| iOS/Android | `AsyncStorage` | `expo-secure-store` |
| Web (browser) | `localStorage` | Secure cookies |
| Desktop (Tauri) | `localStorage` | `@tauri-apps/plugin-store` |

The `.web.ts` implementation uses `isTauri()` to choose between cookies and Tauri's encrypted store at runtime.

## Device Detection

Returns the current platform as a string: `"ios"`, `"android"`, `"web"`, or `"desktop"`.

- `.native.ts` — uses `expo-constants` (`EXPO_OS`)
- `.web.ts` — checks `window.__TAURI__` for desktop, falls back to `"web"`

## Alert / Toast

| Platform | Implementation |
|----------|---------------|
| iOS/Android | React Native `Alert` API |
| Web/Desktop | `sonner` toast library via React portal |

## Future Abstractions

Modules planned for `onex add`:

| Module | Platforms |
|--------|-----------|
| notifications | `expo-notifications` (native), Web Notifications API, `@tauri-apps/plugin-notification` |
| analytics | Mixpanel native SDK, Mixpanel web SDK |
| deep-linking | Expo Linking (native), Tauri deep-link plugin, standard URLs (web) |
| file-system | `expo-file-system` (native), File API (web), `@tauri-apps/plugin-fs` (desktop) |
