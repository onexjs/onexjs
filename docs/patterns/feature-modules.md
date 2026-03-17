# Feature Modules

## Pattern

Each feature is a self-contained directory with its own API layer, state, and UI.

```
features/auth/
├── api/
│   ├── auth.requests.ts    # API calls (login, signup, verify, refresh)
│   └── auth.types.ts       # TypeScript types for API responses
├── store/
│   └── auth.store.ts       # Zustand store for client state
├── renderers/
│   ├── LoginForm.tsx        # UI components
│   ├── SignupStep.tsx
│   └── VerifyOTP.tsx
├── utils/                   # Feature-specific utilities
└── index.ts                 # Public exports (barrel file)
```

## Rules

1. **Self-contained:** A feature only imports from `shared/`, `platform/`, `constants/`, and its own directory. Never from other features.
2. **Public API via barrel:** Only `index.ts` exports are used by routes in `app/`.
3. **Routes don't contain logic:** `app/` files import feature renderers and compose them. Business logic stays in the feature.
4. **Naming convention:** Files are prefixed with the feature name: `auth.store.ts`, `auth.requests.ts`. Prevents confusion when multiple files are open.

## Dependency Direction

```
app/ (routes) → features/ → shared/ → platform/
                          → constants/
```

Routes depend on features. Features depend on shared utilities and platform abstractions. No circular dependencies.

## Adding Features

`onex add <feature>` copies a feature template into `features/`. The user owns the code and can modify it freely (shadcn pattern).
