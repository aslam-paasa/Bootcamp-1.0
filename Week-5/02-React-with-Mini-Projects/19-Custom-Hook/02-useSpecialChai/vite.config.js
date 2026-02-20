import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/coffee/hot': {
        target: 'https://api.sampleapis.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
