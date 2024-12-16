"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface SpaceDeleteButtonProps {
  slug: string;
}

export const SpaceCopyButton = ({ slug }: SpaceDeleteButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const baseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? "http://localhost:3000"
      : "https://www.viewus.in";

  const copyToClipboard = () => {
    const url = `${baseUrl}/a/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div
      onClick={copyToClipboard}
      className="flex justify-center items-center"
      aria-label="Copy URL"
    >
      {isCopied ? <Check size={20} /> : <Copy size={20} />}
    </div>
  );
};
