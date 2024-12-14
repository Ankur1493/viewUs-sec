import React from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";

const loadingStates = [
  {
    text: "Processing your review",
  },
  {
    text: "Keep waiting until your review is submitting",
  },
  {
    text: "Your review means a lot",
  },
  {
    text: "Thankyou for submitting a review",
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
