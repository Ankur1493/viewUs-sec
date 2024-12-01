import { getUserSpaces } from "@/actions/space";
import { auth } from "@/auth";
import { FrownIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { SpaceCard } from "./SpaceCard";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { UpdatesNotificationCard } from "../extras/UpdatesNotificationCard";
import { Suspense } from "react";

export const SpacesListed = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return redirect("/login");
  }

  const userSpaces = await getUserSpaces(user.id!);

  if (userSpaces?.length === 0 || !userSpaces) {
    return (
      <Card className=" h-64 border-dashed flex flex-col justify-center items-center  hover:bg-gray-50 transition-colors duration-200">
        <CardContent className="flex justify-center items-center ">
          <div className="bg-[#E9F8FF] w-[80px] h-[80px] rounded-full flex justify-center items-center mx-6">
            <FrownIcon color="#009EE2" size={30} />
          </div>
          <h1 className="text-3xl font-medium">You have no project yet</h1>
        </CardContent>
        <Link href="/space/create">
          <Button className="rounded-3xl  text-md font-medium py-5 px-8">Get started now</Button>
        </Link>
      </Card>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-4xl font-medium">Active Projects</h1>
        {userSpaces?.map((space) => (
          <SpaceCard key={space.id} {...space} />
        ))}
      </div>
      <Suspense fallback={
        <div>{/*show a card here*/}</div>
      }>
        <UpdatesNotificationCard
          message="We have launched the extensions feature, 
          now you can easily import your testimonials from 
          social media platforms in a blink of an eye"
          imageUrl="/assets/images/test1.webp"
        />
      </Suspense>
    </>);
};
