import z from "zod"

export const textReviewSchema = z.object({
  stars: z.number().min(1).max(5),
  review: z.string().min(30, { message: "review should be atleast 20 characters long" }).max(1000, { message: "review should be atleast 20 characters long" }),
  firstName: z.string().nullable().optional().default(null),
  lastName: z.string().nullable().optional().default(null),
  email: z.string().email(),
  jobTitle: z.string().nullable().optional().default(null),
  company: z.string().nullable().optional().default(null),
  tags: z.array(z.string()).optional()
})

export const videoReviewSchema = z.object({
  stars: z.number().min(1).max(5),
  firstName: z.string().nullable().optional().default(null),
  lastName: z.string().nullable().optional().default(null),
  email: z.string().email(),
  jobTitle: z.string().nullable().optional().default(null),
  company: z.string().nullable().optional().default(null),
  tags: z.array(z.string()).optional()
})
