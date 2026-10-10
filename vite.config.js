
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Required for GitHub Pages repository deployment
  base: '/CareerForge-AI-Frontend/',

  server: {
    port: 5173,
    proxy: {
      // Local development: send API requests to Spring Boot
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
