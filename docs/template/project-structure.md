# Generated Project Structure

## Directory Layout

```
my-app/
├── app/                    # Expo Router file-based routing
│   ├── _layout.tsx         # Root layout: fonts, auth, providers
│   ├── (auth)/             # Auth route group
│   │   ├── _layout.tsx
│   │   └── login.tsx
│   ├── (app)/              # Authenticated route group
│   │   ├── _layout.tsx     # Auth guard
│   │   └── (tabs)/         # Tab navigator
│   │       ├── _layout.tsx
│   │       └── index.tsx
│   └── +not-found.tsx
├── shared/                 # Cross-platform shared code
│   ├── components/         # Design system: Box, Text, Button, TextInput
│   ├── hooks/              # useBreakpoint, useAppState, useResponsiveValue
│   ├── utils/              # API client, token manager, env, query client
│   └── forms/              # useAppForm hook, Zod schemas
├── platform/               # Platform-specific implementations
│   ├── storage/            # AsyncStorage (native), localStorage (web), Tauri store
│   ├── device/             # Platform detection
│   └── alert/              # Native Alert vs Sonner toast
├── features/               # Feature modules (self-contained)
│   └── auth/               # Example: api/, store/, renderers/
├── constants/              # Design tokens: Colors, Typography, Breakpoints
├── src-tauri/              # Tauri desktop (Rust backend)
├── onex.config.ts          # THE single config file
├── app.config.ts           # Auto-generated (Expo)
├── metro.config.js         # Auto-generated (Metro)
├── tauri.conf.json         # Auto-generated (Tauri)
├── eas.json                # EAS Build config
└── package.json
```

## Key Conventions

- `app/` — routes only, no business logic
- `shared/` — platform-agnostic, reusable across features
- `platform/` — platform-specific, same API different implementation
- `features/` — self-contained modules, own API/store/renderers
- `constants/` — design tokens, never import from features
