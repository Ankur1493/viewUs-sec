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

export const VerificationEmailTemplate = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to viewUs - Amplify Your Social Proof</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#4F46E5",
                offwhite: "#F9FAFB",
              },
              spacing: {
                0: "0px",
                4: "16px",
                6: "24px",
                8: "32px",
                12: "48px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Container className="mx-auto pt-12 pb-12">
            <Img
              src="https://viewus.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo1.f089c85f.png&w=64&q=75"
              width="150"
              height="100"
              alt="viewUs"
              className="mx-auto mb-12"
            />
            <Container className="bg-white p-12 rounded-lg shadow-lg">
              <Heading className="text-center text-3xl font-bold text-gray-800 mb-6">
                Welcome to viewUs, Ankur!
              </Heading>

              <Text className="text-gray-600 mb-6">
                We&apos;re excited to have you on board. viewUs is here to help
                you showcase powerful testimonials and boost your
                business&apos;s credibility.
              </Text>

              <Text className="text-gray-600 font-semibold mb-6">
                Here&apos;s what you can do with viewUs:
              </Text>

              <ul className="list-disc pl-6 mb-8">
                <li className="mb-4">
                  Collect and manage customer testimonials
                </li>
                <li className="mb-4">Create beautiful testimonial displays</li>
                <li className="mb-4">
                  Easily embed testimonials on your website
                </li>
                <li className="mb-4">
                  Analyze the impact of your testimonials
                </li>
              </ul>

              <Section className="text-center mb-8">
                <Button
                  href="http://localhost:3000/dashboard"
                  className="bg-brand text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-600 transition-colors"
                >
                  Go to Your Dashboard
                </Button>
              </Section>

              <Text className="text-gray-600 mb-6">
                Need help? Our support team is always here to assist you. Feel
                free to reach out to us at{" "}
                <span className="text-brand">team@viewus.in</span>.
              </Text>
            </Container>

            <Container className="mt-8 text-center text-gray-500 text-sm">
              <Text>© 2024 viewUs. All rights reserved.</Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
