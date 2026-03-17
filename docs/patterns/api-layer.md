# API Layer

## Architecture

A shared Axios instance in `shared/utils/api.ts` with interceptors for cross-cutting concerns.

## Request Interceptor

Before every request:
1. Get a valid token from `TokenManager`
2. If token is expired, refresh it (with mutex to prevent concurrent refreshes)
3. Attach `Authorization: Bearer <token>` header

## Response Interceptor

After every response:
- **Success:** Deserialize response data (e.g., JSON:API format normalization)
- **401 error:** Token is invalid, trigger logout
- **Other errors:** Propagate to the calling code

## Token Refresh with Mutex

The `TokenManager` class in `shared/utils/token-manager.ts` prevents concurrent token refreshes:

- If token is expired and no refresh is in progress: start refresh, store the promise
- If token is expired and refresh is in progress: return the existing promise
- On refresh completion: clear the stored promise

This prevents race conditions when multiple API calls happen simultaneously with an expired token.

## Per-Feature API Files

Each feature defines its own API calls:

```
features/auth/api/auth.requests.ts     — login(), signup(), verify()
features/clients/api/clients.requests.ts — getClients(), createClient()
```

These use the shared Axios instance and are consumed by React Query hooks in the same feature.

## Environment-Based URLs

The API base URL comes from environment variables, set via `onex.config.ts` and injected into `.env` files per environment.
