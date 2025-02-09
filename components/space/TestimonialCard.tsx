"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { IReview, ReviewType } from "./ManageTestimonials";
import { TestimonialLikeButton } from "@/components/space/TestimonialLikeButton";
import { TestimonialDeleteButton } from "./TestimonialDeleteButton";
import { TestimonialShareButton } from "./TestimonialShareButton";
import { VideoPlayer } from "./VideoPlayer";
import { Star } from "lucide-react";

const importedReviewTypeLabels = {
  0: "Twitter",
  1: "LinkedIn",
  2: "Product Hunt",
} as const;

const importedReviewTypeImages = {
  Twitter:
    "https://d3eyp937ijscg0.cloudfront.net/viewus_images/twitter_logo.png",
  LinkedIn:
    "https://d3eyp937ijscg0.cloudfront.net/viewus_images/linkedIn_logo.png",
  "Product Hunt":
    "https://d3eyp937ijscg0.cloudfront.net/viewus_images/ProductHunt_logo.png",
} as const;

type ImportedReviewType = keyof typeof importedReviewTypeImages;

export const TestimonialCard = ({ testimonial }: { testimonial: IReview }) => {
  // const [isExpanded, setIsExpanded] = useState(true);
  const isExpanded = true;

  const numberOfStars = testimonial.stars ?? 0;
  const reviewTypeLabel: ImportedReviewType =
    importedReviewTypeLabels[
      testimonial.importedReviewType as keyof typeof importedReviewTypeLabels
    ];

  return (
    <Card className="relative overflow-x-hidden w-full rounded-md text-black group">
      {/* <div className="absolute -bottom-3 flex items-center justify-center w-full">
          <div
            className="bg-[#E9F8FF] rounded-full w-6 h-6 flex items-center justify-center border  cursor-pointer"
            onClick={toggleExpand}
            key={testimonial._id}
          >
            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div> */}
      <CardHeader className="flex flex-row pb-0 pt-0 py-4 justify-between">
        <div className="flex flex-col gap-2 w-[60%] text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {testimonial.reviewType === ReviewType.IMPORTED ? (
              <Image
                src={testimonial.image!}
                alt="profile"
                width={100}
                height={100}
                className="h-[50px] w-[50px] rounded-full object-cover"
              />
            ) : testimonial.image ? (
              <Image
                src={`https://d3eyp937ijscg0.cloudfront.net/${testimonial.image}`}
                alt="profile"
                width={100}
                height={100}
                className="h-[50px] w-[50px] rounded-full object-cover"
              />
            ) : (
              <div className="h-[50px] w-[50px] rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                {testimonial.firstName?.[0]?.toUpperCase()}
                {testimonial.lastName?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h2 className="pl-1 text-lg lg:text-xl text-black">
                  {testimonial.firstName} {testimonial.lastName}
                </h2>
                {testimonial.jobTitle && testimonial.company && (
                  <span className="text-xs w-fit lg:text-sm pl-1">
                    {testimonial.jobTitle} at {testimonial.company}
                  </span>
                )}
                {testimonial.jobTitle && !testimonial.company && (
                  <span className="text-xs w-fit lg:text-sm pl-1">
                    {testimonial.jobTitle}
                  </span>
                )}
                {!testimonial.jobTitle && testimonial.company && (
                  <span className="text-xs w-fit md:text-sm pl-1">
                    {testimonial.company}
                  </span>
                )}
              </div>
              {/* <div className="flex">
                {Array.from({ length: numberOfStars }, (_, index) => (
                  <Image
                    key={index}
                    src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/star_selected.png"
                    alt={`Star ${index + 1}`}
                    width={20}
                    height={20}
                  />
                ))}{" "}
              </div> */}
              <div className="flex">
                {Array.from({ length: numberOfStars }, (_, index) => (
                  <Star
                    key={index}
                    className=" w-5 h-5"
                    fill="#FBBF24"
                    color="none"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {testimonial.reviewType === ReviewType.IMPORTED && (
          <div className="flex items-start gap-1 p-0">
            <div className="w-[60px] h-[60px] rounded-full flex justify-center items-center ">
              {
                // testimonial.reviewType === ReviewType.TEXT ? (
                //               <div className="bg-[#E9F8FF] w-full h-full flex justify-center items-center rounded-full ">
                //                 <Pencil color="#009EE2" size={20} />
                //               </div>
                //             ) : testimonial.reviewType === ReviewType.VIDEO ? (
                //               <div className="bg-[#E9F8FF] w-full h-full flex justify-center items-center rounded-full ">
                //                 <Video color="#009EE2" size={20} />
                //               </div>
                //             ) :
                testimonial.reviewType === ReviewType.IMPORTED ? (
                  <Image
                    src={importedReviewTypeImages[reviewTypeLabel]}
                    alt={reviewTypeLabel}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                ) : (
                  <></>
                )
              }
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent
        className={`flex-row w-full items-center overflow-x-hidden ${
          isExpanded ? "pb-2" : "pb-8"
        }`}
      >
        <p className="text-sm tracking-wide text-justify font-medium text-gray-800 pb-2">
          {testimonial.reviewType !== ReviewType.VIDEO && testimonial.review}
        </p>
        {testimonial.reviewType === ReviewType.VIDEO && (
          <VideoPlayer videoLink={testimonial.review} />
        )}
        {testimonial.importedImage &&
        testimonial?.importedImage[0]?.length > 0 ? (
          <Image
            src={testimonial.importedImage[0]}
            alt={`${testimonial.importedReviewType} image`}
            width={500}
            height={500}
            className="w-[300px] h-[200px] rounded-lg"
          />
        ) : (
          testimonial.importedVideo &&
          testimonial?.importedVideo[0]?.length > 0 && (
            <div className="w-[300px] h-[200px]">
              <video
                src={testimonial.importedVideo[0]}
                autoPlay={false}
                controls
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )
        )}
        <div style={{ overflow: "hidden" }}>
          <div>
            <div className="flex flex-col pt-4">
              <div className="flex flex-row gap-3">
                {testimonial.tags?.map((tag, index) => (
                  <p
                    key={index}
                    className="text-sm bg-[#C2F19D] px-3 p-1 rounded-md"
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <div className="flex flex-row justify-between items-end pl-1">
                <div className="text-gray-600 text-sm">
                  {testimonial.createdAt
                    ? new Date(testimonial.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : ""}
                </div>

                <div className="flex">
                  <div className="flex justify-center items-center m-0">
                    <TestimonialDeleteButton testimonialId={testimonial._id!} />
                  </div>
                  <div>
                    <TestimonialLikeButton
                      testimonialId={testimonial._id!}
                      initialLiked={testimonial.liked}
                    />
                  </div>
                  <div>
                    <TestimonialShareButton testimonial={testimonial} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
