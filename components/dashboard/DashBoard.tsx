import { Suspense } from "react";
import { Button } from "../ui/button";
import { SpacesListed } from "@/components/dashboard/SpacesListed";
import { SpacesLoadingSkeleton } from "../loaders/SpacesLoadingSkeleton";
import Link from "next/link";

export const DashBoard = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-[90%]">
        <div className="flex flex-row flex-wrap w-[90%] lg:w-full space-y-6 lg:space-y-0 justify-between items-center mt-12 bg-gray-50 p-6 rounded-md border">
          <span className="font-medium">
            Start collecting testimonials in as little as 5 minutes.
          </span>
          <Link href="/space/create">
            <Button className="rounded-3xl py-5 px-8">Create Project</Button>
          </Link>
        </div>
        <div className="w-full pt-12">
          <Suspense fallback={<SpacesLoadingSkeleton />}>
            <SpacesListed />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
