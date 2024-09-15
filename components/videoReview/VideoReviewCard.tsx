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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  description: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),
  videoUrl: z.string().optional(),
});

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
  const [showForm, setShowForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      videoUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Starred Rating:", rating);
    console.log("Form Data:", data);
    console.log("Video URL:", videoUrl);
  }

  useEffect(() => {
    openCamera();

    const mountTimeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      clearTimeout(mountTimeout);
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
      setShowForm(false);

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
      setShowForm(true);

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
    setShowForm(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  return (
    <Card
      className={`transition-all duration-700 ease-in-out transform ${
        isMounted ? "opacity-100" : "opacity-0"
      } ${showForm ? "max-w-[800px]" : "w-[450px] px-[1%]"}`}
    >
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

      <div className="flex gap-2">
        <CardContent
          className={`pb-1 z-10 transition-all duration-700 ease-in-out ${
            showForm ? "flex-grow-[0.5] w-[50%]" : "flex-grow w-full"
          }`}
        >
          <div className="mt-3">
            <ul>
              {questions.map((q: Question) => (
                <li key={q.id}>Q. {q.question} ?</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer ${
                    index < (hovered || rating)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  } text-3xl`}
                  onMouseEnter={() => handleMouseEnter(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(index + 1)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center">
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="border-2 border-gray-300 rounded-md overflow-hidden mb-2 w-full ">
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

              {!recording && !videoUrl && (
                <button
                  onClick={startRecording}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mb-4 rounded"
                >
                  Start Recording
                </button>
              )}

              {!recording && videoUrl && (
                <div>
                  <button
                    onClick={retakeRecording}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mb-4 rounded w-full"
                  >
                    Retake Recording
                  </button>
                </div>
              )}

              {recording && (
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

        {showForm && (
          <CardContent
            className={`pb-1 w-[50%] transition-transform duration-700 ease-in-out ${
              showForm
                ? "transform translate-x-[0%]"
                : "transform translate-x-[-100%]"
            }`}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => {
                  form.setValue("videoUrl", videoUrl || "");
                  onSubmit(data);
                })}
                className="w-full space-y-6 mt-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your name</FormLabel>
                      <FormControl>
                        <Input placeholder="john" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your email</FormLabel>
                      <FormControl>
                        <Input placeholder="john123@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        )}
      </div>

      {showForm && (
        <CardFooter className="w-full">
          <Button
            type="submit"
            className="w-full transition-transform duration-300 transform"
            onClick={() => {
              form.setValue("videoUrl", videoUrl || "");
              form.handleSubmit(onSubmit)();
            }}
          >
            Submit
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
