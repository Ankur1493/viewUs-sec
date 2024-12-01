import { z } from "zod";

export const spaceSchema = z.object({
  spaceCreationDetails: z.object({
    projectName: z.string()
      .min(3, { message: "Project name should be at least 3 characters long" })
      .max(50, { message: "Project name should be less than 50 characters long" }),
    projectSlug: z.string()
      .min(3, { message: "Project slug should be at least 3 characters long" })
      .max(50, { message: "Project slug should be less than 50 characters long" }),
  }),
  coverPage: z.object({
    title: z.string()
      .min(4, { message: "Cover page title should be more than 4 characters" })
      .max(100, { message: "Cover page title should be less than 100 characters" }),
    description: z.string()
      .min(4, { message: "Cover page description should be more than 4 characters" })
      .max(200, { message: "Cover page description should be less than 200 characters" }),
    btnText: z.string()
      .min(4, { message: "Button text should be more than 4 characters" })
      .max(50, { message: "Button text should be less than 50 characters" }),
  }),
  design: z.object({
    gradientType: z.number().int().min(1).max(7),
    btnColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: "Button color must be a valid hex color code" }),
  }),
  testimonialPageType: z.object({
    title: z.string()
      .min(4, { message: "Testimonial page title should be more than 4 characters" })
      .max(100, { message: "Testimonial page title should be less than 100 characters" }),
    description: z.string()
      .min(4, { message: "Testimonial page description should be more than 4 characters" })
      .max(200, { message: "Testimonial page description should be less than 200 characters" }),
    questionHeader: z.string()
      .min(4, { message: "Question header should be more than 4 characters" })
      .max(100, { message: "Question header should be less than 100 characters" }),
    questions: z.array(z.string().min(4, { message: "Each question should be more than 4 characters" })),
    tags: z.array(z.string()),
  }),
  testimonialType: z.object({
    text: z.boolean(),
    video: z.boolean(),
  }),
  thankyou: z.object({
    title: z.string()
      .min(4, { message: "Thank you title should be more than 4 characters" })
      .max(100, { message: "Thank you title should be less than 100 characters" }),
    description: z.string()
      .min(4, { message: "Thank you description should be more than 4 characters" })
      .max(200, { message: "Thank you description should be less than 200 characters" }),
  }),
  userInformation: z.object({
    company: z.boolean(),
    email: z.boolean(),
    firstName: z.boolean(),
    lastName: z.boolean(),
    jobTitle: z.boolean(),
    userPhoto: z.boolean(),
  }),
});

