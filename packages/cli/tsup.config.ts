import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/bin.ts'],
  format: ['cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  shims: true,
})
