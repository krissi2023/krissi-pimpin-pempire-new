import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration scoped for the existing CRA-style folder structure.
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      }
    }
  },
  build: {
    outDir: 'build'
  }
});
