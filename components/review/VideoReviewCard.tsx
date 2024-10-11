"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useRef, useEffect } from "react";

import useReviewPageStore from "@/store/useReviewPageStore";

export const VideoReviewCard = ({
  image,
  title,
}: {
  image: string | null;
  title: string;
}) => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    openCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setError("Error accessing the camera");
      console.error(err);
    }
  };

  const startRecording = () => {
    if (streamRef.current) {
      const recorder = new MediaRecorder(streamRef.current);
      recorder.ondataavailable = (event) => chunks.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "video/webm" });
        chunks.current = [];
        const videoUrl = URL.createObjectURL(blob);
        setVideoUrl(videoUrl);

        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = videoUrl;
          videoRef.current.controls = true;
          videoRef.current.play();
        }
      };

      setMediaRecorder(recorder);
      recorder.start();
      setRecording(true);

      setTimer(0);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setRecording(false);

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const retakeRecording = () => {
    setVideoUrl(null);
    setError(null);
    setTimer(0);
    openCamera();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const {setSubmitButton, submitButton, setReviewButton } =
    useReviewPageStore();

  return (
    <Card
      className="relative w-[80%] h-[95%] px-[2%] border-none shadow-none flex flex-col gap-4">
      <div className="flex flex-col">
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
           <div className="text-[#33313B] font-nromal text-4xl px-[2%]">
              Record a video testimonial
            </div>
      </div>
      <div className="flex flex-row">
      <div className="flex gap-2 basis-8/12">
        <CardContent
          className="pb-1 w-[85%]"
        >
          <div>
            <div className="flex flex-col justify-start">
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="rounded-md overflow-hidden mb-2">
                <video
                  ref={videoRef}
                  className="rounded-md h-[400px]"
                  autoPlay
                  playsInline
                />
              </div>

              {recording && (
                <p className="text-xl font-bold mb-2">
                  Recording: {formatTime(timer)}
                </p>
              )}

              {!recording && !videoUrl && (
                <button
                  onClick={startRecording}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mb-4 rounded w-2/3 ml-12"
                >
                  Start Recording
                </button>
              )}

              {!recording && videoUrl && (
                <div>
                  <button
                    onClick={retakeRecording}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mb-4 rounded w-2/3 ml-12"
                  >
                    Retake Recording
                  </button>
                </div>
              )}

              {recording && (
                <button
                  onClick={stopRecording}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-2/3 ml-12"
                >
                  Stop Recording
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
      <div className="basis-2/6 flex flex-col gap-6 mb-12">
        <div className="text-2xl font-semibold">Tips for getting started</div>
        <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">Think through (or write down!) some talking points</p>
            <p className="text-md font-light text-justify">Having an outline or script beforehand will allow your video to be smooth and succinct.</p>
          </div>
        <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">Start with an intro</p>
            <p className="text-md font-light text-justify">Give some background on your role and how you used our product.</p>
          </div>
        <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">Reflect on your experience</p>
            <p className="text-md font-light text-justify">{"We've provided some questions to help you get started."}</p>
            <ul className="list-disc pl-6 space-y-2 my-2">
              <li className="text-sm text-justify">What problems did we help you solve?</li>
              <li className="text-sm text-justify">What have you been able to achieve since using our product/service?</li>
              <li className="text-sm text-justify">What has exceeded your expectations or surprised you the most?</li>
              <li className="text-sm text-justify">What would you tell someone considering our product/service?</li>
              <li className="text-sm text-justify">Who would you recommend us to?</li>
            </ul>
          </div>
        <div className="flex justify-between">
          <Button
            variant="link"
            className="text-black text-md px-0"
            onClick={() => {
              setReviewButton("Text")       
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="form"
            className="text-sm p-0 py-2 px-4"
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
