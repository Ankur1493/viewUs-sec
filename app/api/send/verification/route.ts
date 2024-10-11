import { VerificationEmailTemplate } from '@/components/emailTemplates/verification-mail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { token, email } = await req.json()
    console.log({ token, email })

    const { data, error } = await resend.emails.send({
      from: 'ViewUs <team@viewus.in>',
      to: [email],
      subject: 'Hello world',
      react: VerificationEmailTemplate({ firstName: 'view-us', token, email }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
