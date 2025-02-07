"use client";
import { Video, MessageSquare, Import } from "lucide-react";
// import Link from "next/link";
import { SpaceEditButton } from "../dashboard/SpaceEditButton";
import { Space } from "@prisma/client";
import { SpaceDeleteButton } from "../dashboard/SpaceDeleteButton";
import { SpaceCopyButton } from "../dashboard/SpaceCopyButton";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
// import { ExternalLink } from "lucide-react";
// import { Separator } from "../ui/separator";

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
// const baseUrl =
//   process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
//     ? "http://localhost:3000"
//     : "https://www.viewus.in";

export default function SpaceInfo({
  extraTextReviews,
  extraVideoReviews,
  space,
  testimonialCounts,
}: SpaceInfoProps) {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && spacerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const spacerRect = spacerRef.current.getBoundingClientRect();
        setIsSticky(spacerRect.top <= 25);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={spacerRef}
      className="relative w-full flex flex-col gap-2 space-y-1 lg:space-y-0 justify-between py-3"
    >
      <div className="w-full mx-auto flex items-start md:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center">
            <h1
              ref={headerRef}
              className={cn(
                "top-0  text-3xl font-bold text-black z-50",
                isSticky
                  ? "fixed top-3 scale-75 transition-all duration-300 ease-in-out "
                  : ""
              )}
            >
              {space.name.toUpperCase()}
            </h1>
            {/* <p className="text-sm text-gray-400  px-0 mx-0">
              <Link
                href={`${baseUrl}/a/${space.slug}`}
                className="underline underline-offset-4 hover:text-gray-500 flex  items-center justify-center gap-1"
              >
                <ExternalLink size={15} />
                {`${baseUrl}/a/${space.slug}`}
              </Link>
            </p> */}
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
      {/* <Separator className="mt-2" /> */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex gap-1 items-center space-x-1 text-sm">
            <Video className="w-4 h-4 text-blue-500" />
            {testimonialCounts?.video && testimonialCounts?.video > 0 && (
              <span>
                {testimonialCounts.video +
                  (extraVideoReviews > 0 ? extraVideoReviews : 0)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <MessageSquare className="w-4 h-4 text-green-500" />
            {testimonialCounts?.text && testimonialCounts?.text > 0 && (
              <span>
                {testimonialCounts.text +
                  (extraTextReviews > 0 ? extraTextReviews : 0)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Import className="w-4 h-4 text-yellow-500" />
            {testimonialCounts?.imported && testimonialCounts?.imported > 0 && (
              <span>{testimonialCounts.imported}</span>
            )}
          </div>
        </div>
        <div>
          {extraTextReviews > 0 && (
            <div className="flex gap-2 items-center">
              <p className="text-sm text-muted-foreground">
                You have {extraTextReviews} extra text reviews. Please upgrade
                to see it 👉
              </p>
              <Button variant="main">✨ Upgrade Now</Button>
            </div>
          )}
          {extraVideoReviews > 0 && (
            <div className="flex gap-2 items-center">
              <p className="text-sm text-muted-foreground">
                You have {extraVideoReviews} extra video reviews. Please upgrade
                to see it 👉
              </p>
              <Button variant="main">✨Upgrade Now</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
