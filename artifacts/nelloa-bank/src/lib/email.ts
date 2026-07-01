const SERVICE_ID = 'service_nr8t42s';
const TEMPLATE_ID = 'template_eu2elcn';
const PUBLIC_KEY = 'FKlT6Ww_6oM6cEvQh';

export async function sendWelcomeEmail(params: {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
}) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        to_name: `${params.firstName} ${params.lastName}`,
        to_email: params.email,
        account_type: params.accountType,
        reply_to: 'contact@nelloabank.com',
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`EmailJS error ${res.status}: ${text}`);
  }
}
