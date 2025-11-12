import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  server: {
    proxy: {
      // Proxy all /api requests to backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace(/^\/api/, '') // optional if your backend does NOT use /api prefix
      }
    }
  }
});
