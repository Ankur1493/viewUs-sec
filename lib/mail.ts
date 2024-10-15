import { EmailTemplate } from "@/components/emailTemplates/text-review-submitted";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTextReviewSubmitted({ email, reviewCount, spaceTitle }: { email: string, reviewCount: number, spaceTitle: string }) {
  try {
    // Send email asynchronously
    const response = await resend.emails.send({
      from: 'ViewUs <team@viewus.in>',
      to: [email],
      subject: "Review Received",
      react: EmailTemplate({ firstName: 'View-Us', reviewCount, spaceTitle }),
    });
    if (response) {
      console.log({ response, message: `mail sent ${new Date().toISOString()} ` })
    }
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}


