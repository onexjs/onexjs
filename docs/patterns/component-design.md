# Component Design

## Design System in `shared/components/`

Wrapper components around React Native primitives with typed props and design token integration.

## Core Components

| Component | Wraps | Adds |
|-----------|-------|------|
| `Box` | `View` | Shorthand props: padding, rounded, bg, gap, flex |
| `Text` | `Text` | Typography variants: headline, body, label, caption |
| `Button` | `Pressable` | Variants: primary, secondary, outline, ghost |
| `TextInput` | `TextInput` | Styled input with label, error state, icons |

## Design Principles

**Props over styles:** Components accept semantic props (`bg="surface"`, `rounded={12}`) instead of raw style objects. This enforces design consistency.

**Responsive text:** The `Text` component auto-adjusts typography based on screen width (mobile vs desktop sizes).

**Design tokens:** Colors, typography scales, spacing, and shadows come from `constants/`. Components reference tokens, never hardcode values.

## Styling Approach

**Primary: NativeWind (Tailwind CSS for React Native).** Use `className` prop with Tailwind utility classes. Breakpoint prefixes (`md:`, `lg:`) handle responsive styling. Compiles to StyleSheet objects at build time.

**Fallback: `StyleSheet.create()`.** Used for complex dynamic styles or edge cases NativeWind cannot handle. Design tokens from `constants/` ensure consistency.

## Icons

An icon abstraction in `shared/components/icons/` provides a consistent API across platforms. Uses `@expo/vector-icons` (which wraps `react-native-vector-icons`).
