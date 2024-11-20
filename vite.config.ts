import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Define the proxy path and target
      '/api': {
        target: 'https://restful-booker.herokuapp.com', 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});