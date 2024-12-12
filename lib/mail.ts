import { SupportMailTemplate } from "@/components/emailTemplates/support-mail";
import { ReviewSubmittedTemplate } from "@/components/emailTemplates/review-submitted";
import ReviewReceivedTemplate from "@/components/emailTemplates/review-received";
import { VerificationEmailTemplate } from "@/components/emailTemplates/verification-mail";
import { Resend } from "resend";
import { ForgetPasswordEmailTemplate } from "@/components/emailTemplates/forget-password";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendTextReviewSubmitted({
  email,
  reviewerEmail,
  firstName,
  reviewCount,
  spaceTitle,
  reviewerName,
  reviewType,
}: {
  email: string;
  reviewerEmail: string;
  firstName: string;
  reviewCount: number;
  reviewerName: string;
  reviewType: "text" | "video";
  spaceTitle: string;
}) {
  try {
    // Send email asynchronously
    if (reviewerEmail) {
      const response = await resend.emails.send({
        from: "ViewUs <team@viewus.in>",
        to: [reviewerEmail],
        subject: "Review Received",
        react: ReviewSubmittedTemplate({ firstName: reviewerName, spaceTitle }),
      });
      if (response) {
        console.log({
          response,
          message: `mail sent ${new Date().toISOString()} `,
        });
      }
    }
    const response = await resend.emails.send({
      from: "ViewUs <team@viewus.in>",
      to: [email],
      subject: "Review Received",
      react: ReviewReceivedTemplate({ firstName, reviewType, reviewerName, spaceTitle, reviewCount }),
      // { firstName: "View-Us", reviewCount, spaceTitle }
    });
    if (response) {
      console.log({
        response,
        message: `mail sent ${new Date().toISOString()} `,
      });
    }
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

export async function sendVerificationMail(
  {
    email,
    token,
  }: {
    email: string;
    token: string;
  }
) {
  try {
    // Send email asynchronously
    const response = await resend.emails.send({
      from: "ViewUs <team@viewus.in>",
      to: [email],
      subject: "Verify your account",
      react: VerificationEmailTemplate(token),
    });
    if (response) {
      console.log({
        response,
        message: `mail sent ${new Date().toISOString()} `,
      });
    }
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

export async function sendSupportMail({
  email,
  message,
  type,
}: {
  email: string;
  message: string;
  type: string;
}) {
  try {
    // Send email asynchronously
    const response = await resend.emails.send({
      from: "ViewUs <team@viewus.in>",
      to: [
        "ankursharma1493@gmail.com",
        "uditkapoor060@gmail.com",
        "team@viewus.in",
      ],
      subject: "Support mail",
      react: SupportMailTemplate({ email, message, type }),
      // { email, message, type }
    });
    if (response) {
      console.log({
        response,
        message: `mail sent ${new Date().toISOString()} `,
      });
    }
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

export async function sendForgetVerificationToken({
  email,
  token,
}: {
  email: string;
  token: string;
}
) {
  try {
    // Send email asynchronously
    const response = await resend.emails.send({
      from: "ViewUs <team@viewus.in>",
      to: [email],
      subject: "Reset your password",
      react: ForgetPasswordEmailTemplate(token),
    });
    if (response) {
      console.log({
        response,
        message: `mail sent ${new Date().toISOString()} `,
      });
    }
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
