import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend server port
    host: '0.0.0.0', // Docker container içinde çalışması için
    watch: {
      usePolling: true, // Docker için gerekli
      interval: 1000, // Polling interval
    },
    proxy: {
      '/api': {
        target: 'http://backend:3001', // Docker service name
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
