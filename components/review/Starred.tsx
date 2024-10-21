"use client";
import React, { useState, useEffect } from "react";
import useReviewPageStore from "@/store/useReviewPageStore";
import Image from "next/image";
import star from "@/public/assets/images/star.png";
import selectedStar from "@/public/assets/images/star_selected.png";

interface StarredProps {
  size?: string;
}

export const Starred: React.FC<StarredProps> = ({ size = "text-3xl" }) => {
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
          className={`cursor-pointer ${size}`}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          <div className="cursor-pointer ${size} inline-flex items-center justify-center align-middle">
            <Image
              src={index < (hovered || rating) ? selectedStar : star}
              alt="star"
              width={32}
              height={32}
              className={index < (hovered || rating) ? "mb-0" : "mb-[0.5px]"}
            />
          </div>
        </span>
      ))}
    </div>
  );
};
