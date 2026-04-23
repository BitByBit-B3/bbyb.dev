import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, locals }) => {
  const env = (locals as App.Locals).runtime.env
  const key = params.key
  if (!key) return new Response('Not found', { status: 404 })

  const obj = await env.CV_BUCKET.get(key)
  if (!obj) return new Response('Not found', { status: 404 })

  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType ?? 'application/octet-stream',
      'Content-Disposition': obj.httpMetadata?.contentDisposition ?? `attachment; filename="${key}"`,
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
