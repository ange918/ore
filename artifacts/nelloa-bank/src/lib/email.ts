import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_nr8t42s';
const TEMPLATE_ID = 'template_eu2elcn';
const PUBLIC_KEY = 'FKlT6Ww_6oM6cEvQh';

export async function sendWelcomeEmail(params: {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
}) {
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
