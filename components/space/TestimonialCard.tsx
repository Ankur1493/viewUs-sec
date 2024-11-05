"use client"

import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Import, Pencil, Video } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion'
import starsSelected from "@/public/assets/images/star_selected.png";
import twitter from "@/public/assets/images/twitter_logo.png";
import linkedIn from "@/public/assets/images/linkedIn_logo.png";
import productHunt from "@/public/assets/images/ProductHunt_logo.png";
import profile from "@/public/assets/images/avatar.webp";
import { IReview, ReviewType } from "./ManageTestimonials";
import { TestimonialLikeButton } from "@/components/space/TestimonialLikeButton";
import { TestimonialDeleteButton } from "./TestimonialDeleteButton";
import { TestimonialShareButton } from "./TestimonialShareButton";
import { useState, useRef } from "react";
import { useMeasure } from 'react-use'

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


  const [isExpanded, setIsExpanded] = useState(false)
  const [ref, { height }] = useMeasure<HTMLDivElement>()
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const numberOfStars = testimonial.stars ?? 0;
  const reviewTypeLabel: ImportedReviewType =
    importedReviewTypeLabels[
    testimonial.importedReviewType as keyof typeof importedReviewTypeLabels
    ];

  return (
    <AnimatePresence initial={false} key={testimonial._id!}>
      <Card
        onClick={toggleExpand}
        key={testimonial._id}
        className="w-[98%] bg-gray-50 text-black shadow-sm hover:shadow-sm hover:shadow-sky-200 duration-200 group cursor-pointer"
      >
        <CardHeader className="flex flex-row pb-0 justify-between">
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
                      ? `https://d3eyp937ijscg0.cloudfront.net/${testimonial.image}`
                      : profile
                  }
                  alt="profile"
                  width={100}
                  height={100}
                  className="h-[50px] w-[50px] rounded-full"
                />
              )}
              <div className="flex flex-col gap-1">
                <h1 className="pl-1 text-xl">
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
          {testimonial.importedImage && testimonial?.importedImage[0]?.length > 0 ?
            <Image
              src={testimonial.importedImage[0]}
              alt={`${testimonial.importedReviewType} image`}
              width={500}
              height={500}
              className="w-[250px] h-[200px]"
            />
            :
            testimonial.importedVideo && testimonial?.importedVideo[0]?.length > 0 && (
              <video src={testimonial.importedVideo[0]} autoPlay muted controls className="w-[350px] h-[200px]" />
            )
          }
          <div className="flex items-center gap-1 p-0">
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center ">
              {testimonial.reviewType === ReviewType.TEXT ? (
                <div className="bg-[#E9F8FF] w-[30px] h-[30px] flex justify-center items-center rounded-full ">
                  <Pencil color="#009EE2" size={15} />
                </div>
              ) : testimonial.reviewType === ReviewType.VIDEO ? (
                <div className="bg-[#E9F8FF] w-[50px] h-[50px] flex justify-center items-center rounded-full ">
                  <Video color="#009EE2" size={15} />
                </div>
              ) : testimonial.reviewType === ReviewType.IMPORTED ? (
                <Image
                  src={importedReviewTypeImages[reviewTypeLabel]}
                  alt={reviewTypeLabel}
                  width={30}
                  height={30}
                  className="object-cover"
                />
              ) : (
                <Import color="#009EE2" size={25} />
              )}
            </div>

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


        </CardHeader>
        <CardContent className="flex-row w-full  items-center">
          <p className="text-md tracking-wide text-justify font-medium">
            {testimonial.review}
          </p>
          <motion.div
            animate={{ height: isExpanded ? height : 0 }}
            initial={false}
            transition={{
              type: "tween",
              damping: 30,
              stiffness: 300
            }}
            style={{ overflow: "hidden" }}
          >
            <div ref={ref}>
              <div ref={contentRef} className="flex justify-between items-center pt-4">
                <div className="flex flex-row gap-3">
                  {testimonial.tags?.map((tag, index) => (
                    <p key={index} className="text-sm bg-sky-200 px-3 p-1 rounded-md">{tag}</p>
                  ))}
                </div>
                <div>
                  {testimonial.createdAt?.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </AnimatePresence>
  );
};
