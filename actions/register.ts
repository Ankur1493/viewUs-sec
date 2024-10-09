"use server";
import * as z from "zod"
import { registerSchema } from "@/schemas/register"

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }
  const { name, email, password } = validatedFields.data;
  try {
    console.log({ email })
  } catch (error) {
    throw error;
  }
}
