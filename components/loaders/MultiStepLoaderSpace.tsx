import React from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";

const loadingStates = [
  {
    text: "Processing your request",
  },
  {
    text: "Keep waiting until your request is processing",
  },
  {
    text: "Just a sec while we updating your space",
  },
  {
    text: "Thankyou for using viewus",
  },
];

export function MultiStepLoaderSpace() {
  const loading = true;
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
    </div>
  );
}
