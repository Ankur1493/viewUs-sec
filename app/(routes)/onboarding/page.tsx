import { auth } from "@/auth"
import { Onboarding } from "@/components/dashboard/Onboarding"
import { getUserDetailsById } from "@/data/user"
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth();
  const user = session?.user

  if (!user) {
    redirect("/login")
  }

  const userDetails = await getUserDetailsById(user.id!)
  if (userDetails && userDetails?.spaces.length > 0) redirect(`/space/${userDetails?.spaces[0].slug}`)

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Onboarding />
    </div>
  )
}
