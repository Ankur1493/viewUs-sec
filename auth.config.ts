import Credenitals from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import bcrypt from "bcryptjs"
import { loginSchema } from "./schemas/login";
import { getUserByEmail } from "./data/user";

export default {
  providers: [Credenitals({
    async authorize(credentials) {
      const validatedFields = loginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const passwordsMatched = await bcrypt.compare(password, user.password);

        if (passwordsMatched) {
          return user;
        }
      }
      return null;

    }
  }),
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true
  })
  ],
} satisfies NextAuthConfig
