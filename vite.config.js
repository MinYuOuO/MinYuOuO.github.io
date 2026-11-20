import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        prms: resolve(import.meta.dirname, 'pages/prms.html'),
        senai: resolve(import.meta.dirname, 'pages/senai.html'),
        jiuxi: resolve(import.meta.dirname, 'pages/jiuxi.html'),
        colorella: resolve(import.meta.dirname, 'pages/colorella.html'),
        remind: resolve(import.meta.dirname, 'pages/remind.html'),
        mamak: resolve(import.meta.dirname, 'pages/mamak-analytics.html'),
        telco: resolve(import.meta.dirname, 'pages/telco-churn.html'),
        archives: resolve(import.meta.dirname, 'pages/archives.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three';
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }
        },
      },
    },
  },
});
