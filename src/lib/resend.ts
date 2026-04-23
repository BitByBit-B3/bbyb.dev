import { Resend } from 'resend'

export const getResend = (env: { RESEND_API_KEY: string }) => new Resend(env.RESEND_API_KEY)
