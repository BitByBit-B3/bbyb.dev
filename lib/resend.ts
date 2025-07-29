import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Resend } from 'resend';

export const getResend = () => {
  const { env } = getCloudflareContext();
  return new Resend(env.RESEND_API_KEY);
}