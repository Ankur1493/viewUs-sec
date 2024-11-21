"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TestimonialLikeButtonProps {
  testimonialId: string;
  initialLiked: boolean;
}

export const TestimonialLikeButton = ({
  testimonialId,
  initialLiked,
}: TestimonialLikeButtonProps) => {
  const router = useRouter();
  const [liked, setLiked] = useState(initialLiked);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const updateLikeStatus = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.post("/api/review/like", {
        id: testimonialId,
        liked: !liked,
      });
      if (response.data.success) {
        toast(`Testimonial ${!liked ? "added" : "removed"} successfully`, {
          description: "Wall of love will be updated in some time",
        });
      }

      // Toggle the liked status
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error("Failed to update like status:", error);
    } finally {
      setIsUpdating(false);
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={updateLikeStatus}
      disabled={isUpdating || isPending}
      aria-label={liked ? "Unlike testimonial" : "Like testimonial"}
    >
      <Heart
        size={20}
        className={` ${liked ? "fill-red-500 text-red-500" : "text-black"}`}
      />
    </Button>
  );
};
