# Routing

## Expo Router (File-Based)

Routes are defined by the file system in the `app/` directory. Expo Router (built on React Navigation) handles navigation.

## Route Groups

```
app/
├── _layout.tsx          # Root: fonts, auth check, providers
├── (auth)/              # Unauthenticated routes
│   ├── _layout.tsx
│   └── login.tsx        # /login
├── (app)/               # Authenticated routes
│   ├── _layout.tsx      # Auth guard (redirects to login if no token)
│   └── (tabs)/          # Tab navigator
│       ├── _layout.tsx  # Tab bar configuration
│       └── index.tsx    # / (dashboard)
└── (public)/            # No auth required
```

Parenthesized directories `(auth)`, `(app)` are route groups — they organize routes without affecting the URL path.

## Auth-Based Navigation

The root `_layout.tsx` handles auth routing:
- Unauthenticated user in `(app)` group: redirect to `/login`
- Authenticated user in `(auth)` group: redirect to `/`
- Deep link support: save pending URL, redirect after login completes

## Layouts

`_layout.tsx` files wrap all routes in their directory. Used for:
- Root layout: font loading, providers (QueryClient, auth), splash screen
- Auth guard: check token before rendering children
- Tab layout: configure tab bar, icons, labels

## Dynamic Routes

`[param].tsx` for dynamic segments: `/clients/[id]` matches `/clients/123`.

`[...rest].tsx` for catch-all routes.

`+not-found.tsx` for 404 pages.
