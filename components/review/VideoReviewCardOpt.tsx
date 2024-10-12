import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { VideoRecorder } from "./VideoRecorder";
import useReviewPageStore from "@/store/useReviewPageStore";

export const VideoReviewCardOpt = () => {
  const { videoButtonOpt, setVideoButtonOpt, submitButton, setSubmitButton } =
    useReviewPageStore();
  return (
    <div className="flex items-center justify-center">
      <Card className="relative border-none shadow-none flex flex-col">
        <div className="flex flex-row mt-0">
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-[#33313B] font-[500] text-[36px] px-[2%]">
                Add some video context (optional)
              </div>
              <div className="text-[#33313B] font-[00] text-[16px] leading-[24px] px-[2%]">
                People find videos more helpful than text alone.
              </div>
            </div>
            <CardContent className="pb-1 w-[85%]">
              <VideoRecorder />
            </CardContent>
            <CardFooter className="w-[85%] flex justify-between">
              <Button
                variant="link"
                className="text-black text-[14px] px-0 hover:text-gray-800"
                onClick={() => {
                  setVideoButtonOpt(!videoButtonOpt);
                }}
              >
                Back
              </Button>
              <div className="flex gap-6">
                <Button
                  type="submit"
                  variant="outline"
                  className="text-[14px] p-0 py-2 px-4 border-[#71D4FF] border-2 rounded-3xl hover:bg-[#DEF5FF]"
                  onClick={() => {
                    setSubmitButton(!submitButton);
                  }}
                >
                  Skip
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
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};
