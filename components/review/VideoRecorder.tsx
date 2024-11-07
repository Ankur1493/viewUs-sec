"use client";

import React, { useState, useRef, useEffect } from "react";

export const VideoRecorder = () => {
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
    const chljaa = async () => {
      await openCamera();
    };
    chljaa();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.play();
      }
    } catch (err) {
      setError("Error accessing the camera");
      console.log({ err });
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

  return (
    <div className="flex flex-col justify-start">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="rounded-md overflow-hidden mb-2">
        <video
          ref={videoRef}
          className="rounded-md w-[600px]"
          autoPlay
          playsInline
        />
      </div>

      {recording && (
        <p className="text-xl font-bold mb-2">Recording: {formatTime(timer)}</p>
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
  );
};
