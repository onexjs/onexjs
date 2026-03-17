# Logging

## Structured Output

All CLI output uses a consistent logging module with prefixed symbols and colors.

| Level | Symbol | Color | Use |
|-------|--------|-------|-----|
| ready | `>` | Green | Server started, build complete |
| info | ` ` | White | General information |
| wait | `o` | White | Long-running operation in progress |
| success | `+` | Green | Step completed |
| warn | `!` | Yellow | Non-fatal issue |
| error | `x` | Red | Fatal error |

## Platform Labels

When multiple dev servers run simultaneously, output is prefixed with colored labels:

- `[mobile]` — Expo native dev server output
- `[web]` — Expo web dev server output
- `[desktop]` — Tauri dev output

## Deduplication

Repeated warnings are suppressed using a cache. `warnOnce()` and `errorOnce()` prevent log spam from recurring issues during development.

## Design Decisions

- Use `chalk` for colors (widely supported, handles `NO_COLOR` env var)
- Log to appropriate streams: errors to `stderr`, info to `stdout`
- In CI environments, strip color codes and reduce verbosity
- `--verbose` flag increases log level for debugging
