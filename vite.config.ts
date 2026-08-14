import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    // The three.js/R3F hero background is lazy-loaded on its own chunk
    // (never part of the initial bundle), so its size doesn't affect
    // first paint — raise the warning threshold to stop flagging it.
    chunkSizeWarningLimit: 950,
  },
})
