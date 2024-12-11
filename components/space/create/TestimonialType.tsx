"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSpaceDataStore } from "@/store/useSpaceDataStore";
import { WrittenTestimonialPreview } from "./preview/WrittenTestimonialPreview";
import { VideoReviewPreview } from "./preview/VideoReviewPreview";
import { Menu, X } from "lucide-react";

export const TestimonialType = ({
  slug,
  page,
}: {
  slug?: string | undefined;
  page: "edit" | "create";
}) => {
  const router = useRouter();

  const {
    coverPage,
    testimonialType,
    setTestimonialType,
    testimonialPageType,
  } = useSpaceDataStore();
  const [preferred, setPreferred] = useState<"text" | "video">(
    testimonialType.text ? "text" : "video"
  );
  const initializeSpaceData = useSpaceDataStore(
    (state) => state.initializeSpaceData
  );

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    initializeSpaceData();
    console.log("runned");
    console.log(coverPage);
  }, [initializeSpaceData]);

  return (
    <div className="relative w-full pl-2 max-h-screen h-[85vh] lg:flex justify-center overflow-hidden gap-4">
      <div
        className="absolute lg:hidden right-0 z-50"
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? <Menu /> : <X />}
      </div>
      <div
        className={cn(
          " h-full space-y-6 px-6 pt-5 overflow-y-auto flex items-center justify-center lg:items-start",
          isHidden ? "hidden lg:block" : ""
        )}
      >
        <div className="flex-grow max-w-[448px] md:h-full flex flex-col justify-center lg:justify-start">
          <h2 className=" text-2xl md:text-[36px] font-medium md:leading-9 py-3 md:py-0">
            What kind of testimonial are you looking for?
          </h2>
          <p className="text-sm md:text-[16px] font-normal md:pt-4 ">
            This determines which type of testimonial we&apos;ll ask your
            customers to leave first.{" "}
          </p>
          <div className="flex flex-col gap-2 py-4 ">
            <Card
              className={cn(
                preferred === "text" && "border border-[#71D4FF]",
                "cursor-pointer w-full"
              )}
              onClick={() => {
                setTestimonialType({ text: true, video: false });
                setPreferred("text");
              }}
            >
              <CardHeader>
                <CardTitle className="font-medium text-[16px] md:text-[20px]">
                  I prefer something written
                </CardTitle>
                <CardDescription className="text-[#5C5D5E] font-normal text-sm md:text-[14px]">
                  Written testimonials can be upto 500 characters long.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <Card
            className={cn(
              preferred === "video" && "border border-[#71D4FF]",
              "cursor-pointer"
            )}
            onClick={() => {
              setTestimonialType({ text: false, video: true });
              setPreferred("video");
            }}
          >
            <CardHeader>
              <CardTitle className="font-medium text-[16px] md:text-[20px]">
                I prefer recorded testimonial
              </CardTitle>
              <CardDescription className="text-[#5C5D5E] font-normal text-sm md:text-[14px]">
                Video can be uploaded upto 2 minutes.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="md:flex-1 h-full md:relative">
        <div className="md:absolute md:inset-0 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {preferred === "text" ? (
              <WrittenTestimonialPreview
                title={testimonialPageType.title}
                description={testimonialPageType.description}
                tags={testimonialPageType.tags}
                questionHeader={testimonialPageType.questionHeader}
                questions={testimonialPageType.questions}
              />
            ) : (
              <VideoReviewPreview
                title={testimonialPageType.title}
                tags={testimonialPageType.tags}
                questionHeader={testimonialPageType.questionHeader}
                questions={testimonialPageType.questions}
              />
            )}
          </div>
          <div className="p-4 flex justify-center items-center">
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  if (page === "create") router.push("/space/create?page=3");
                  else router.push(`/space/${slug}/edit?page=3`);
                }}
                variant="outline"
                className="border-[#DDDEDF] rounded-full px-12 md:px-20 py-4"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="form"
                onClick={() => {
                  if (page === "create") router.push("/space/create?page=5");
                  else router.push(`/space/${slug}/edit?page=5`);
                }}
                className="px-12 md:px-20 py-4"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
