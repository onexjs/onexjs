import path from 'path'

import chalk from 'chalk'
import fs from 'fs-extra'

import type { ProjectOptions } from './prompts'
import { getTemplateDir } from './utils'

/**
 * Recursively walk a directory and return all file paths (not directories).
 */
async function walkFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Binary file extensions that should NOT have placeholder replacement applied.
 */
const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.bmp',
  '.ico',
  '.icns',
  '.webp',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
  '.zip',
  '.tar',
  '.gz',
  '.br',
  '.lock',
])

/**
 * Check if a file path points to a binary file (by extension).
 */
function isBinaryFile(filePath: string): boolean {
  return BINARY_EXTENSIONS.has(path.extname(filePath).toLowerCase())
}

/**
 * Replace placeholder tokens in a file's contents.
 * Uses replacement functions to avoid issues with special characters like $& in user input.
 */
function replacePlaceholders(content: string, options: ProjectOptions): string {
  const mobilePlatformsJson = JSON.stringify(options.mobilePlatforms ?? ['ios', 'android'])

  return content
    .replace(/\{\{PROJECT_NAME\}\}/g, () => options.name)
    .replace(/\{\{PROJECT_SLUG\}\}/g, () => options.slug)
    .replace(/\{\{MOBILE_PLATFORMS\}\}/g, () => mobilePlatformsJson)
}

/**
 * Replace Tauri-specific placeholders in all files under targetDir.
 * Reads tauri-config-values.json to get the correct values for the base template.
 */
async function replaceTauriPlaceholders(targetDir: string, options: ProjectOptions): Promise<void> {
  const tauriConfigValuesPath = path.join(targetDir, 'tauri-config-values.json')

  if (!(await fs.pathExists(tauriConfigValuesPath))) {
    return
  }

  const configValues = await fs.readJSON(tauriConfigValuesPath)
  const values = configValues[options.baseTemplate]

  if (!values) {
    return
  }

  // Walk all files and replace Tauri placeholders
  const files = await walkFiles(targetDir)
  for (const filePath of files) {
    if (isBinaryFile(filePath)) continue

    const content = await fs.readFile(filePath, 'utf-8')
    const replaced = content
      .replace(/\{\{TAURI_DEV_COMMAND\}\}/g, () => values.devCommand)
      .replace(/\{\{TAURI_BUILD_COMMAND\}\}/g, () => values.buildCommand)
      .replace(/\{\{TAURI_DEV_URL\}\}/g, () => values.devUrl)
      .replace(/\{\{TAURI_FRONTEND_DIST\}\}/g, () => values.frontendDist)

    if (replaced !== content) {
      await fs.writeFile(filePath, replaced, 'utf-8')
    }
  }

  // Remove the config values file — it's not needed in the final project
  await fs.remove(tauriConfigValuesPath)
}

/**
 * Merge tauri-scripts.json into the project's package.json.
 * Adds Tauri CLI scripts and devDependencies.
 */
async function mergeTauriScripts(targetDir: string): Promise<void> {
  const tauriScriptsPath = path.join(targetDir, 'tauri-scripts.json')
  const packageJsonPath = path.join(targetDir, 'package.json')

  if (!(await fs.pathExists(tauriScriptsPath))) {
    return
  }

  const tauriScripts = await fs.readJSON(tauriScriptsPath)
  const packageJson = await fs.readJSON(packageJsonPath)

  // Merge scripts
  if (tauriScripts.scripts) {
    packageJson.scripts = {
      ...packageJson.scripts,
      ...tauriScripts.scripts,
    }
  }

  // Merge devDependencies
  if (tauriScripts.devDependencies) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...tauriScripts.devDependencies,
    }
  }

  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 })

  // Remove the tauri-scripts file — it's not needed in the final project
  await fs.remove(tauriScriptsPath)
}

/**
 * Update Next.js config to use static export when Tauri is included.
 * Tauri requires static HTML files, not a Node.js server.
 */
async function configureNextjsForTauri(targetDir: string): Promise<void> {
  const nextConfigPath = path.join(targetDir, 'next.config.ts')

  if (!(await fs.pathExists(nextConfigPath))) {
    return
  }

  const content = `import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
}

export default nextConfig
`
  await fs.writeFile(nextConfigPath, content, 'utf-8')
}

/**
 * Append Tauri-specific entries to the project's .gitignore.
 */
async function appendTauriGitignore(targetDir: string): Promise<void> {
  const gitignorePath = path.join(targetDir, '.gitignore')

  const tauriEntries = `
# Tauri
src-tauri/target/
`

  if (await fs.pathExists(gitignorePath)) {
    const existing = await fs.readFile(gitignorePath, 'utf-8')
    await fs.writeFile(gitignorePath, existing.trimEnd() + '\n' + tauriEntries, 'utf-8')
  } else {
    await fs.writeFile(gitignorePath, tauriEntries.trimStart(), 'utf-8')
  }
}

/**
 * Initialize a git repository in the target directory.
 */
async function gitInit(targetDir: string): Promise<void> {
  const { execSync } = await import('child_process')
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' })
    execSync('git add -A', { cwd: targetDir, stdio: 'ignore' })
    execSync('git commit -m "Initial commit from create-onex-app"', {
      cwd: targetDir,
      stdio: 'ignore',
    })
  } catch {
    // Git not available or init failed — not critical, skip silently
  }
}

/**
 * Copy a template directory to the target, replacing placeholders in all
 * text files.
 */
async function copyTemplate(
  templateName: string,
  targetDir: string,
  options: ProjectOptions
): Promise<void> {
  const templateDir = getTemplateDir(templateName)

  if (!(await fs.pathExists(templateDir))) {
    throw new Error(
      `Template "${templateName}" not found at ${templateDir}. ` +
        'This is a bug in create-onex-app — please report it.'
    )
  }

  // Copy the entire template directory
  await fs.copy(templateDir, targetDir, {
    overwrite: true,
    filter: (src) => {
      // Skip .gitkeep files — they are only used to keep empty dirs in git
      return path.basename(src) !== '.gitkeep'
    },
  })

  // Walk all copied files and replace placeholders in text files
  const files = await walkFiles(targetDir)
  for (const filePath of files) {
    if (isBinaryFile(filePath)) continue

    const content = await fs.readFile(filePath, 'utf-8')
    const replaced = replacePlaceholders(content, options)
    if (replaced !== content) {
      await fs.writeFile(filePath, replaced, 'utf-8')
    }
  }
}

/**
 * Scaffold a new project based on the gathered options.
 */
export async function scaffold(options: ProjectOptions): Promise<void> {
  const targetDir = path.resolve(process.cwd(), options.slug)

  // Check if directory already exists
  if (await fs.pathExists(targetDir)) {
    const entries = await fs.readdir(targetDir)
    if (entries.length > 0) {
      const prompts = (await import('prompts')).default
      const { overwrite } = await prompts(
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Directory "${options.slug}" already exists and is not empty. Overwrite?`,
          initial: false,
        },
        {
          onCancel: () => {
            console.log()
            console.log(chalk.red('Cancelled.'))
            process.exit(1)
          },
        }
      )

      if (!overwrite) {
        console.log(chalk.red('Aborted.'))
        process.exit(1)
      }

      // Remove existing contents
      await fs.emptyDir(targetDir)
    }
  }

  // Ensure target directory exists
  await fs.ensureDir(targetDir)

  // 1. Copy base template
  console.log()
  console.log(chalk.dim(`Scaffolding project in ${chalk.reset(targetDir)}...`))
  console.log()

  console.log(`  ${chalk.cyan('Base template:')} ${options.baseTemplate}`)
  await copyTemplate(options.baseTemplate, targetDir, options)

  // 2. Overlay tauri template if desktop is selected
  if (options.includeTauri) {
    console.log(`  ${chalk.cyan('Adding:')} Tauri (desktop support)`)
    await copyTemplate('tauri', targetDir, options)

    // Replace Tauri-specific placeholders (devUrl, buildCommand, etc.)
    await replaceTauriPlaceholders(targetDir, options)

    // Merge tauri scripts and devDependencies into package.json
    await mergeTauriScripts(targetDir)

    // Append Tauri entries to .gitignore
    await appendTauriGitignore(targetDir)

    // If base template is Next.js, configure static export for Tauri
    if (options.baseTemplate === 'nextjs') {
      await configureNextjsForTauri(targetDir)
    }
  }

  // 3. Remove platform-specific files if not selected
  await cleanupUnusedPlatformFiles(targetDir, options)

  // 4. Initialize git repository
  await gitInit(targetDir)
  console.log(`  ${chalk.cyan('Initialized:')} git repository`)
}

/**
 * Remove files that belong to platforms the user did not select.
 * This handles cases like iOS-specific configs when only Android is chosen.
 */
async function cleanupUnusedPlatformFiles(
  targetDir: string,
  options: ProjectOptions
): Promise<void> {
  // If mobile is selected but iOS is not, remove iOS-specific files
  if (
    options.platforms.includes('mobile') &&
    options.mobilePlatforms &&
    !options.mobilePlatforms.includes('ios')
  ) {
    const iosDir = path.join(targetDir, 'ios')
    if (await fs.pathExists(iosDir)) {
      await fs.remove(iosDir)
    }
  }

  // If mobile is selected but Android is not, remove Android-specific files
  if (
    options.platforms.includes('mobile') &&
    options.mobilePlatforms &&
    !options.mobilePlatforms.includes('android')
  ) {
    const androidDir = path.join(targetDir, 'android')
    if (await fs.pathExists(androidDir)) {
      await fs.remove(androidDir)
    }
  }
}
