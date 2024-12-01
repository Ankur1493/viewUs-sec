import { Space } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Import, Pencil, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      className="w-[90%] lg:w-1/3  bg-gray-50 text-black shadow-sm hover:shadow-md transition-all duration-200 group"
    >
      <Link href={`/space/${space.slug}`}>
        <CardHeader className="flex-row gap-1 justify-start w-full  items-center group-hover:gap-2 transition-all duration-300">
          <Image
            src={`https://d3eyp937ijscg0.cloudfront.net/space/${space.slug}-${space.name}-logo`}
            height={100}
            width={100}
            alt=""
            className="w-[40px] rounded-full"
          />
          <CardTitle className="text-3xl">{space.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 w-[70%] text-sm text-muted-foreground">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Video />
                <p>Video Testimonials :- </p>
              </div>
              <p className="text-lg">{space.reviewCounts.video}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Pencil />
                <p>Written Testimonials :- </p>
              </div>
              <p className="text-lg">{space.reviewCounts.text}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Import />
                <p>Imported Testimonials :- </p>
              </div>
              <p className="text-lg p-0">{space.reviewCounts.imported}</p>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
