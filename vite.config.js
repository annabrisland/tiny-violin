import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mediapipe_workaround()
  ],
  publicDir: "node_modules/@mediapipe/hands",
})

function mediapipe_workaround() {
  return {
    name: 'mediapipe_workaround',
    load(id) {
      if (path.basename(id) === 'hands.js') {
        let code = fs.readFileSync(id, 'utf-8');
        code += 'exports.Hands = Hands;';
        return {code};
      } else {
        return null;
      }
    },
  };
}