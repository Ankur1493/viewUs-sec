import { auth } from "@/auth"
import { getUserById } from "@/data/user";
import { getEmailVerificationTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { PartyPopper, TriangleAlert } from "lucide-react";
import { VerifyCard } from "@/components/auth/VerifyCard";

export default async function VerifyPage({ searchParams }: { searchParams: { error: string, token: string } }) {
  const session = await auth();
  const user = session?.user
  if (!user) {
    return redirect("/login")
  }
  const { token, error } = searchParams;

  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="bg-[#E9F8FF] p-5 rounded-full"><TriangleAlert color="red" size={30} /></div>
        <VerifyCard title="Wrong Verification Token" content="Seems like you had entered a wrong token. Click on the link shared in the verification mail:" mail={user?.email ?? ""} />
      </div>
    )
  }

  if (token) {
    const tokenVerification = await getEmailVerificationTokenByToken(token)
    if (user.email !== tokenVerification?.email) {
      return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <div className="bg-[#E9F8FF] p-5 rounded-full"><TriangleAlert color="red" size={30} /></div>
          <VerifyCard title="Wrong Verification Token" content="Seems like you had entered a wrong token. Click on the link shared in the verification mail:" mail={user?.email ?? ""} />
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
  //todo ---- add rate limiting on this sending verification mail

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="bg-[#E9F8FF] p-5 rounded-full"><PartyPopper color="#009EE2" size={30} /></div>
      <VerifyCard title="Thanks!" content="Click on the verification link shared via email to" mail={user?.email ?? ""} />
    </div>
  )
}
