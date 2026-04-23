import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext/browser'

interface Attachment {
  filename: string
  content: string  // base64
  type?: string
}

interface SendOptions {
  from: string
  fromName?: string
  to: string
  subject: string
  html: string
  replyTo?: string
  attachments?: Attachment[]
}

type EmailBinding = { send: (msg: EmailMessage) => Promise<void> }

export async function sendEmail(binding: EmailBinding, opts: SendOptions): Promise<void> {
  const msg = createMimeMessage()
  msg.setSender({ name: opts.fromName ?? 'BitByBit', addr: opts.from })
  msg.setRecipient(opts.to)
  msg.setSubject(opts.subject)
  if (opts.replyTo) msg.setHeader('Reply-To', opts.replyTo)

  msg.addMessage({ contentType: 'text/html; charset=utf-8', data: opts.html })

  for (const att of opts.attachments ?? []) {
    msg.addAttachment({
      filename: att.filename,
      contentType: att.type ?? 'application/octet-stream',
      data: att.content,
      encoding: 'base64',
    })
  }

  const message = new EmailMessage(opts.from, opts.to, msg.asRaw())
  await binding.send(message)
}
