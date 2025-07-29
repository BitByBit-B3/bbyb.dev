# b3-main-web

# Local Development (OpenNext.js + Cloudflare)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (install globally with `npm install -g pnpm`)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (for Cloudflare deployment)

## Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## OpenNext.js Cloudflare Commands

- **Preview Cloudflare deployment locally:**

  ```bash
  pnpm preview
  ```

  This builds the app and starts a local Cloudflare Worker preview.

- **Deploy to Cloudflare:**

  ```bash
  pnpm deploy
  ```

  This builds and deploys the app to your configured Cloudflare environment.

- **Type generation for Cloudflare environment:**
  ```bash
  pnpm cf-typegen
  ```

## Linting

- **Lint the codebase:**
  ```bash
  pnpm lint
  ```

## Project Structure

- `app/` - Application routes and pages
- `components/` - Reusable React components
- `hooks/` - Custom React hooks
- `lib/` - Utility functions
- `public/` - Static assets
- `styles/` - Global styles

For more details, see the source code and comments.
