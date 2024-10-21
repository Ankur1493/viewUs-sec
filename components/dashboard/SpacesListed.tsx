import { getUserSpaces } from "@/actions/space";
import { auth } from "@/auth";
import { FrownIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { SpaceCard } from "./SpaceCard";

export const SpacesListed = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return redirect("/login");
  }

  const userSpaces = await getUserSpaces(user.id!);
  console.log({ userSpaces });

  if (userSpaces?.length === 0 || !userSpaces) {
    return (
      <div className="h-full w-full flex  justify-center items-center">
        <div className="bg-[#E9F8FF] w-[80px] h-[80px] rounded-full flex justify-center items-center mx-6">
          <FrownIcon color="#009EE2" size={30} />
        </div>
        <h1 className="text-3xl font-medium">You have no project yet</h1>
      </div>
    );
  }

  return (
    <div>
      {userSpaces?.map((space) => (
        <SpaceCard key={space.id} {...space} />
      ))}
    </div>
  );
};
