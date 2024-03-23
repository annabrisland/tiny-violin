import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build',
    rollupOptions: {
      external: './src',
    },
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "./src" }],
  },
})
