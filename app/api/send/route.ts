import { Resend } from "resend";
// import ReviewReceivedTemplate from "@/components/emailTemplates/review-received";
// import ReviewSubmittedTemplate from "@/components/emailTemplates/text-review-submitted";
// import ViewUsSupportEmail from "@/components/emailTemplates/support-mail";
import { VerificationEmailTemplate } from "@/components/emailTemplates/verification-mail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "ViewUs <team@viewus.in>",
      to: ["uditkapoor060@gmail.com"],
      subject: "Testing",
      react: VerificationEmailTemplate(),
      // "Hello, is this fine? kaisa hai ye?",
      // "ankursharma1493@gmail.com",
      // "Support"
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
