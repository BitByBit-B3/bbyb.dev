import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  site: 'https://bbyb.dev',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
})
