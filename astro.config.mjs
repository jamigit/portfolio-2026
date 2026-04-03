// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // TODO: set to your production domain so sitemap generates absolute URLs
  // site: 'https://yourdomain.com',
  integrations: [sitemap(), mdx()],
  adapter: netlify(),
});