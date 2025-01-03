"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IReview } from "./ManageTestimonials";
import { useState } from "react";
import Link from "next/link";

export const TestimonialShareButton = ({
  testimonial,
}: {
  testimonial: IReview;
}) => {
  const fullName = `${testimonial.firstName}`;
  const [isHovered, setIsHovered] = useState(false);

  const shareOnTwitter = () => {
    const tweetText = `Check out this review by- \n${fullName}: https://viewus.in/t/${testimonial._id}`;
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
        <Link href={`/t/${testimonial._id}`}>
          <Share2 size={20} />
        </Link>
      </Button>
      {isHovered && (
        <span className="absolute top-full -right-1/2 mt-1 bg-black text-white text-sm px-2 py-1 rounded shadow whitespace-nowrap">
          Share on Twitter
        </span>
      )}
    </div>
  );
};
