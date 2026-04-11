import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',

  css: {
    devSourcemap: false,
  },

  server: {
    open: '/index.html',
    port: 3000,
  },
});
