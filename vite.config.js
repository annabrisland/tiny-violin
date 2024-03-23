import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    reportCompressedSize: false,
    minify: false,
    sourcemap: true,
    outDir: 'dist',
    lib: {
        formats: ['es', 'cjs'],
        entry: glob.sync(resolve(__dirname, 'src/**/*.{ts,tsx}')).reduce((entries, path) => {
            if (path.endsWith('.d.ts')) {
                return entries;
            }

            const outPath = path.replace(resolve(__dirname, 'src') + '/', '').replace(/\.(ts|tsx)$/, '');
            entries[outPath] = path;
            return entries;
        }, {})
    },
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
  resolve: {
    alias: [{ find: "@", replacement: "./src" }],
  },
})
