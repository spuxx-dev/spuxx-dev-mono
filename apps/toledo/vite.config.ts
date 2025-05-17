/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [vue(), ViteYaml(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
