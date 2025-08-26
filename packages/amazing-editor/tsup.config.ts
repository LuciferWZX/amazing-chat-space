import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  // 添加 CSS 支持
  loader: {
    '.css': 'copy',
  },
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    }
  },
})
