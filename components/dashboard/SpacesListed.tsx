import { getUserSpaces } from "@/actions/space";
import { auth } from "@/auth";
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
      <div className="flex flex-col gap-[24px]">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-medium">Active Projects</h2>
        </div>
        <Card className=" h-64 border-[#5C5D5E] flex flex-col justify-center items-center">
          <CardContent className="flex justify-center items-center ">
            <h1 className="text-[18px] md:text-[24px] font-medium">
              You have no active project
            </h1>
          </CardContent>
          <Link href="/space/create">
            <Button
              variant="outline"
              className="rounded-3xl border-blueButton  text-md font-medium py-5 px-8"
            >
              Get started now
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-4xl font-medium">Active Projects</h1>
        {userSpaces?.map((space) => <SpaceCard key={space.id} {...space} />)}
      </div>
      <Suspense fallback={<div>{/*show a card here*/}</div>}>
        <UpdatesNotificationCard
          message="We have launched the extensions feature, 
          now you can easily import your testimonials from 
          social media platforms in a blink of an eye"
          imageUrl="/assets/images/test1.webp"
        />
      </Suspense>
    </>
  );
};
