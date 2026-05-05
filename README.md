# bbyb.dev

Source code for the [BitByBit (B3)](https://bbyb.dev) website, built with Astro and deployed on Cloudflare Workers.

## Stack

- **Framework**: [Astro](https://astro.build/) with server-side rendering
- **Adapter**: [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) (Cloudflare Workers)
- **UI**: React islands, Tailwind CSS, Radix UI
- **Email**: Cloudflare Email Workers + Resend
- **Deploy**: Cloudflare Workers via Wrangler

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Copy environment variables and fill in your values:**

   ```bash
   cp .dev.vars.example .dev.vars
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:4321](http://localhost:4321) in your browser.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview with Wrangler (Cloudflare Worker) |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run cf-typegen` | Generate Cloudflare environment types |

## Project Structure

```
src/
├── components/   # Reusable Astro & React components
├── data/         # Static data files
├── layouts/      # Page layouts
├── lib/          # Utility functions
├── pages/        # File-based routes
│   └── api/      # API endpoints
├── styles/       # Global styles
└── types/        # TypeScript types
public/           # Static assets
archive/          # Archived features (careers section)
```

## License

[MIT](LICENSE)

