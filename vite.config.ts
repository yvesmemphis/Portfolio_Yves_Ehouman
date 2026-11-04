import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: '0.0.0.0', port: 3000 },
  preview: { host: '0.0.0.0', port: 3000 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'vendor-react';
          if (id.includes('three') || id.includes('@react-three') || id.includes('@pmndrs') || id.includes('camera-controls')) return 'vendor-3d';
          if (id.includes('gsap') || id.includes('lenis') || id.includes('lucide-react')) return 'vendor-motion';
        },
      },
    },
  },
});
