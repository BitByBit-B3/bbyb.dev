/// <reference types="astro/client" />

declare module 'cloudflare:email' {
  class EmailMessage {
    constructor(from: string, to: string, raw: string)
  }
}

interface Env {
  EMAIL: { send: (message: import('cloudflare:email').EmailMessage) => Promise<void> }
  AI: {
    run: (
      model: string,
      options: {
        messages: Array<{ role: string; content: string }>
        response_format?: { type: string; json_schema?: unknown }
        max_tokens?: number
      }
    ) => Promise<{ response: string }>
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
  ASSETS: unknown
  SESSION: { get: (key: string) => Promise<unknown> }
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>

declare namespace App {
  interface Locals extends Runtime {
    runtime: { env: Env }
  }
}
