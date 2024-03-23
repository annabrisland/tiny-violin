import { defineConfig } from 'vite'
import {resolve} from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
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
