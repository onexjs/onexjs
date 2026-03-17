# Forms

## Stack

- **react-hook-form** — form state management, validation triggering
- **Zod** — schema-based validation
- **@hookform/resolvers** — connects Zod to react-hook-form

## Pattern

### `useAppForm` Hook

A wrapper in `shared/forms/hooks/useAppForm.ts` that connects react-hook-form with Zod:
- Takes a Zod schema and optional default values
- Returns a typed form instance with validation wired up
- Centralizes form configuration (validation mode, error handling)

### Zod Schemas

Defined in `shared/forms/schemas/` with one file per domain:
- `auth.schema.ts` — login, signup, verify OTP
- `profile.schema.ts` — profile update
- etc.

Schemas are reusable: same schema validates both form input and API responses.

## Why This Stack?

**react-hook-form:** Minimal re-renders (uncontrolled inputs). Works with React Native's `TextInput` via `Controller`. Small bundle size.

**Zod:** TypeScript-first schema validation. Infers types from schemas — no duplicate type definitions. Works on all platforms.

**Combined:** Define the schema once, get both validation and TypeScript types. Forms are type-safe end-to-end.
