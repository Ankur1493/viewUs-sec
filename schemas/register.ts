import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4).max(20),
  email: z.string().email().min(6),
  password: z.string().min(6).max(15)
})
