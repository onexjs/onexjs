# Process Management

## How the CLI Spawns Processes

The CLI uses `execa` to spawn child processes (Expo, Tauri). Each process gets labeled output with colored prefixes.

## Process Model

**Dev mode:** Multiple concurrent processes. The CLI is the parent that manages lifecycle.

```
onex dev --all
  ├── [mobile]  expo start
  ├── [web]     expo start --web
  └── [desktop] tauri dev
                  └── (internally runs Expo web + Tauri webview)
```

**Build mode:** Sequential processes. Each step must complete before the next starts.

## Graceful Shutdown

Based on Next.js and Tauri patterns:

1. Register `SIGINT` / `SIGTERM` handlers at CLI startup
2. On signal: set a `cleanupStarted` flag to prevent duplicate handling
3. Forward signal to all child processes
4. Wait for children to exit (with timeout)
5. If timeout: force kill (`SIGKILL`)
6. Exit with proper signal code (130 for SIGINT, 143 for SIGTERM)

## Platform-Specific Process Killing

- **macOS/Linux:** Send signal to process group
- **Windows:** Use `taskkill /F /T /PID` for process tree killing

## Port Conflict Detection

If a port is already in use (`EADDRINUSE`):
1. Detect the blocking process
2. Offer to kill it or try the next port
3. Retry up to 10 ports

## Key Libraries

- `execa` — process spawning with better defaults than `child_process`
- `tree-kill` — cross-platform process tree killing
