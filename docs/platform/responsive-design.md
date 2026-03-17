# Responsive Design

## The Challenge

The same code runs on 4-inch phones and 27-inch monitors. Layout must adapt.

## Breakpoint System

Three breakpoints based on `useWindowDimensions()`:

| Breakpoint | Width | Devices |
|------------|-------|---------|
| mobile | < 768px | Phones |
| tablet | 768-1023px | Tablets, small laptops |
| desktop | >= 1024px | Desktops, large tablets |

## Adaptive Layout Patterns

**Navigation:** Bottom tabs on mobile, sidebar on desktop.

**Content:** Single column on mobile, multi-column on desktop.

**Typography:** Smaller sizes on mobile, larger on desktop. The `Text` component auto-adjusts based on screen width.

## Implementation

`useBreakpoint()` hook reads `useWindowDimensions()` and returns boolean flags: `isMobile`, `isTablet`, `isDesktop`.

`useResponsiveValue()` hook selects a value based on current breakpoint — avoids conditional rendering boilerplate.

## Styling With NativeWind

NativeWind (Tailwind CSS for React Native) handles responsive styling via breakpoint prefixes:
- `className="w-full md:w-1/2 lg:w-1/3"` — responsive widths
- `className="flex-col md:flex-row"` — stack on mobile, row on desktop
- `className="hidden md:flex"` — hide on mobile, show on desktop

NativeWind compiles Tailwind classes to React Native StyleSheet objects at build time, so there is zero runtime overhead.

## Design Tokens

Breakpoint values, colors, typography scales, and spacing are defined in `constants/`. Components reference tokens instead of hardcoding values. This keeps the design system consistent across all platforms.
