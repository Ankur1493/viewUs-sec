"use client"

import { useState } from 'react'
import { toast } from "sonner"
import axios from 'axios'
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TestimonialLikeButtonProps {
  testimonialId: string
  initialLiked: boolean
}

export const TestimonialLikeButton = ({ testimonialId, initialLiked }: TestimonialLikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateLikeStatus = async () => {
    setIsUpdating(true)
    try {

      const response = await axios.post("/api/review/like", {
        id: testimonialId,
        liked: !liked
      })
      if (response.data.success) {
        toast.success(`Testimonial ${!liked ? "added" : "removed"} from your wall of love`)
      }

      // Toggle the liked status
      setLiked(prevLiked => !prevLiked)

    } catch (error) {
      console.error('Failed to update like status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={updateLikeStatus}
      disabled={isUpdating}
      aria-label={liked ? "Unlike testimonial" : "Like testimonial"}
    >
      <Heart
        className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
      />
    </Button>
  )
}
