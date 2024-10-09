import { auth } from "@/auth"
import { VerificationButton } from "@/components/auth/VerificationButton";
import { getUserById } from "@/data/user";
import { getEmailVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { generateVerificationTokens } from "@/lib/tokens";
import { redirect } from "next/navigation";

export default async function VerifyPage({ searchParams }: { searchParams: { error: string, token: string } }) {
  const session = await auth();
  const user = session?.user
  if (!user) {
    return redirect("/login")
  }
  const { token, error } = searchParams;

  if (error) {
    return (
      <div>wrong token added
        <VerificationButton email={user.email!} />
      </div>
    )
  }

  // Logging the query parameters
  if (token) {
    const tokenVerification = await getEmailVerificationTokenByToken(token)
    if (user.email !== tokenVerification?.email) {
      return (
        <div>wrong token added
          <VerificationButton email={user.email!} />
        </div>
      )
    }
    console.log(tokenVerification)
    if (tokenVerification) {
      await db.user.update({
        where: {
          email: tokenVerification.email
        },
        data: {
          emailVerified: new Date()
        }
      })
    } else {
      return redirect("/verify?error=wrong-token")
    }
  }

  const userDetails = await getUserById(user.id!)
  if (userDetails && userDetails.emailVerified) {
    return redirect("/dashboard")
  }

  if (user.email) {
    const verificationToken = await generateVerificationTokens(user.email)
    console.log(verificationToken)
  }
  //todo ---- add rate limiting on this sending verification mail

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      sending verification Link to {user.email}
      <VerificationButton email={user.email!} />
    </div>
  )
}
