import React from "react";
import { Profile } from "@/components/extras/Profile";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";

export default async function Profle() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");

  const userDetails = await getUserById(user.id!);
  if (!userDetails) {
    return <div>Can not find your profile, maybe try logging out</div>;
  }

  return (
    <div>
      <div className="flex flex-col px-2 py-12 md:px-10 lg:px-16 w-full gap-12">
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-4xl font-bold text-black">User Profile</h1>
        </div>
        <Profile user={userDetails} />
      </div>
    </div>
  );
}
