# State Management

## Two-Store Pattern

| Store | Library | Purpose |
|-------|---------|---------|
| Client state | Zustand | UI state, auth tokens, user preferences |
| Server state | TanStack React Query | API data, caching, background refresh |

## Zustand (Client State)

One store per feature. Stores are simple objects with actions.

Key characteristics:
- No boilerplate (unlike Redux)
- Works with React Native out of the box
- Supports persistence via middleware (connected to platform storage)
- Stores are defined per feature: `features/auth/store/auth.store.ts`

## React Query (Server State)

Handles all API data fetching, caching, and background updates.

Key characteristics:
- Automatic cache invalidation and refetching
- Background data refresh (keeps UI fresh)
- Loading/error states built in
- Query keys for cache identity: `['appointments']`, `['client', clientId]`
- Request hooks per feature: `features/appointments/api/appointments.requests.ts`

## Why Two Stores?

Client state and server state have different lifecycles:
- **Client state** is synchronous, local, and controlled by the user
- **Server state** is async, remote, and can change independently

Mixing them (e.g., putting API data in Redux) leads to stale data bugs and manual cache management. React Query handles the hard parts (background refresh, cache invalidation, deduplication) automatically.

## Query Client Setup

A shared `QueryClient` in `shared/utils/query-client.ts` configures defaults (stale time, retry behavior). Wrapped in `QueryClientProvider` at the root layout.
