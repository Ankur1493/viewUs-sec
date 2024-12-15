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

interface ReviewSubmittedEmailTemplateProps {
  firstName: string;
  spaceTitle: string;
}

export const ReviewSubmittedTemplate = ({
  firstName,
  spaceTitle,
}: ReviewSubmittedEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Your review has been submitted</Preview>
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
        <Container className="max-w-[600px] mx-auto">
          <Img
            src="https://viewus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo1.f089c85f.png&w=64&q=75"
            width="120"
            height="65"
            alt="ViewUs"
            className="mx-auto my-10"
          />
          <Container className="bg-white p-45 rounded-lg shadow-lg">
            <Heading className="text-2xl font-bold text-center text-gray-800 my-0 leading-8">
              Thank You for Your Review, {firstName}!
            </Heading>
            <Text className="text-base text-gray-600 mt-4 mb-6 text-center">
              Your review for &quot;{spaceTitle}&quot; has been successfully
              submitted.
            </Text>
            <Section className="bg-green-50 border border-green-100 rounded-lg p-6 mb-6">
              <Text className="text-sm text-green-800 m-0">
                We appreciate your feedback! Your review helps others make
                informed decisions and improves the overall experience on
                ViewUs.
              </Text>
            </Section>
            <Text className="text-sm text-gray-600 mt-6 mb-0">
              If you have any questions or need to make changes to your review,
              please don&apos;t hesitate to contact our support team.
            </Text>
          </Container>
          <Text className="text-xs text-gray-400 mt-8 mb-4 text-center">
            © 2024 ViewUs. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ReviewSubmittedTemplate;
