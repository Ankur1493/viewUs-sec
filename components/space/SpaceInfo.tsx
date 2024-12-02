import { Video, MessageSquare, Import } from "lucide-react";
import Link from "next/link";
import { SpaceEditButton } from "../dashboard/SpaceEditButton";
import { Space } from "@prisma/client";
import { SpaceDeleteButton } from "../dashboard/SpaceDeleteButton";
import { SpaceCopyButton } from "../dashboard/SpaceCopyButton";

interface SpaceInfoProps {
  space: Space;
  testimonialCounts: {
    total: number;
    text: number;
    video: number;
    imported: number;
  };
}

export default function SpaceInfo({
  space,
  testimonialCounts,
}: SpaceInfoProps) {
  return (
    <header className="w-full space-y-1 lg:space-y-0 justify-between items-center mt-6  pr-6  py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold">{space.name}</h1>
            <p className="text-sm text-gray-400  px-0 mx-0">
              Public Url:{" "}
              <Link
                href={`http://localhost:3000/a/${space.slug}`}
                className="underline underline-offset-4 hover:text-gray-500"
              >
                {`http://localhost:3000/a/${space.slug}`}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center space-x-4">
          <div className="w-full flex items-end justify-end">
            <div className="w-fit flex justify-center items-center space-x-2 border rounded-md p-1">
              <div className="w-7 h-7 flex justify-center items-center hover:bg-gray-100 rounded-md">
                <SpaceEditButton slug={space.slug} />
              </div>
              <div className="w-7 h-7 flex justify-center items-center hover:bg-gray-100 rounded-md">
                <SpaceDeleteButton spaceId={space.id} />
              </div>
              <div className="w-7 h-7 flex justify-center items-center  hover:bg-gray-100 rounded-md cursor-pointer">
                <SpaceCopyButton slug={space.slug} />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {testimonialCounts?.video && (
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                <Video className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  {testimonialCounts.video}
                </span>
              </div>
            )}
            {testimonialCounts?.text && (
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                <MessageSquare className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  {testimonialCounts.text}
                </span>
              </div>
            )}
            {testimonialCounts?.imported && (
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                <Import className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  {testimonialCounts.text}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
