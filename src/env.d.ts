/// <reference types="astro/client" />

declare module 'cloudflare:email' {
  class EmailMessage {
    constructor(from: string, to: string, raw: string)
  }
}

interface Env {
  EMAIL: { send: (message: import('cloudflare:email').EmailMessage) => Promise<void> }
  ASSETS: unknown
  SESSION: { get: (key: string) => Promise<unknown> }
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>

declare namespace App {
  interface Locals extends Runtime {
    runtime: { env: Env }
  }
}
