import type { APIRoute } from 'astro'
import { renderToStaticMarkup } from 'react-dom/server'
import { ApplicationEmailTemplate } from '@/components/application-email-template'
import { sendEmail } from '@/lib/email'
import type { ApplicationBody } from '@/types/index'

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const env = (locals as App.Locals).runtime.env
    const body = await request.json() as ApplicationBody

    if (!body.firstName || !body.email || !body.jobId || !body.whyB3) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const origin = new URL(request.url).origin
    const cvDownloadUrl = body.cvKey ? `${origin}/api/cv/${body.cvKey}` : undefined

    const html = renderToStaticMarkup(
      ApplicationEmailTemplate({ application: body, cvDownloadUrl })
    )

    await sendEmail(env.EMAIL, {
      from: 'careers@bbyb.dev',
      fromName: 'BitByBit Careers',
      to: 'bitbybit0123@gmail.com',
      subject: `New Application: ${body.jobTitle} — ${body.firstName} ${body.lastName}`,
      html,
      replyTo: body.email,
    })

    return new Response(JSON.stringify({ message: 'Application submitted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Applications API error:', err)
    return new Response(JSON.stringify({ error: 'Failed to submit application. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
