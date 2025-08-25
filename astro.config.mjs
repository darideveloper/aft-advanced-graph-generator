// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aft-advanced-graph-generator.apps.darideveloper.com',
  base: '/',
  build: {
    inlineStylesheets: 'always',
  }
});