"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Video, Square, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReactMediaRecorder } from "react-media-recorder";

export default function VideoRecorder() {
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

  // useEffect(() => {
  //   if (status === "recording") {
  //     const startTime = Date.now();
  //     progressIntervalRef.current = setInterval(() => {
  //       const elapsedTime = (Date.now() - startTime) / 1000;
  //       setProgress(Math.min(elapsedTime / 120, 1));
  //       if (elapsedTime >= 120) {
  //         stopRecording();
  //       }
  //     }, 100);
  //   } else {
  //     if (progressIntervalRef.current) {
  //       clearInterval(progressIntervalRef.current);
  //     }
  //     if (status === "stopped") {
  //       setProgress(0);
  //     }
  //   }
  //   return () => {
  //     if (progressIntervalRef.current) {
  //       clearInterval(progressIntervalRef.current);
  //     }
  //   };
  // }, [status]);

  // useEffect(() => {
  //   const videoElement = videoRef.current;
  //   if (videoElement && status === "stopped") {
  //     const handleTimeUpdate = () => {
  //       setProgress(videoElement.currentTime / videoElement.duration);
  //     };
  //     videoElement.addEventListener("timeupdate", handleTimeUpdate);
  //     return () => {
  //       videoElement.removeEventListener("timeupdate", handleTimeUpdate);
  //     };
  //   }
  // }, [status]);

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

  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = Math.floor(seconds % 60);
  //   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  // const renderProgressBar = () => (
  //   <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
  //     <div
  //       className="h-full bg-red-500 transition-all duration-100 ease-linear"
  //       style={{ width: `${progress * 100}%` }}
  //       role="progressbar"
  //       aria-valuenow={progress * 100}
  //       aria-valuemin={0}
  //       aria-valuemax={100}
  //     />
  //   </div>
  // );

  return (
    <div
      className={`${
        isExpanded ? "fixed inset-0 z-10 bg-black" : "w-full aspect-video"
      }`}
    >
      {!cameraAccessible ||
      status === "permission_denied" ||
      status === "no_specified_media_found" ||
      !microphoneAccessible ? (
        <div className="flex flex-col gap-2 rounded-lg overflow-hidden items-center justify-center w-full h-full bg-zinc-700 text-white text-center p-4 aspect-video">
          <p> {cameraAccessible ? "" : "Camera not accessible. "}</p>
          <p>{microphoneAccessible ? "" : "Microphone not accessible."}</p>
        </div>
      ) : status === "recording" && previewStream ? (
        <div
          className={`z-10 rounded-lg overflow-hidden fixed inset-4 z-10 mb-16 flex flex-col justify-content items-center ${
            isExpanded ? "fixed inset-4 z-10 mb-16" : "w-full aspect-video"
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
          {/* <div className="absolute bottom-4 left-4 text-black py-[10px] px-[16px] w-[120px] h-[44px] bg-white rounded-[6px]">
            <p className="w-full h-full text-[16px]">
              {formatTime(progress * 120)}/02:00
            </p>
          </div>
          {renderProgressBar()} */}
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
          {/* <div className="absolute bottom-4 left-4 text-black py-[10px] px-[16px] w-[120px] h-[44px] bg-white rounded-[6px]">
            <p className="w-full h-full text-[16px]">
              {formatTime(progress * (videoRef.current?.duration || 0))}/
              {formatTime(videoRef.current?.duration || 0)}
            </p>
          </div>
          {renderProgressBar()} */}
        </div>
      ) : (
        <div
          className={`bg-zinc-700 rounded-lg overflow-hidden transition-all duration-800  ${
            isExpanded ? "fixed inset-4 z-10 mb-16" : "w-full aspect-video"
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
              className={`w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 hover:bg-red-600 transition-colors ${
                isExpanded ? "absolute bottom-4" : ""
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
            <p className="text-white text-lg"> Your video is starting in...</p>
          ) : status === "idle" ? (
            <p className="text-white text-lg">Lights, camera, action!</p>
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
  );
}
