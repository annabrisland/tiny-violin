import { defineConfig } from 'vite'
import {resolve} from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    reportCompressedSize: false,
    minify: false,
    sourcemap: true,
    outDir: 'dist',
    commonjsOptions: {
        include: [/packages/, /node_modules/]
    },
    rollupOptions: {
        external: (source) => {
            if (source.startsWith('.')) {
                return false;
            }

            if (source.includes('node_modules')) {
                return true;
            }

            return !source.includes(__dirname);
        }
    }
  },
  plugins: [react()],
})
