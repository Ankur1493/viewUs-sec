import React, { useState } from "react";
import useReviewPageStore from "@/store/useReviewPageStore";

interface StarredProps {
  size?: string;
}

export const Starred: React.FC<StarredProps> = ({ size = "text-3xl" }) => {
  const { setStarred } = useReviewPageStore();
  const [rating, setRating] = useState<number>(5);
  const [hovered, setHovered] = useState<number>(0);

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
          className={`cursor-pointer ${
            index < (hovered || rating) ? "text-yellow-500" : "text-gray-400"
          } ${size}`}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};
