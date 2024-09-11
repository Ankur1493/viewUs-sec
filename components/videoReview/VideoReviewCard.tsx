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
import Starred from "../starred/Starred";
import VideoRecorder from "./VideoRecorder";

export const VideoReviewCard = ({
  questions,
  image,
}: {
  questions: Question[];
  image: string | null;
}) => {
  return (
    <Card className="w-[450px] px-[2%]">
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
          Record a Video
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
          <VideoRecorder />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  );
};
