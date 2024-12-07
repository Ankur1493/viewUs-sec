import { Video, MessageSquare, Import } from "lucide-react";
import Link from "next/link";
import { SpaceEditButton } from "../dashboard/SpaceEditButton";
import { Space } from "@prisma/client";
import { SpaceDeleteButton } from "../dashboard/SpaceDeleteButton";
import { SpaceCopyButton } from "../dashboard/SpaceCopyButton";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { Separator } from "../ui/separator";

interface SpaceInfoProps {
  space: Space;
  extraTextReviews: number;
  extraVideoReviews: number;
  testimonialCounts?: {
    total: number;
    text: number;
    video: number;
    imported: number;
  };
}

export default function SpaceInfo({
  extraTextReviews,
  extraVideoReviews,
  space,
  testimonialCounts,
}: SpaceInfoProps) {
  return (
    <header className="w-full flex flex-col gap-4 space-y-1 lg:space-y-0 justify-between mt-6 py-3">
      <div className="w-full mx-auto flex items-start md:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold">{space.name}</h1>
            <p className="text-sm text-gray-400  px-0 mx-0">
              <Link
                href={`http://localhost:3000/a/${space.slug}`}
                className="underline underline-offset-4 hover:text-gray-500 flex  items-center justify-center gap-1"
              >
                <ExternalLink size={15} />
                {`http://localhost:3000/a/${space.slug}`}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start space-x-4">
          <div className="w-full flex items-end justify-end">
            <div className="flex justify-center items-center space-x-2 border rounded-md p-1">
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
        </div>
      </div>
      <Separator className="mt-2" />
      {extraTextReviews > 0 ||
        (extraVideoReviews > 0 && <Separator className="my-2" />)}
      <div className="flex justify-between">
        <div className="flex items-start space-x-4">
          {testimonialCounts?.video && testimonialCounts?.video >= 0 && (
            <div className="flex items-center space-x-1 text-sm">
              <Video className="w-4 h-4 text-blue-500" />
              <span>{testimonialCounts.video}</span>
            </div>
          )}
          {testimonialCounts?.text && testimonialCounts?.text >= 0 && (
            <div className="flex items-center space-x-1 text-sm">
              <MessageSquare className="w-4 h-4 text-green-500" />
              <span>{testimonialCounts.text}</span>
            </div>
          )}
          {testimonialCounts?.imported && testimonialCounts?.imported >= 0 && (
            <div className="flex items-center space-x-1 text-sm">
              <Import className="w-4 h-4 text-yellow-500" />
              <span>{testimonialCounts.imported}</span>
            </div>
          )}
        </div>
        <div>
          {extraTextReviews > 0 && (
            <div className="flex gap-2 items-center">
              <p className="text-sm text-muted-foreground">
                You have {extraTextReviews} more text reviews.
              </p>
              <Button variant="main">✨ Upgrade Now</Button>
            </div>
          )}
          {extraVideoReviews > 0 && (
            <div className="flex gap-2 items-center">
              <p className="text-sm text-muted-foreground">
                You have {extraVideoReviews} more video reviews.
              </p>
              <Button variant="main">✨Upgrade Now</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
