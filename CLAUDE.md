# CLAUDE.md — bbyb.dev

Project context and instructions for Claude Code.

## Stack

- **Framework**: Astro 6 (`output: 'server'`)
- **Adapter**: `@astrojs/cloudflare` (Cloudflare Workers)
- **UI**: React islands with `client:load`, Tailwind CSS
- **Email**: Cloudflare Email Workers (`cloudflare:email` + `mimetext`)
- **Deploy**: `npm run deploy` → Astro build → `wrangler deploy` from `dist/server/`
- **Font**: Unbounded (Google Fonts, loaded in `src/layouts/Layout.astro`)

## Archived Features

### Careers Section (`archive/careers/`)

The entire careers/hiring section has been archived and is **not active**.
Restore it when hiring opens up again.

**What's archived:**

| Path in archive | Restore to |
|---|---|
| `src/pages/careers/` | `src/pages/careers/` |
| `src/pages/api/applications.ts` | `src/pages/api/applications.ts` |
| `src/pages/api/parse-cv.ts` | `src/pages/api/parse-cv.ts` |
| `src/pages/api/cv/[key].ts` | `src/pages/api/cv/[key].ts` |
| `src/components/ApplyForm.tsx` | `src/components/ApplyForm.tsx` |
| `src/components/CareersIsland.tsx` | `src/components/CareersIsland.tsx` |
| `src/components/application-email-template.tsx` | `src/components/application-email-template.tsx` |
| `src/content/jobs/*.json` | `src/content/jobs/*.json` |
| `src/lib/jobs.ts` | `src/lib/jobs.ts` |
| `public/pdf.worker.min.mjs` | `public/pdf.worker.min.mjs` |

**Additional steps to restore:**

1. **`src/types/index.ts`** — add back `ApplicationBody` interface (see archived `src/pages/api/applications.ts` for the shape)

2. **`src/env.d.ts`** — add back `AI` and `CV_BUCKET` bindings to the `Env` interface:
   ```ts
   AI: {
     run: (model: string, options: {
       messages: Array<{ role: string; content: string }>
       response_format?: { type: string; json_schema?: unknown }
       max_tokens?: number
     }) => Promise<{ response: string }>
   }
   CV_BUCKET: {
     put(key: string, value: ArrayBuffer, options?: {
       httpMetadata?: { contentType?: string; contentDisposition?: string }
     }): Promise<void>
     get(key: string): Promise<{
       body: ReadableStream
       httpMetadata?: { contentType?: string; contentDisposition?: string }
     } | null>
   }
   ```

3. **`wrangler.jsonc`** — add back the AI and R2 bindings:
   ```jsonc
   "ai": { "binding": "AI" },
   "r2_buckets": [{ "binding": "CV_BUCKET", "bucket_name": "b3-cvs" }]
   ```
   The `b3-cvs` R2 bucket already exists in the Cloudflare account.

4. **`package.json`** — update build scripts to copy the pdf.js worker:
   ```json
   "build": "cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.mjs && astro build",
   "deploy": "cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.mjs && astro build && cd dist/server && npx wrangler deploy --config wrangler.json"
   ```

5. **`src/components/B3Nav.astro`** — add Careers back to the nav links array:
   ```ts
   { href: "/careers", label: "Careers" },
   ```

6. **`src/components/B3Footer.astro`** — restore in the Company column:
   ```html
   <a href="/careers">Careers</a>
   ```
   And in Get in touch:
   ```html
   <a href="/careers">Join the team</a>
   ```

7. **`pdfjs-dist`** is still in `package.json` dependencies — no reinstall needed.
