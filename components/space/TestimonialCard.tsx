import Image from "next/image";
import { IReview, ReviewType } from "@/models/review_model";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Import, Pencil, Video } from "lucide-react";
import starsSelected from "@/public/assets/images/star_selected.png";
import twitter from "@/public/assets/images/twitter_logo.png";
import linkedIn from "@/public/assets/images/linkedIn_logo.png";
import productHunt from "@/public/assets/images/ProductHunt_logo.png";
import profile from "@/public/assets/images/avatar.webp";

const importedReviewTypeLabels = {
  0: "Twitter",
  1: "LinkedIn",
  2: "Product Hunt",
} as const;

const importedReviewTypeImages = {
  Twitter: twitter,
  LinkedIn: linkedIn,
  "Product Hunt": productHunt,
} as const;

type ImportedReviewType = keyof typeof importedReviewTypeImages;

export const TestimonialCard = ({ testimonial }: { testimonial: IReview }) => {
  const numberOfStars = testimonial.stars ?? 0;
  const reviewTypeLabel: ImportedReviewType =
    importedReviewTypeLabels[
    testimonial.importedReviewType as keyof typeof importedReviewTypeLabels
    ];

  return (
    <Card
      key={testimonial.id!}
      className="w-full  bg-gray-50 text-black shadow-sm hover:shadow-md duration-200 group"
    >
      {" "}
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2 w-[60%] text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {testimonial.reviewType === ReviewType.IMPORTED ? (
              <Image
                src={testimonial.image!}
                alt="profile"
                width={100}
                height={100}
                className="h-[50px] w-[50px] rounded-full"
              />
            ) : (
              <Image
                src={
                  testimonial?.image
                    ? `${process.env.CDN_NAME}/${testimonial.image}`
                    : profile
                }
                alt="profile"
                width={100}
                height={100}
                className="h-[50px] w-[50px] rounded-full"
              />
            )}
            <div className="flex flex-col gap-1">
              <h1 className="pl-1">
                {testimonial.firstName} {testimonial.lastName}{" "}
                {testimonial.jobTitle && testimonial.company && (
                  <span className="text-sm bg-yellow-200 px-2 bg-main p-1 rounded-md">
                    {testimonial.jobTitle}, {testimonial.company}
                  </span>
                )}
                {testimonial.jobTitle && !testimonial.company && (
                  <span className="text-sm bg-yellow-200 px-2 bg-main p-1 rounded-md">
                    {testimonial.jobTitle}
                  </span>
                )}
                {!testimonial.jobTitle && testimonial.company && (
                  <span className="text-sm bg-yellow-200 px-2 bg-main p-1 rounded-md">
                    {testimonial.company}
                  </span>
                )}
              </h1>
              <div className="flex">
                {Array.from({ length: numberOfStars }, (_, index) => (
                  <Image
                    key={index}
                    src={starsSelected}
                    alt={`Star ${index + 1}`}
                    width={20}
                    height={20}
                  />
                ))}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center ">
          {testimonial.reviewType === ReviewType.TEXT ? (
            <div className="bg-[#E9F8FF] w-[50px] h-[50px] flex justify-center items-center rounded-full ">
              <Pencil color="#009EE2" size={25} />
            </div>
          ) : testimonial.reviewType === ReviewType.VIDEO ? (
            <div className="bg-[#E9F8FF] w-[50px] h-[50px] flex justify-center items-center rounded-full ">
              <Video color="#009EE2" size={25} />
            </div>
          ) : testimonial.reviewType === ReviewType.IMPORTED ? (
            <Image
              src={importedReviewTypeImages[reviewTypeLabel]}
              alt={reviewTypeLabel}
              width={50}
              height={50}
              className="Sobject-cover"
            />
          ) : (
            <Import color="#009EE2" size={25} />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-row justify-start w-full  items-center gap-4">
        <p className="text-md tracking-wide text-justify font-medium">
          {testimonial.review}
        </p>
      </CardContent>
    </Card>
  );
};
