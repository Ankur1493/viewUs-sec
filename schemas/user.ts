import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  email: z.string().email(),
  image: z
    .any()
    .refine((file) => file instanceof File, "Please upload an image file.")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file?.type),
      "Only .jpg or .png files are accepted."
    )
    .optional(),
});
