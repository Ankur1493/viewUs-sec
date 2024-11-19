"use client";

import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import useReviewPageStore from "@/store/useReviewPageStore";
import { Starred } from "./Starred";
import { useState, useRef, useEffect, useCallback } from "react";
import { Video, Square, Play, Pause } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";

export const VideoReviewCard = ({
  image,
  title,
  spaceId,
}: {
  image: string | null;
  title: string;
  spaceId: string;
}) => {
  const { customerDetails, setSubmitButton, submitButton, setReviewButton, starred } =
    useReviewPageStore();

  const [cameraAccessible, setCameraAccessible] = useState(true);
  const [microphoneAccessible, setMicrophoneAccessible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [startTimer, setStartTimer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const startRecord = () => {
    setStartTimer(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          startRecording();
          setStartTimer(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmitReview = async () => {
    console.log({ mediaBlobUrl });
    console.log(customerDetails);
    console.log(spaceId);

    try {
      const formData = new FormData();
      formData.append("firstName", customerDetails.firstName);
      formData.append("lastName", customerDetails.lastName);
      formData.append("email", customerDetails.email);
      formData.append("spaceId", spaceId);
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
          const videoFile = new File([videoBlob], 'recorded-video.webm', {
            type: 'video/webm',
            lastModified: new Date().getTime()
          });

          // Append the video file to formData
          formData.append("video", videoFile);
        } catch (error) {
          console.error("Error processing video:", error);
          throw new Error("Failed to process video");
        }
      }

      const response = await axios.post("/api/review/video", formData, {
        headers: { "Content-Type": "multipart/form-data", },
      });

      setSubmitButton(!submitButton);

      console.log("Review submitted", response.data);
    } catch (err) {
      console.log("Error sumbitted Review", err);
    }
  };

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
              <div
                className={`${isExpanded
                  ? "fixed inset-0 z-10 bg-black"
                  : "w-full aspect-video"
                  }`}
              >
                {!cameraAccessible ||
                  status === "permission_denied" ||
                  status === "no_specified_media_found" ||
                  !microphoneAccessible ? (
                  <div className="flex flex-col gap-2 rounded-lg overflow-hidden items-center justify-center w-full h-full bg-zinc-700 text-white text-center p-4 aspect-video">
                    <p> {cameraAccessible ? "" : "Camera not accessible. "}</p>
                    <p>
                      {microphoneAccessible ? "" : "Microphone not accessible."}
                    </p>
                  </div>
                ) : status === "recording" && previewStream ? (
                  <div
                    className={` rounded-lg overflow-hidden fixed inset-4 z-10 mb-16 flex flex-col justify-content items-center ${isExpanded
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
                      onClick={stopRecording}
                      className={`absolute w-20 h-20 bg-red-500 z-20 rounded-full bottom-4 flex items-center justify-center mb-4 hover:bg-red-600 transition-colors "absolute bottom-4"`}
                    >
                      <Square className="w-8 h-8 text-white fill-white" />
                    </Button>
                  </div>
                ) : status === "stopped" ? (
                  <div
                    className={`z-10 rounded-lg overflow-hidden flex flex-col justify-content items-center ${isExpanded
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
                        className=" w-20 h-20 bg-red-500 z-20 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white fill-white" />
                        ) : (
                          <Play className="w-8 h-8 rounded-[2px] text-white fill-white" />
                        )}
                      </Button>
                      {isExpanded && (
                        <Button
                          onClick={startRecording}
                          className={`w-[160px] h-[50px] p-[16px] bg-white text-black rounded-[100px] flex items-center justify-center mb-4 hover:bg-gray-100 transition-colors text-[20px] font-medium leading-6`}
                        >
                          Start Over
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`bg-zinc-700 rounded-lg overflow-hidden transition-all duration-800  ${isExpanded
                      ? "fixed inset-4 z-10 mb-16"
                      : "w-full aspect-video"
                      }`}
                  >
                    <div
                      className={`relative w-full h-full flex ${isExpanded ? "justify-end" : "justify-center"
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
                        className={`w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 hover:bg-red-600 transition-colors ${isExpanded ? "absolute bottom-4" : ""
                          }`}
                      >
                        {startTimer ? (
                          <p className="text-white text-xl">{countdown}</p>
                        ) : (
                          <Video className="w-8 h-8 text-white" />
                        )}
                      </Button>
                      {!isExpanded && (
                        <p className="text-white text-lg">
                          Click here to start recording
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {isExpanded && (
                  <div className="fixed bottom-6 left-4 right-4 flex justify-center items-center">
                    {startTimer ? (
                      <p className="text-white text-lg">
                        {" "}
                        Your video is starting in...
                      </p>
                    ) : status === "idle" ? (
                      <p className="text-white text-lg">
                        Lights, camera, action!
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="absolute right-0 flex gap-2">
                      <Button
                        variant="formOutline"
                        className="w-[120px] h-[36px] text-white hover:bg-transparent hover:text-gray-200"
                        disabled={status === "recording" || startTimer}
                        onClick={resetStates}
                      >
                        Back
                      </Button>
                      <Button
                        variant="form"
                        className="w-[120px] h-[36px]"
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
                handleSubmitReview();
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
