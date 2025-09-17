import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',     // ← antes decía "hybrid"
  adapter: vercel(),    // usar @astrojs/vercel (no /serverless)
  integrations: [react()],
});
