import { Space } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Import, Pencil, Video } from 'lucide-react';
import Link from "next/link";
import { SpaceDeleteButton } from "./SpaceDeleteButton";

interface SpaceWithReviewCount extends Space {
  reviewCounts: {
    text: number;
    video: number;
    imported: number;
  };
}

export const SpaceCard = (space: SpaceWithReviewCount) => {
  return (
    <Card
      key={space.id}
      className="lg:w-full bg-gray-50 text-black shadow-sm hover:shadow-md transition-all duration-200 group relative"
    >
      <div className="absolute top-2 right-2 flex gap-1  p-4">
        <SpaceDeleteButton spaceId={space.id} />
        <SpaceDeleteButton spaceId={space.id} />
        <SpaceDeleteButton spaceId={space.id} />
      </div>
      <Link href={`/space/${space.slug}`}>
        <CardHeader className="flex-row justify-start w-full items-center group-hover:gap-1">
          <CardTitle className="text-3xl">{space.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 w-[70%] text-sm text-muted-foreground">
            <div className="flex justify-between gap-1 items-center">
              <div className="flex gap-0.5">
                <Video size={20} />
                <p>Video - </p>
              </div>
              <p className="text-lg">{space.reviewCounts.video}</p>
            </div>
            <div className="flex justify-between gap-1 items-center">
              <div className="flex gap-0.5">
                <Pencil size={20} />
                <p>Written :- </p>
              </div>
              <p className="text-lg">{space.reviewCounts.text}</p>
            </div>
            <div className="flex justify-between gap-1 items-center">
              <div className="flex gap-0.5">
                <Import size={20} />
                <p>Imported :- </p>
              </div>
              <p className="text-lg p-0">{space.reviewCounts.imported}</p>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};


