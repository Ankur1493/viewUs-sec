import React from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";

const loadingStates = [
  {
    text: "Add your personal information",
  },
  {
    text: "select a text/video review",
  },
  {
    text: "Write a text testimonial",
  },
  {
    text: "Or record a video testimonial",
  },
  {
    text: "Give some star ratings",
  },
  {
    text: "Add some tags",
  },
  {
    text: "Share your feedback!",
  },
];

export function MultiStepLoader() {
  const loading = true;
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
    </div>
  );
}
