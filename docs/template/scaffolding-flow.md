# Scaffolding Flow

## What `create-onex-app` Does

### Step 1: Parse Arguments

CLI flags always win over prompts. CI environments (`--yes` flag or `ciInfo.isCI`) skip prompts and use defaults.

Priority: CLI flags > stored preferences > interactive prompts > defaults.

### Step 2: Interactive Prompts

1. **Project name** -- validates against npm naming rules
2. **Platforms** -- iOS, Android, Web, Desktop (default: all)
3. **Include auth template?** -- yes/no
4. **Package manager** -- auto-detected from `npm_config_user_agent`, with override flags

### Step 3: Validate

- Project name is valid npm package name
- Target directory doesn't exist (or is empty)
- Network connectivity (for dependency installation)

### Step 4: Copy Template

1. Copy `templates/default/` to target directory
2. Replace placeholders (`__PROJECT_NAME__`, `__PROJECT_SLUG__`, `__BUNDLE_ID__`)
3. Remove unchecked platforms (e.g., strip `src-tauri/` if no desktop)
4. Build `package.json` programmatically based on selections (not copied from template)
5. Rename `gitignore` to `.gitignore`

### Step 5: Post-Scaffold

1. Run package manager install
2. Initialize git repository
3. Print next steps

## Template Design Decisions

**Single template directory** with conditional file exclusion. One template, not multiple variants. Same approach as Next.js.

**`package.json` built programmatically** -- dependencies selected based on platform choices. Avoids maintaining multiple `package.json` variants.

**Simple placeholder replacement** (find-and-replace, not Handlebars/EJS). Only three placeholders: `__PROJECT_NAME__`, `__PROJECT_SLUG__`, `__BUNDLE_ID__`.

**Templates embedded in npm package** (not downloaded at runtime). Works offline, no version mismatch, fast scaffolding. Future: GitHub URL downloads for community templates.

## Package Manager Detection

Uses `npm_config_user_agent` env var. Falls back to spawning `<manager> --version`. Explicit flags (`--use-pnpm`) override detection.

## Key Libraries

- `commander` -- argument parsing
- `@clack/prompts` -- interactive UI
- `fs-extra` -- file operations
- `validate-npm-package-name` -- name validation
