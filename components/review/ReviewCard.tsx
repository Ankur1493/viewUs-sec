"use client";

import Image from "next/image";
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
      {(detailsButton || submitButton) && (
        <div className="absolute top-5 left-5 flex items-center gap-3">
          <Image
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
          />
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
        <Card className="max-w-[700px] px-[2%] border-none flex flex-col gap-4 shadow-none">
          <CardHeader className="flex flex-row gap-3">
            <div className="flex">
              <Image
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
              />
            </div>

            <CardTitle className="text-center text-[#33313B] text-4xl font-normal flex items-center">
              {reviewForm.name.toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[#33313B] font-nromal text-5xl">
              {reviewForm.details
                ? reviewForm.details.coverPageTitle
                : "Leave us a Testimonial"}
            </div>
            <div className="mt-5">
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
                  : "Tell us about your experience",
              }}
            >
              {reviewForm.details ? reviewForm.details.coverPageBtnText : "T"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
