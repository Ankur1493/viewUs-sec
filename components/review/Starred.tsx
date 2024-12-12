"use client";
import React, { useState, useEffect } from "react";
import useReviewPageStore from "@/store/useReviewPageStore";
import { Star } from "lucide-react";

export const Starred = () => {
  const { starred, setStarred } = useReviewPageStore();
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);

  useEffect(() => {
    if (starred) {
      setRating(starred);
    }
  }, [starred]);

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
    setStarred(index);
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`cursor-pointer`}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          <div className="cursor-pointer ${size} inline-flex items-center justify-center align-middle">
            <Star
              color="none"
              size={30}
              fill={index < (hovered || rating) ? "#7FD8FF" : "#D0D0D0"}
            />
          </div>
        </span>
      ))}
    </div>
  );
};
