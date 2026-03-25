// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://research.crafter.ing',

  i18n: {
    locales: ['en', 'es', 'pt', 'zh'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      pt: 'en',
      zh: 'en',
    },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});
