import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
/** @type {import('rollup').RollupOptions} */
export default defineConfig({
  plugins: [
    react(),
  ],
})
