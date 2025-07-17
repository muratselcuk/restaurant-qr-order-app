import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend server port
    proxy: {
      '/api': {
        target: 'http://backend:3001', // Backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
