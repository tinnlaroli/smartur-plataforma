import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/v2': {
        target: 'https://api-smartur.fly.dev', // URL real de Fly.io
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
