import type { APIRoute } from 'astro'
import { renderToStaticMarkup } from 'react-dom/server'
import { ContactEmailTemplate } from '@/components/email-template'
import { sendEmail } from '@/lib/email'
import type { ContactFormBody } from '@/types/index'

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const env = (locals as App.Locals).runtime?.env
    const body = await request.json() as ContactFormBody
    const { name, email, company, service, budget, timeline, message } = body

    if (!name || !email || !message || !service) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const html = renderToStaticMarkup(
      ContactEmailTemplate({ name, email, company, service, budget, timeline, message })
    )

    await sendEmail(env.EMAIL, {
      from: 'hello@bbyb.dev',
      fromName: 'BitByBit',
      to: 'bitbybit0123@gmail.com',
      subject: `New Project Inquiry from ${name}`,
      html,
      replyTo: email,
    })

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Contact API error:', err)
    return new Response(JSON.stringify({ error: 'Failed to send message. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
