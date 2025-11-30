import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration scoped for the existing CRA-style folder structure.
export default defineConfig({
  plugins: [react({ include: /\.[jt]sx?$/ })],
  esbuild: {
    loader: 'jsx'
  },
  build: {
    outDir: 'build'
  }
});
