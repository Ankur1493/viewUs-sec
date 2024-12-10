"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import useReviewPageStore from "@/store/useReviewPageStore";
import { Starred } from "./Starred";
import { useState, useRef, useEffect, useCallback } from "react";
import { Video, Square, Play, Pause, Pencil, AlertCircle } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";
import { ReviewForm } from "@/types";
import { Questions } from "./Questions";
import { TagSelection } from "./TagSelection";

export const VideoReviewCard = ({ reviewForm }: { reviewForm: ReviewForm }) => {
  const {
    detailsButton,
    customerDetails,
    setSubmitButton,
    submitButton,
    setReviewButton,
    starred,
    setDetailsButton,
  } = useReviewPageStore();

  const [cameraAccessible, setCameraAccessible] = useState(true);
  const [microphoneAccessible, setMicrophoneAccessible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [startTimer, setStartTimer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // const [progress, setProgress] = useState(0);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    audio: true,
    blobPropertyBag: { type: "video/webm" },
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const resetStates = useCallback(() => {
    setIsExpanded(false);
    setCountdown(3);
    setStartTimer(false);
    setIsPlaying(false);
    // setProgress(0);
    clearBlobUrl();
    console.log("yahan aagya", mediaStream);

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      console.log("yahan bhi aagya", mediaStream);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  }, [clearBlobUrl]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraAccessible(true);
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((error) => {
        setCameraAccessible(false);
        console.error("Camera not accessible:", error.message);
      });

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setMicrophoneAccessible(true);
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((error) => {
        setMicrophoneAccessible(false);
        console.error("Microphone not accessible:", error.message);
      });
  }, []);

  const startRecord = async () => {
    setStartTimer(true);
    const timer = setInterval(async () => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStartTimer(false);
          startRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecordingVideo = () => {
    stopRecording();

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        console.log(`Stopping track: ${track.kind}`);
        track.stop();
      });
      setMediaStream(null);
    }

    if (previewStream) {
      const tracks = previewStream.getTracks();
      tracks.forEach((track) => track.stop());
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((error) => {
        console.error("Error stopping fallback stream:", error);
      });

    console.log("Recording stopped, and all tracks are released.");
  };

  const handleSubmitReview = async () => {
    console.log({ mediaBlobUrl });
    console.log(customerDetails);

    try {
      const formData = new FormData();
      formData.append("firstName", customerDetails.firstName);
      formData.append("lastName", customerDetails.lastName);
      formData.append("email", customerDetails.email);
      formData.append(
        "spaceId",
        reviewForm.details ? reviewForm.details.spaceId : ""
      );
      formData.append("stars", starred.toString());
      if (customerDetails.company)
        formData.append("company", customerDetails?.company);
      if (customerDetails.jobTitle)
        formData.append("jobTitle", customerDetails?.jobTitle);
      if (customerDetails.image)
        formData.append("image", customerDetails?.image);

      if (mediaBlobUrl) {
        try {
          // Fetch the blob from the mediaBlobUrl
          const response = await fetch(mediaBlobUrl);
          const videoBlob = await response.blob();

          // Create a File object from the Blob
          const videoFile = new File([videoBlob], "recorded-video.webm", {
            type: "video/webm",
            lastModified: new Date().getTime(),
          });

          // Append the video file to formData
          formData.append("video", videoFile);
        } catch (error) {
          console.error("Error processing video:", error);
          throw new Error("Failed to process video");
        }
      }

      const response = await axios.post("/api/review/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmitButton(!submitButton);

      console.log("Review submitted", response.data);
    } catch (err) {
      console.log("Error sumbitted Review", err);
    }
  };

  const isValid = mediaBlobUrl && starred > 0;

  return (
    <Card className="relative w-[85%] md:w-full lg:w-[85%] h-full px-[2%] border-none shadow-none flex flex-col">
      {/* <div className="flex flex-col">
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
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>

          
        </CardHeader>
      </div> */}
      <div className="flex flex-col gap-12 md:gap-0 md:flex-row mt-24 px-[2%]">
        <div className="flex flex-col gap-2 basis-8/12">
          <div>
            <div className="text-[#33313B] font-[500] text-3xl md:text-[36px]">
              {reviewForm.details
                ? reviewForm.details.testimonialPageTitle
                : ""}
            </div>
            {/* <div className="text-[#222222] font-[400] text-[16px]">
              {reviewForm.details
                ? reviewForm.details.testimonialPageDescription
                : "Thanks for taking out some time to fill a review for us, cheers!"}
            </div> */}
            <div className="mt-6">
              <Starred />
            </div>
          </div>
          <CardContent className="px-0 pb-1 w-full md:w-[90%] lg:w-[85%]">
            <div>
              <div
                className={`${
                  isExpanded
                    ? "fixed inset-0 z-10 bg-black"
                    : "w-full aspect-video"
                }`}
              >
                {!cameraAccessible ||
                status === "permission_denied" ||
                status === "no_specified_media_found" ||
                !microphoneAccessible ? (
                  <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-zinc-800 text-white text-center p-6 rounded-lg shadow-lg overflow-hidden ">
                    <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
                    <div className="space-y-2">
                      {!cameraAccessible && (
                        <p className="text-lg font-semibold">
                          Camera not accessible
                        </p>
                      )}
                      {!microphoneAccessible && (
                        <p className="text-lg font-semibold">
                          Microphone not accessible
                        </p>
                      )}
                    </div>
                    <p className="mt-4 text-sm text-zinc-400">
                      Please check your browser settings and try again
                    </p>
                  </div>
                ) : status === "recording" && previewStream ? (
                  <div
                    className={` rounded-lg overflow-hidden fixed inset-4 z-10 mb-16 flex flex-col justify-content items-center ${
                      isExpanded
                        ? "fixed inset-4 z-10 mb-16"
                        : "w-full aspect-video"
                    }`}
                  >
                    <video
                      ref={(video) => {
                        if (video && previewStream) {
                          video.srcObject = previewStream;
                        }
                      }}
                      autoPlay
                      className="object-cover w-full h-full"
                    />
                    <Button
                      onClick={stopRecordingVideo}
                      className={`absolute w-12 h-12 md:w-20 md:h-20 bg-red-500 z-20 rounded-full bottom-4 flex items-center justify-center mb-4 hover:bg-red-600 transition-colors "absolute bottom-4"`}
                    >
                      <Square className="w-5 h-5 md:w-8 md:h-8 text-white fill-white" />
                    </Button>
                  </div>
                ) : status === "stopped" ? (
                  <div
                    className={`z-10 rounded-lg overflow-hidden flex flex-col justify-content items-center ${
                      isExpanded
                        ? "fixed inset-4 z-10 mb-16"
                        : " relative w-full aspect-video"
                    }`}
                  >
                    {" "}
                    <video
                      ref={videoRef}
                      src={mediaBlobUrl}
                      onEnded={() => setIsPlaying(!isPlaying)}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-4 flex gap-2 items-center justify-center">
                      <Button
                        onClick={() => {
                          if (videoRef.current) {
                            if (isPlaying) {
                              videoRef.current.pause();
                            } else {
                              videoRef.current.play();
                            }
                            setIsPlaying(!isPlaying);
                          }
                        }}
                        className="w-12 h-12 md:w-20 md:h-20 bg-red-500 z-20 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 md:w-8 md:h-8 text-white fill-white" />
                        ) : (
                          <Play className="w-5 h-5 md:w-8 md:h-8 rounded-[2px] text-white fill-white" />
                        )}
                      </Button>
                      {isExpanded && (
                        <Button
                          onClick={startRecording}
                          className={`md:w-[160px] md:h-[50px] p-[16px] bg-white text-black rounded-[100px] flex items-center justify-center hover:bg-gray-100 transition-colors text-sm md:text-[20px] font-medium leading-6`}
                        >
                          Start Over
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`bg-zinc-700 rounded-lg overflow-hidden transition-all duration-800  ${
                      isExpanded
                        ? "fixed inset-4 z-10 mb-16"
                        : "w-full aspect-video"
                    }`}
                  >
                    <div
                      className={`relative w-full h-full flex ${
                        isExpanded ? "justify-end" : "justify-center"
                      } flex-col items-center`}
                    >
                      <Button
                        onClick={() => {
                          if (isExpanded) {
                            startRecord();
                          } else {
                            toggleExpanded();
                          }
                        }}
                        className={`w-16 h-16 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 hover:bg-red-600 transition-colors ${
                          isExpanded ? "absolute bottom-4" : ""
                        }`}
                      >
                        {startTimer ? (
                          <p className="text-white text-xl">{countdown}</p>
                        ) : (
                          <Video className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        )}
                      </Button>
                      {!isExpanded && (
                        <p className="text-white text-base md:text-lg">
                          Click here to start recording
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {isExpanded && (
                  <div className="fixed bottom-14 md:bottom-6 left-4 right-4 flex justify-center items-center">
                    {startTimer ? (
                      <p className="text-white text-sm md:text-lg">
                        {" "}
                        Your video is starting in...
                      </p>
                    ) : status === "idle" ? (
                      <p className="text-white text-sm md:text-lg">
                        Lights, camera, action!
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="absolute -bottom-12 md:bottom-0 right-0 flex gap-2">
                      <Button
                        variant="formOutline"
                        className="md:w-[120px] md:h-[36px] text-white hover:bg-transparent hover:text-gray-200 text-sm md:text-lg"
                        disabled={status === "recording" || startTimer}
                        onClick={resetStates}
                      >
                        Back
                      </Button>
                      <Button
                        variant="form"
                        className="md:w-[120px] md:h-[36px] text-sm md:text-lg"
                        disabled={status === "recording" || startTimer}
                        onClick={toggleExpanded}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <TagSelection reviewForm={reviewForm} />
        </div>
        <div className="md:hidden">
          {" "}
          <Button
            className="w-full border-[#71D4FF] text-black border-2 rounded-3xl text-[14px] px-[24px]"
            variant="outline"
            onClick={() => {
              setReviewButton("Text");
            }}
          >
            Write a Testimonial
          </Button>
        </div>
        <div className="w-full md:basis-2/6 flex flex-col gap-6 lg:pr-12 pb-12 md:pb-0">
          <Card className="hidden w-full md:flex flex-col items-center">
            <CardHeader className="w-full flex flex-col justify-center items-center gap-3">
              <div className="flex justify-center items-center w-[80px] h-[80px] bg-[#E9F8FF] rounded-full">
                <Pencil color="#009EE2" size={32} />
              </div>

              <CardTitle className="w-full text-center text-[#33313B] text-[16px] font-normal flex items-center justify-center tracking-[2%]">
                Or write a testimonial
              </CardTitle>
            </CardHeader>
            <CardFooter className="w-full flex flex-col">
              <Button
                className=" border-[#71D4FF] text-black border-2 rounded-3xl text-[14px] px-[24px]"
                variant="outline"
                onClick={() => {
                  setReviewButton("Text");
                }}
              >
                Write a Testimonial
              </Button>
            </CardFooter>
          </Card>
          <Questions reviewForm={reviewForm} />
          <div className="flex justify-between">
            <Button
              variant="link"
              className="text-black text-[14px] px-0 hover:text-gray-800"
              onClick={() => {
                reviewForm.details
                  ? reviewForm.details.testimonialTextType
                    ? setReviewButton("Text")
                    : setDetailsButton(!detailsButton)
                  : setDetailsButton(!detailsButton);
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="form"
              disabled={!isValid}
              className="text-[14px] p-0 py-2 px-4"
              onClick={() => {
                handleSubmitReview();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
