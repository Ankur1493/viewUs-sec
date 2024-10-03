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
import { Starred } from "../starred/Starred";
import useReviewPageStore from "@/store/useReviewPageStore";
import { ArrowLeft } from "lucide-react";

export const TextReviewCard = ({
  questions,
  image,
}: {
  questions: Question[];
  image: string | null;
}) => {
  const {
    setReviewButton,
    detailsButton,
    setDetailsButton,
    textReview,
    setTextReview,
  } = useReviewPageStore();
  return (
    <Card className="relative w-[450px] px-[2%]">
      <div className="absolute top-2 right-2">
        {" "}
        <Button
          variant="outline"
          onClick={() => {
            setReviewButton("");
          }}
          className="shadow-md"
        >
          <ArrowLeft size={24} />
        </Button>
      </div>
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src={image!}
            alt="logo"
            height={80}
            width={80}
            className="rounded-full"
          />
        </div>

        <CardTitle className="text-center text-[#33313B]">
          Write a Text Testimonial
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-1">
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
            className="w-full border border-gray-400 rounded-lg h-28 p-3 text-base"
            placeholder="Give a Text Review"
            value={textReview}
            onChange={(e) => setTextReview(e.target.value)}
          ></textarea>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full"
          disabled={!textReview.trim()}
          onClick={() => {
            setDetailsButton(!detailsButton);
          }}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};
