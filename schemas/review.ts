import z from "zod"

export const textReviewSchema = z.object({
  stars: z.number().min(1).max(5),
  review: z.string().min(20, { message: "review should be atleast 20 characters long" }).max(500, { message: "review should be atleast 20 characters long" }),
  name: z.string().min(2, { message: "name should be atleast 2 characters long" }),
  email: z.string().email(),
  image: z.string().nullable().optional().default(null),
  designation: z.string().nullable().optional().default(null)
})
