import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seaserviceint.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/thank-you') }),
  ],
  vite: { plugins: [tailwindcss()] },
});
