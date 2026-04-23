import type { APIRoute } from 'astro'

interface ParsedCV {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  github?: string
  portfolio?: string
  skills?: string[]
  experience?: Array<{ role: string; company: string; start: string; end: string; desc: string }>
  education?: Array<{ school: string; degree: string; start: string; end: string }>
}

const CV_SCHEMA = {
  name: 'cv_data',
  schema: {
    type: 'object',
    properties: {
      firstName: { type: 'string', description: 'First name' },
      lastName: { type: 'string', description: 'Last name' },
      email: { type: 'string', description: 'Email address' },
      phone: { type: 'string', description: 'Phone number' },
      location: { type: 'string', description: 'City, Country' },
      linkedin: { type: 'string', description: 'LinkedIn URL or username' },
      github: { type: 'string', description: 'GitHub URL or username' },
      portfolio: { type: 'string', description: 'Portfolio or personal website URL' },
      skills: { type: 'array', items: { type: 'string' }, description: 'Technical skills list' },
      experience: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            role: { type: 'string' },
            company: { type: 'string' },
            start: { type: 'string', description: 'Start year e.g. 2020' },
            end: { type: 'string', description: 'End year or Present' },
            desc: { type: 'string', description: 'One sentence summary' },
          },
          required: ['role', 'company', 'start', 'end'],
        },
      },
      education: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            school: { type: 'string' },
            degree: { type: 'string' },
            start: { type: 'string' },
            end: { type: 'string' },
          },
          required: ['school', 'degree'],
        },
      },
    },
  },
}

function mimeTypeFor(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'pdf') return 'application/pdf'
  if (ext === 'txt') return 'text/plain'
  return 'application/octet-stream'
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const env = (locals as App.Locals).runtime.env
    const { text, cvBase64, cvName } = await request.json() as {
      text?: string
      cvBase64?: string
      cvName?: string
    }

    if (!text && !cvBase64) {
      return new Response(JSON.stringify({ error: 'Nothing to process' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let cvKey: string | undefined
    let parsed: ParsedCV = {}

    // Store original file in R2
    if (cvBase64 && cvName) {
      try {
        cvKey = crypto.randomUUID()
        const bytes = Uint8Array.from(atob(cvBase64), (c) => c.charCodeAt(0))
        await env.CV_BUCKET.put(cvKey, bytes.buffer as ArrayBuffer, {
          httpMetadata: {
            contentType: mimeTypeFor(cvName),
            contentDisposition: `attachment; filename="${cvName}"`,
          },
        })
      } catch (e) {
        console.error('R2 store error:', e)
        cvKey = undefined
      }
    }

    // Parse text with Workers AI
    if (text && text.trim().length >= 50) {
      const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          {
            role: 'system',
            content:
              'You are a CV parser. Extract structured information from the provided resume/CV text. Return only the JSON, no explanation.',
          },
          {
            role: 'user',
            content: `Parse this CV and extract the information:\n\n${text.slice(0, 4000)}`,
          },
        ],
        response_format: { type: 'json_schema', json_schema: CV_SCHEMA },
        max_tokens: 1024,
      })
      parsed = JSON.parse(result.response) as ParsedCV
    }

    return new Response(JSON.stringify({ ...parsed, cvKey }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('CV parse error:', err)
    return new Response(JSON.stringify({ error: 'Failed to process CV' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
