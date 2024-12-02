"use client";

import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useReviewPageStore from "@/store/useReviewPageStore";
import { Video } from "lucide-react";
import { TagSelection } from "./TagSelection";
import { useState } from "react";
import { Starred } from "./Starred";
import { ReviewForm } from "@/types";
import { Questions } from "./Questions";

export const TextReviewCard = ({ reviewForm }: { reviewForm: ReviewForm }) => {
  //zustand state variables are called
  const {
    detailsButton,
    setDetailsButton,
    textReview,
    setTextReview,
    setReviewButton,
    submitButton,
    setSubmitButton,
    customerDetails,
    starred,
    selectedTags,
  } = useReviewPageStore();

  const [error, setError] = useState(false);

  const handleSubmitReview = async () => {
    try {
      const formData = new FormData();

      formData.append("firstName", customerDetails.firstName);
      formData.append("lastName", customerDetails.lastName);
      formData.append("email", customerDetails.email);
      formData.append(
        "spaceId",
        reviewForm.details ? reviewForm.details.spaceId : ""
      );
      if (customerDetails.company)
        formData.append("company", customerDetails?.company);
      if (customerDetails.jobTitle)
        formData.append("jobTitle", customerDetails?.jobTitle);

      formData.append("review", textReview);
      formData.append("stars", starred.toString());
      selectedTags.forEach((tag) => formData.append("tags[]", tag)); // Append each tag individually as an array

      if (customerDetails.image) {
        formData.append("image", customerDetails.image);
      }

      const response = await axios.post("/api/review/text", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success (e.g., show a success message or navigate)
      console.log("Review submitted successfully", response.data);

      setSubmitButton(!submitButton);
    } catch (err) {
      console.error("Error submitting review", err);
      setError(true);
    }
  };

  const isValid = textReview.trim().length >= 30 && starred > 0;

  return (
    <Card className="relative w-[90%] h-[95%] px-[2%] border-none shadow-none flex flex-col gap-4">
      <div className="flex flex-row">
        <div className="basis-2/3">
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
                height={40}
                width={40}
                className="rounded-full"
              />
            </div>

            <CardTitle className="text-center text-[#33313B] text-[24px] font-[500] flex items-center">
              {reviewForm.name.toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-0 w-[85%]">
            <div className="text-[#33313B] font-[500] text-[36px]">
              {reviewForm.details
                ? reviewForm.details.testimonialPageTitle
                : ""}
            </div>
            <div className="text-[#222222] font-[400] text-[16px]">
              {reviewForm.details
                ? reviewForm.details.testimonialPageDescription
                : "Thanks for taking out some time to fill a review for us, cheers!"}
            </div>
            <div className="mt-3"></div>
            <div className="mt-2">
              <Starred />
            </div>
            <div>
              <textarea
                name="textReview"
                id="text"
                className="w-full border border-gray-400 rounded-lg h-48 p-3 text-base"
                placeholder="What did you use our product for? What did you like about your experience?"
                value={textReview}
                onChange={(e) => setTextReview(e.target.value)}
                maxLength={500}
              ></textarea>
              <div className="text-left text-sm text-gray-800">
                {500 - textReview.length} / 500 characters left
              </div>
              {textReview.trim().length < 30 ? (
                <div className="text-left text-sm text-red-500">
                  Please write at least 30 characters.
                </div>
              ) : null}
            </div>
            <TagSelection reviewForm={reviewForm} />
          </CardContent>
          <CardFooter className="w-[85%] flex justify-between mt-0">
            <Button
              variant="link"
              className="text-black text-[14px] px-0 hover:text-gray-800"
              onClick={() => {
                setReviewButton("");
                {
                  reviewForm.details
                    ? reviewForm.details.testimonialTextType
                      ? setDetailsButton(!detailsButton)
                      : setReviewButton("Video")
                    : setReviewButton("Video");
                }
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="form"
              disabled={!isValid}
              className="text-[14px] p-0 py-2 px-4"
              onClick={handleSubmitReview}
            >
              Submit
            </Button>
          </CardFooter>
        </div>
        <div className="basis-1/3 flex flex-col gap-5 pt-5">
          <Card className="w-3/4 flex flex-col items-center">
            <CardHeader className="flex flex-col justify-center items-center gap-3">
              <div className="flex justify-center items-center w-[80px] h-[80px] bg-[#E9F8FF] rounded-full">
                <Video color="#009EE2" size={32} />
              </div>

              <CardTitle className="text-center text-[#33313B] text-[16px] font-normal flex items-center tracking-[2%]">
                Or record a two minute video
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col">
              <Button
                className="border-[#71D4FF] text-black border-2 rounded-3xl text-[14px] px-[24px]"
                variant="outline"
                onClick={() => {
                  setReviewButton("Video");
                }}
              >
                Record Video Testimonial
              </Button>
              {error && (
                <div className="text-sm text-red-400">
                  Failed to submit your review, Please try again
                </div>
              )}
            </CardFooter>
          </Card>
          <div className="w-3/4 ">
            <Questions reviewForm={reviewForm} />
          </div>
        </div>
      </div>
    </Card>
  );
};
