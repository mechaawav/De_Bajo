import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(),
  output: 'hybrid',   // para que funcionen /api en Vercel
  integrations: [react()],
});
