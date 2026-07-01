import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export async function sendWelcomeEmail(params: {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('[email] EmailJS env vars missing — skipping welcome email');
    return;
  }

  emailjs.init({ publicKey: PUBLIC_KEY });

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_name: `${params.firstName} ${params.lastName}`,
      to_email: params.email,
      account_type: params.accountType,
      reply_to: 'contact@nelloabank.com',
    },
  );
}
