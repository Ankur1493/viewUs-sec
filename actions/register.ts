"use server";
import * as z from "zod"
import { registerSchema } from "@/schemas/register";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_REGISTER_REDIRECT } from "@/route";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 14);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "email already in use" }
  }

  await db.user.create({ data: { name, email, password: hashedPassword } })

  try {
    await signIn("credentials", {
      email, password, redirectTo: DEFAULT_REGISTER_REDIRECT
    })
    return { success: "user created" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" }
        default:
          return { error: "Something went wrong" }
      }
    }
    throw error;
  }
}
