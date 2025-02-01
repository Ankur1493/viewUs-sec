import React from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";

const loadingStates = [
  {
    text: "Submitting your request",
  },
  {
    text: "Creating your space",
  },
  {
    text: "Just a min more",
  },
  {
    text: "This should have been done by now",
  },
  {
    text: "We are done",
  },

];

export function OnboardingLoader() {
  const loading = true;
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
    </div>
  );
}
