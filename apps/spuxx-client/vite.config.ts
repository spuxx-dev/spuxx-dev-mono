import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss(), tsconfigPaths(), viteYaml()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
