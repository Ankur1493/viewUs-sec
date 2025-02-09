"use client";

import React, { useEffect, useState } from "react";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface SpaceDeleteButtonProps {
  ShowUrl: boolean;
  slug: string;
}

export const SpaceShareButton = ({ ShowUrl, slug }: SpaceDeleteButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const baseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? "http://localhost:3000"
      : "https://www.viewus.in";

  const handleCopyCode = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(`${baseUrl}/a/${slug}`);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div
      className={cn(
        "p-1 cursor-pointer gap-4 flex justify-between items-center bg-gray-100",
        ShowUrl && "p-0 pr-4 border border-gray-200 rounded-md w-full"
      )}
    >
      {ShowUrl && (
        <Input
          className="w-full border-none text-md text-gray-900"
          value={`${baseUrl}/a/${slug}`}
        />
      )}
      {isCopied ? (
        <CopyCheckIcon color="gray" size={20} />
      ) : (
        <CopyIcon size={20} onClick={handleCopyCode} />
      )}
    </div>
  );
};
