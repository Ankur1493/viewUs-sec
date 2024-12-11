"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewForm } from "@/types";
import useReviewPageStore from "@/store/useReviewPageStore";
import { TextReviewCard } from "./TextReviewCard";
import { VideoReviewCard } from "./VideoReviewCard";
import { CustomerDetailCard } from "./CustomerDetailCard";
import { ThankYouCard } from "./ThankYouCard";

export default function ReviewCard({ reviewForm }: { reviewForm: ReviewForm }) {
  const { reviewButton, setDetailsButton, detailsButton, submitButton } =
    useReviewPageStore();

  return (
    <>
      {(detailsButton ||
        submitButton ||
        reviewButton === "Text" ||
        reviewButton === "Video") && (
        <div className="absolute top-2 left-6 md:top-6 md:left-8  lg:left-[170px] lg:top-[40px] flex items-center gap-3 z-10">
          {/* <Image
            src={
              reviewForm.details
                ? reviewForm.details.coverPageImageUrl !== null
                  ? reviewForm.details.coverPageImageUrl
                  : "https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
                : "https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
            }
            alt="logo"
            height={40}
            width={40}
            className="rounded-full"
          /> */}
          <CardTitle className="text-[#33313B] text-[24px] font-normal">
            {reviewForm.name.toUpperCase()}
          </CardTitle>
        </div>
      )}
      {submitButton ? (
        <ThankYouCard reviewForm={reviewForm} />
      ) : reviewButton === "Text" ? (
        <TextReviewCard reviewForm={reviewForm} />
      ) : detailsButton ? (
        <CustomerDetailCard reviewForm={reviewForm} />
      ) : reviewButton == "Video" ? (
        <VideoReviewCard reviewForm={reviewForm} />
      ) : (
        <Card className="md:max-w-[600px] lg:max-w-[700px] px-[2%] border-none flex flex-col gap-4 shadow-none">
          <CardHeader className="flex flex-row gap-3">
            <div className="flex">
              {/* <Image
                src={
                  reviewForm.details
                    ? reviewForm.details.coverPageImageUrl !== null
                      ? reviewForm.details.coverPageImageUrl
                      : "https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
                    : "https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
                }
                alt="logo"
                height={60}
                width={60}
                className="rounded-full"
              /> */}
              <CardTitle className="text-[#33313B] text-[24px] font-normal">
                {reviewForm.name.toUpperCase()}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-[#33313B] font-nromal text-3xl md:text-5xl">
              {reviewForm.details
                ? reviewForm.details.coverPageTitle
                : "Leave us a Testimonial"}
            </div>
            <div className="mt-5 text-sm md: text-base">
              {reviewForm.details
                ? reviewForm.details.coverPageDescription
                : "We want to share customer success stories on our website and would love for you to submit a written or video testimonial. Your feedback means a lot to us!"}
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button
              onClick={() => {
                setDetailsButton(!detailsButton);
              }}
              variant="form"
              className="opacity-100 hover:opacity-90"
              style={{
                backgroundColor: reviewForm.details
                  ? reviewForm.details.btnColor
                  : "",
              }}
            >
              {reviewForm.details
                ? reviewForm.details.coverPageBtnText
                : "Tell us about your experience"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
