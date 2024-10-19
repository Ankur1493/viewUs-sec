import React from "react";
import { Profile } from "@/components/extras/Profile";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export default async function Profle() {
  const session = await auth();
  const userId = session?.user?.id;
  const user = userId ? await getUserById(userId) : null;
  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
