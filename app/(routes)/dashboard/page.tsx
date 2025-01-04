import { auth } from "@/auth";
import { getUserDetailsById } from "@/data/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "View Us - dashboard",
  description:
    "Viewus helps you to easily collect and showcase testimonials, with easily managin everything at one place.",
};

export default async function DashboardPage() {


  const session = await auth();
  const user = session?.user
  if (!user) {
    redirect("/login")
  }

  const userDetails = await getUserDetailsById(user.id!)

  if (userDetails?.spaces.length === 0) {
    return redirect("/onboarding")
  } else {
    return redirect(`/space/${userDetails?.spaces[0].slug}`)
  }
}
