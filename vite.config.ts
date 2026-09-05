import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: '.',
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3100,
    host: '0.0.0.0',
    // Allow Replit / proxy preview domains
    allowedHosts: true,
  },
  preview: {
    port: 3100,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
