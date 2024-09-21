import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // pdf cors 우회
    proxy: {
      '/pdf': {
        target: 'https://delivery183.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pdf/, ''),
      },
    },
  },
});
