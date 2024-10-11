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
import { Question } from "@prisma/client";
import { Starred } from "./Starred";
import useReviewPageStore from "@/store/useReviewPageStore";
import { Video } from "lucide-react";

export const TextReviewCard = ({
  questions,
  image,
  title
}: {
  questions: Question[];
  image: string | null;
  title: string;
}) => {
  const {
    detailsButton,
    setDetailsButton,
    textReview,
    setTextReview,
    setReviewButton,    
  } = useReviewPageStore();
  return (
    <Card className="relative w-[90%] h-[95%] px-[2%] border-none shadow-none flex flex-col gap-4">

        <CardHeader className="flex flex-row gap-3">
            <div className="flex">
              <Image
                src={image!}
                alt="logo"
                height={50}
                width={50}
                className="rounded-xl"
              />
            </div>

            <CardTitle className="text-center text-[#33313B] text-3xl font-normal flex items-center">
              {title.toUpperCase()}
            </CardTitle>
        </CardHeader>
        <div className="flex flex-row">
      <div className="basis-2/3">
      <CardContent className="pb-1 w-[85%]">
        <div className="text-[#33313B] font-nromal text-4xl">
              Write a testimonial
            </div>
        <div className="mt-3">
          <ul>
            {questions.map((q: Question) => (
              <li key={q.id}>Q. {q.question} ?</li>
            ))}
          </ul>
        </div>
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
        </div>
      </CardContent>
      <CardFooter className="w-[85%] flex justify-between">
        {/* <Button
          className="w-full"
          disabled={!textReview.trim()}
          onClick={() => {
            setDetailsButton(!detailsButton);
          }}
        >
          Next
        </Button> */}
          <Button
            variant="link"
            className="text-black text-md px-0"
            onClick={() => {
              setReviewButton("")       
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="form"
            className="text-sm p-0 py-2 px-4"
            onClick={() => {
              // setSubmitButton(!submitButton);
            }}
          >
            Continue
          </Button>
      </CardFooter>
      </div>
      <div className="basis-1/3 flex flex-col gap-5">
        <Card className="w-3/4 flex flex-col items-center">
          <CardHeader className="flex flex-col justify-center items-center gap-3">
            <div className="flex p-4 bg-[#E9F8FF] rounded-full">
              <Video color="#009EE2"  />
            </div>

            <CardTitle className="text-center text-[#33313B] text-md font-normal flex items-center">
              Or record a one minute video
            </CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col">
        <Button
          className="border-[#71D4FF] text-black border-2 rounded-3xl"
          variant="outline"
          onClick={() => {
            setReviewButton("Video");
          }}
        >
          Record Video Testimonial
        </Button>
      </CardFooter>
        </Card>
        <div className="w-3/4 flex flex-col gap-4">
        <div className="text-2xl font-semibold">Tips for getting started</div>
        <div className="flex gap-6">
          <div className="inline-block"><p className="w-10 h-10 flex items-center justify-center bg-[#EAEBEC] rounded-full">1</p></div>
          <div>
            <p className="text-xl">Start with an intro</p>
            <p className="text-sm font-light text-justify">Give some background on your role and how you used our product.</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="inline-block"><p className="w-10 h-10 flex items-center justify-center bg-[#EAEBEC] rounded-full">2</p></div>
          <div>
            <p className="text-xl">Reflect on your experience</p>
            <p className="text-sm font-light text-justify">{"We've provided some questions to help you get started."}</p>
            <ul className="list-disc pl-6 space-y-2 my-6">
              <li className="text-sm text-justify">What problems did we help you solve?</li>
              <li className="text-sm text-justify">What have you been able to achieve since using our product/service?</li>
              <li className="text-sm text-justify">What has exceeded your expectations or surprised you the most?</li>
              <li className="text-sm text-justify">What would you tell someone considering our product/service?</li>
              <li className="text-sm text-justify">Who would you recommend us to?</li>
            </ul>
          </div>
        </div>
        </div>
</div>
</div>
    </Card>
  );
};
