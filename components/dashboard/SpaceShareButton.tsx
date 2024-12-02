"use client"

import React, { useEffect, useState } from "react";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface SpaceDeleteButtonProps {
  ShowUrl: boolean;
  slug: string;
}

export const SpaceShareButton = ({
  ShowUrl,
  slug,
}: SpaceDeleteButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(`http://localhost:3000/a/${slug}`)
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className={cn("p-1 cursor-pointer gap-4 flex justify-between items-center ", ShowUrl && "p-0 pr-4  shadow-inner shadow-gray-50 border border-gray-200 rounded-xl w-full")}>
      {ShowUrl && (
        <Input className="w-full border-none text-2xl" value={`http://localhost:3000/a/${slug}`} />
      )}
      {isCopied ? (
        <CopyCheckIcon color="gray" size={20} />) : (
        <CopyIcon size={20} onClick={handleCopyCode} />
      )}
    </div>
  );
};