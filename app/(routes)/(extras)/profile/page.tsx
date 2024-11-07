import React from "react";
import { Profile } from "@/components/extras/Profile";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";

export default async function Profle() {
  const session = await auth();
  const user = session?.user
  if (!user) redirect("/login")

  const userDetails = await getUserById(user.id!)
  if (!userDetails) {
    return (
      <div>Can not find your profile, maybe try logging out</div>
    )
  }

  return (
    <div>
      <Profile />
    </div>
  );
}
