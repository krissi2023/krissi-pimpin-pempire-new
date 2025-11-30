import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration that preserves CRA-style environment variables and build output folder.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const createEnvProxy = () => ({
    NODE_ENV: env.NODE_ENV ?? mode,
    REACT_APP_API_URL: env.REACT_APP_API_URL ?? '',
    REACT_APP_STRIPE_PUBLISHABLE_KEY: env.REACT_APP_STRIPE_PUBLISHABLE_KEY ?? ''
  });

  return {
    plugins: [react({ include: /\.[jt]sx?$/ })],
    define: {
      'process.env': createEnvProxy()
    },
    esbuild: {
      loader: 'jsx'
    },
    build: {
      outDir: 'build'
    }
  };
});
