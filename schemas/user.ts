import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  email: z.string().email(),
  image: z
    .any()
    // Server-side file validation workaround
    .refine(
      (file) => {
        // Check for file existence and required properties (assuming Node.js)
        return file && typeof file === "object" && file.arrayBuffer && file.type;
      },
      "Please upload an image file."
    )
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file?.type),
      "Only .jpg or .png files are accepted."
    )
    .optional().nullable(),
});
