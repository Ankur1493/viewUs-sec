import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

// interface EmailTemplateProps {
//   message: string;
//   email: string;
//   type: string;
// }

export const SupportMailTemplate = () => (
  // {
  // message,
  // email,
  // type,
  // }
  <Html>
    <Head />
    <Preview>ViewUs Support Request</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#2250f4",
              offwhite: "#fafbfb",
            },
            spacing: {
              0: "0px",
              20: "20px",
              45: "45px",
            },
          },
        },
      }}
    >
      <Body className="bg-offwhite text-base font-sans">
        <Container className="max-w-[600px] mx-auto ">
          <Img
            src="https://viewus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo1.f089c85f.png&w=64&q=75"
            width="120"
            height="65"
            alt="ViewUs"
            className="mx-auto my-10"
          />
          <Container className="bg-white p-45 rounded-lg shadow-lg">
            <Heading className="text-2xl font-bold text-center text-gray-800 my-0 leading-8">
              Support Request Received
            </Heading>
            {/* <Text className="text-base text-gray-600 mt-4 mb-6 text-center">
              We&apos;ve received your support request and will get back to you
              as soon as possible.
            </Text> */}
            <Section className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
              <Text className="text-sm text-blue-800 font-semibold m-0">
                Request Details:
              </Text>
              <Text className="text-sm text-blue-800 mt-2 mb-0">
                <strong>Email:</strong> ankursharma1493@gmail.com
                {/* {email} */}
              </Text>
              <Text className="text-sm text-blue-800 mt-2 mb-0">
                <strong>Type:</strong> Support
                {/* {type} */}
              </Text>
              <Text className="text-sm text-blue-800 mt-2 mb-0">
                <strong>Message:</strong>
              </Text>
              <Text className="text-sm text-blue-800 mt-1 mb-0 italic">
                {/* {message} */}
                &quot;Ar vai sahi lg rha hai kya ye? ya nhi?&quot;
              </Text>
            </Section>
            {/* <Text className="text-sm text-gray-600 mt-6 mb-0">
              Our support team will review your request and respond to you at{" "} */}
            {/* {email} */}
            {/* ankursharma1493@gmail.com. Please allow up to 24-48 hours for a
              response.
            </Text> */}
          </Container>
          <Text className="text-xs text-gray-400 mt-8 mb-4 text-center">
            © 2024 ViewUs. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default SupportMailTemplate;
