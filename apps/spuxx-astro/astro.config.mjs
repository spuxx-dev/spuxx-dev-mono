import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://spuxx.dev',
  integrations: [
    mdx(),
    sitemap({
      // Exclude specific paths from the sitemap
      filter: (page) => !page.includes('/schlangi'),
    }),
    icon(),
    solidJs(),
  ],
});
