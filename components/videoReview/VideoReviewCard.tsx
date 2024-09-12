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
import React, { useState, useRef, useEffect } from "react";

export const VideoReviewCard = ({
  questions,
  image,
}: {
  questions: Question[];
  image: string | null;
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

    openCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

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
    console.log(videoUrl);

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

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
          <div className="flex flex-col justify-center">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="border-2 border-gray-300 rounded-md overflow-hidden mb-2 w-full max-w-lg">
              <video
                ref={videoRef}
                className="w-full h-auto"
                autoPlay
                playsInline
              />
            </div>

            {recording && (
              <p className="text-xl font-bold mb-2">
                Recording: {formatTime(timer)}
              </p>
            )}

            {!recording ? (
              <button
                onClick={startRecording}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mb-4 rounded"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Stop Recording
              </button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  );
};
