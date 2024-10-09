import { getEmailVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuid } from "uuid"
import { db } from "./db";

export const generateVerificationTokens = async (email: string) => {

  const existingToken = await getEmailVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })
  return verificationToken
}
