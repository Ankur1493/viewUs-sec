"use server"
import { getEmailVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuid } from "uuid"
import { db } from "@/lib/db";
import { sendForgetVerificationToken, sendVerificationMail } from "./mail";

export const generateVerificationTokens = async (email: string) => {

  const existingToken = await getEmailVerificationTokenByEmail(email)
  if (existingToken) {
    const isTokenStillValid = (token: { expires: Date }) => {
      if (!token.expires) return false;
      const now = new Date();
      const expirationTime = new Date(token.expires);
      const timeDifference = expirationTime.getTime() - now.getTime();
      const minutesDifference = timeDifference / (1000 * 60);
      return minutesDifference > 59;
    }

    if (isTokenStillValid(existingToken)) {
      console.log("bhej to dia bc")
      return null;
    }

    // Delete the existing token if it's expired
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
  sendVerificationMail({ email: verificationToken.email, token: verificationToken.token })

  return verificationToken
}

export const generatePasswordResetVerificationTokens = async (email: string) => {

  const existingToken = await getEmailVerificationTokenByEmail(email)
  if (existingToken) {
    const isTokenStillValid = (token: { expires: Date }) => {
      if (!token.expires) return false;
      const now = new Date();
      const expirationTime = new Date(token.expires);
      const timeDifference = expirationTime.getTime() - now.getTime();
      const minutesDifference = timeDifference / (1000 * 60);
      return minutesDifference > 29;
    }

    if (isTokenStillValid(existingToken)) {
      console.log("bhej to dia bc")
      return null;
    }

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
  sendForgetVerificationToken({ email: verificationToken.email, token: verificationToken.token })

  return verificationToken
}
