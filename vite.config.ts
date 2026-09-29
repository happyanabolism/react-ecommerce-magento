import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // '' prefix loads all variables, not only VITE_*: this one is used by the
  // dev server only and must not end up in the client bundle
  const env = loadEnv(mode, process.cwd(), '');

  // the proxy exists only in `vite` / `vite preview`, `vite build` doesn't need it
  if (command === 'serve' && !env.MAGENTO_BACKEND_URL) {
    throw new Error(
      'MAGENTO_BACKEND_URL is not set. Copy .env.example to .env.local and set it.'
    );
  }

  return {
    plugins: [react()],
    // Aliases must stay in sync with "paths" in tsconfig.json.
    // They are defined here (not via vite-tsconfig-paths) because Sass
    // `@use '@shared/...'` is resolved only through resolve.alias.
    resolve: {
      alias: {
        '@app': path.resolve('./src/app'),
        '@entities': path.resolve('./src/entities'),
        '@features': path.resolve('./src/features'),
        '@pages': path.resolve('./src/pages'),
        '@shared': path.resolve('./src/shared'),
        '@widgets': path.resolve('./src/widgets'),
      },
    },
    server: {
      proxy: {
        '/graphql': {
          target: env.MAGENTO_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
