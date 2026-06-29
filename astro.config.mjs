// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import { headingLinkOptions } from './src/plugins/rehype-heading-links.ts';
import { crafterDark, crafterLight } from './src/lib/shiki-theme.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://research.crafter.ing',

  i18n: {
    locales: ['en', 'es', 'pt', 'zh'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: crafterLight,
        dark: crafterDark,
      },
      defaultColor: false,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, headingLinkOptions],
    ],
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});
