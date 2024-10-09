import { db } from "@/lib/db"

export const getEmailVerificationTokenByToken = async (token: string) => {
  try {

    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    })
    return verificationToken
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getEmailVerificationTokenByEmail = async (email: string) => {
  try {

    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    })
    return verificationToken
  } catch (err) {
    console.log(err)
    return null
  }
}
