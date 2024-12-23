import {
  Body,
  Button,
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

export interface ReviewReceivedEmailTemplateProps {
  firstName: string;
  reviewCount: number;
  spaceTitle: string;
  reviewerName: string;
  reviewType: "text" | "video";
}
const baseUrl =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? "http://localhost:3000"
    : "https://www.viewus.in";

export const ReviewReceivedTemplate = ({
  firstName,
  spaceTitle,
  reviewerName,
  reviewType,
}: ReviewReceivedEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>New text review received for BakedUi</Preview>
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
          <Container className="bg-white p-45 rounded-lg shadow-lg">
            <div className="flex items-start justify-start">
              <Img
                src="https://www.viewus.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo1.93804693.png&w=48&q=75"
                width="50"
                height="30"
                alt="ViewUs"
                className="mx-auto ml-0 my-4"
              />
            </div>
            <Heading className="text-2xl font-bold text-center text-gray-800 my-0 leading-8">
              New Review Received, {firstName}!
            </Heading>

            <Section className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
              <Text className="text-base text-gray-600 mt-4 mb-6 text-center">
                You&apos;ve received a new {reviewType} review for &quot;
                {spaceTitle}&quot; from {reviewerName}.
              </Text>
            </Section>
            <Section className="text-center">
              <Button
                className="bg-brand text-white rounded-lg text-base font-semibold no-underline text-center px-[20px] py-[12px]"
                href={`${baseUrl}/dashboard`}
              >
                View Your Dashboard
              </Button>
            </Section>
            <Text className="text-sm text-gray-600 mt-6 mb-0">
              Keep up the great work! More reviews mean more visibility and
              credibility for your space.
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

export default ReviewReceivedTemplate;
