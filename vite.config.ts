import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'animejs': path.resolve(__dirname, 'node_modules/animejs/lib/anime.es.js')
    }
  },
  server: {
    host: true,
    port: 5173
  }
})
