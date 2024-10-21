"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

import useReviewPageStore from "@/store/useReviewPageStore";
import { Starred } from "./Starred";
import { VideoRecorder } from "./VideoRecorder";

export const VideoReviewCard = ({
  image,
  title,
}: {
  image: string | null;
  title: string;
}) => {
  const { setSubmitButton, submitButton, setReviewButton } =
    useReviewPageStore();

  return (
    <Card className="relative w-[80%] h-[95%] px-[2%] border-none shadow-none flex flex-col">
      <div className="flex flex-col">
        <CardHeader className="flex flex-row gap-3">
          <div className="flex">
            <Image
              src={
                image !== null
                  ? image
                  : "https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
              }
              alt="logo"
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>

          <CardTitle className="text-center text-[#33313B] text-3xl font-normal flex items-center">
            {title.toUpperCase()}
          </CardTitle>
        </CardHeader>
      </div>
      <div className="flex flex-row mt-0">
        <div className="flex flex-col gap-2 basis-8/12">
          <div>
            <div className="text-[#33313B] font-nromal text-4xl px-[2%]">
              Record a video testimonial
            </div>
            <div className="px-[2%] mt-4">
              <Starred />
            </div>
          </div>
          <CardContent className="pb-1 w-[85%]">
            <div>
              <VideoRecorder />
            </div>
          </CardContent>
        </div>
        <div className="basis-2/6 flex flex-col gap-6 mb-12">
          <div className="text-[24px] font-[500]">Tips for getting started</div>
          <div className="flex gap-6">
            <div className="inline-block">
              <p className="w-[28px] h-[28px] flex items-center justify-center bg-[#EAEBEC] rounded-full text-[12px]">
                1
              </p>
            </div>
            <div>
              <p className="text-[16px] font-[500]">Start with an intro</p>
              <p className="text-[14px] font-[400] text-justify">
                Give some background on your role and how you used our product.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="inline-block">
              <p className="w-[28px] h-[28px] flex items-center justify-center bg-[#EAEBEC] rounded-full text-[12px]">
                2
              </p>
            </div>
            <div>
              <p className="text-[16px] font-[500]">
                Reflect on your experience
              </p>
              <p className="text-[14px] font-[400] text-justify">
                {"We've provided some questions to help you get started."}
              </p>
              <ul className="list-disc pl-6 space-y-1 my-[16px] text-[14px] text-justify">
                <li>What problems did we help you solve?</li>
                <li>
                  What have you been able to achieve since using our
                  product/service?
                </li>
                <li>
                  What has exceeded your expectations or surprised you the most?
                </li>
                <li>
                  What would you tell someone considering our product/service?
                </li>
                <li>Who would you recommend us to?</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="link"
              className="text-black text-[14px] px-0 hover:text-gray-800"
              onClick={() => {
                setReviewButton("Text");
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="form"
              className="text-[14px] p-0 py-2 px-4"
              onClick={() => {
                setSubmitButton(!submitButton);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
