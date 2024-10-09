"use server";
import * as z from "zod"
import { loginSchema } from "@/schemas/login";
//import { signIn } from "@/auth";
//import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
//import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }
  const { email, password } = validatedFields.data;

  try {
    console.log({ email, password })
  } catch (error) {
    throw error;
  }
}
