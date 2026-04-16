import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function removeApiPrefix(pathname) {
  return pathname.replace(/^\/api/, '')
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://development-internship-api.geopostenergy.com',
        changeOrigin: true,
        rewrite: removeApiPrefix,
      },
    },
  },
})