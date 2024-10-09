import { auth } from "@/auth"
import { VerificationButton } from "@/components/auth/VerificationButton";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";

export default async function VerifyPage() {
  const session = await auth();
  const user = session?.user
  if (!user) {
    return redirect("/login")
  }
  const userDetails = await getUserById(user.id!)
  if (userDetails && userDetails.emailVerified) {
    redirect("/dashboard")
  }

  //todo ---- add rate limiting on this sending verification mail

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      sending verification Link to {user.email}
      <VerificationButton email={user.email!} />
    </div>
  )
}
