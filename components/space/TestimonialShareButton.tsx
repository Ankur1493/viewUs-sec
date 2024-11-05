"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IReview } from "./ManageTestimonials";
import { useState } from "react";

export const TestimonialShareButton = ({
  testimonial,
}: {
  testimonial: IReview;
}) => {
  const fullName = `${testimonial.firstName}`;
  const reviewText = `${testimonial.review}`;

  const [isHovered, setIsHovered] = useState(false);

  const shareOnTwitter = () => {
    const tweetText = `Check out this review by- \n${fullName}: "${reviewText}"`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="icon"
        onClick={shareOnTwitter}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        <Share2 size={20} />
      </Button>
      {isHovered && (
        <span className="absolute top-full -right-1/2 mt-1 bg-black text-white text-sm px-2 py-1 rounded shadow whitespace-nowrap">
          Share on Twitter
        </span>
      )}
    </div>
  );
};
