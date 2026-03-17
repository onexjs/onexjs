export interface OnexConfig {
  name: string
  slug: string
  platforms?: ('ios' | 'android' | 'web' | 'desktop')[]
}

export function defineConfig(config: OnexConfig): OnexConfig {
  return config
}
