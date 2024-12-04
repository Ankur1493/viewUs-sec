import { SupportMailTemplate } from "@/components/emailTemplates/support-mail";
import { EmailTemplate } from "@/components/emailTemplates/text-review-submitted";
import { VerificationEmailTemplate } from "@/components/emailTemplates/verification-mail";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendTextReviewSubmitted({ email, reviewCount, spaceTitle }: { email: string, reviewCount: number, spaceTitle: string }) {
  try {
    // Send email asynchronously
    if (reviewCount > 10) {
      // create a condition to not show the review here and if it reaches more than 10, we will only store 3-4 more reviews at max
      const response = await resend.emails.send({
        from: 'ViewUs <team@viewus.in>',
        to: [email],
        subject: "Review Received",
        react: EmailTemplate({ firstName: 'View-Us', reviewCount, spaceTitle }),
      });
      if (response) {
        console.log({ response, message: `mail sent ${new Date().toISOString()} ` })
      }
    } else {
      const response = await resend.emails.send({
        from: 'ViewUs <team@viewus.in>',
        to: [email],
        subject: "Review Received",
        react: EmailTemplate({ firstName: 'View-Us', reviewCount, spaceTitle }),
      });
      if (response) {
        console.log({ response, message: `mail sent ${new Date().toISOString()} ` })
      }
    }

  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

export async function sendVerificationMail({ email, token }: { email: string, token: string }) {


  try {
    // Send email asynchronously
    const response = await resend.emails.send({
      from: 'ViewUs <team@viewus.in>',
      to: [email],
      subject: "Review Received",
      react: VerificationEmailTemplate({ firstName: 'View-Us', token, email }),
    });
    if (response) {
      console.log({ response, message: `mail sent ${new Date().toISOString()} ` })
    }
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

export async function sendSupportMail({ email, message, type }: { email: string, message: string, type: string }) {
  try {
    // Send email asynchronously
    const response = await resend.emails.send({
      from: 'ViewUs <team@viewus.in>',
      to: ["ankursharma1493@gmail.com", "uditkapoor060@gmail.com", "team@viewus.in"],
      subject: "Review Received",
      react: SupportMailTemplate({ email, message, type }),
    });
    if (response) {
      console.log({ response, message: `mail sent ${new Date().toISOString()} ` })
    }
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
