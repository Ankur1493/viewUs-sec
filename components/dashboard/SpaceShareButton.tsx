"use client"

import React, { useEffect, useState } from "react";
import { CopyCheckIcon, CopyIcon } from "lucide-react";

interface SpaceDeleteButtonProps {
  slug: string;
}

export const SpaceShareButton = ({
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
    <div className="p-1 cursor-pointer">
      {isCopied ? (
        <CopyCheckIcon color="gray" size={20} />) : (
        <CopyIcon size={20} onClick={handleCopyCode} />
      )}
    </div>
  );
};
