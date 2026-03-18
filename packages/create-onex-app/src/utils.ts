import path from 'path'

import fs from 'fs-extra'

/**
 * Convert a project name to a kebab-case slug.
 * Strips non-alphanumeric chars (except spaces/hyphens), lowercases,
 * replaces spaces with hyphens, and collapses repeated hyphens.
 */
export function toSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Validate that the project name is non-empty and produces a valid slug.
 */
export function isValidProjectName(name: string): boolean | string {
  if (!name || !name.trim()) {
    return 'Project name cannot be empty'
  }
  const slug = toSlug(name)
  if (!slug) {
    return 'Project name must contain at least one alphanumeric character'
  }
  if (slug.length > 214) {
    return 'Project name is too long'
  }
  return true
}

/**
 * Resolve the absolute path to a template directory.
 *
 * When running from source (ts-node / tsx), templates live at
 * `../../templates/<template>` relative to this file's directory.
 * When bundled with ncc into `dist/index.js`, they live at
 * `../templates/<template>` relative to the dist folder.
 */
export function getTemplateDir(template: string): string {
  // Candidate paths, ordered from most-specific (bundled) to source layout
  const candidates = [
    // Bundled with ncc — dist/index.js → ../templates/<template>
    path.resolve(__dirname, '..', 'templates', template),
    // Running from source — src/utils.ts → ../../templates/<template>
    path.resolve(__dirname, '..', '..', 'templates', template),
    // Monorepo root templates — packages/create-onex-app/src → ../../../templates/<template>
    path.resolve(__dirname, '..', '..', '..', 'templates', template),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  // Return the monorepo root path as default (will fail later with a clear message)
  return candidates[candidates.length - 1]
}
