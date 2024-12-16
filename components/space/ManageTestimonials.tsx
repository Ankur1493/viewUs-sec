"use client";

import { useEffect, useState, useMemo } from "react";
import { useTestimonialFilterStore } from "@/store/useTestimonialFilterStore";
import { TestimonialCard } from "./TestimonialCard";
import { FrownIcon } from "lucide-react";
import TestimonialSkeleton from "./TestimonialSkeleton";

export enum ReviewType {
  TEXT = 0,
  VIDEO = 1,
  IMPORTED = 2,
}

enum ImportedReviewTypeModel {
  TWITTER = 0,
  LINKEDIN = 1,
  PRODUCTHUNT = 2,
}

export interface IReview {
  _id?: string;
  spaceId: string;
  slug: string;
  reviewType?: ReviewType;
  review: string;
  stars?: number;
  liked: boolean;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  jobTitle?: string | null;
  company?: string | null;
  image?: string | null;
  importedImage?: string[];
  importedVideo?: string[];
  importedReviewType?: ImportedReviewTypeModel;
  tags?: string[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ManageTestimonials = ({
  testimonials,
}: {
  testimonials: IReview[];
}) => {
  const [loading, setLoading] = useState(true);
  const { filter, initializeFilter } = useTestimonialFilterStore();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      initializeFilter();
      setLoading(false);
    };
    loadPage();
  }, [initializeFilter]);

  const filteredAndSortedTestimonials = useMemo(() => {
    return testimonials
      .filter((testimonial) => {
        switch (filter) {
          case "text":
            return testimonial.reviewType === ReviewType.TEXT;
          case "video":
            return testimonial.reviewType === ReviewType.VIDEO;
          case "imported":
            return testimonial.reviewType === ReviewType.IMPORTED;
          case "liked":
            return testimonial.liked;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        const dateA =
          filter === "liked"
            ? new Date(a.updatedAt || 0).getTime()
            : new Date(a.createdAt || 0).getTime();
        const dateB =
          filter === "liked"
            ? new Date(b.updatedAt || 0).getTime()
            : new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
  }, [testimonials, filter]);

  if (loading) {
    return (
      <div className="px-6">
        <TestimonialSkeleton />
        <TestimonialSkeleton />
      </div>
    );
  }

  const filteredTestimonials = testimonials.filter((testimonial) => {
    switch (filter) {
      case "text":
        return testimonial.reviewType === ReviewType.TEXT;
      case "video":
        return testimonial.reviewType === ReviewType.VIDEO;
      case "imported":
        return testimonial.reviewType === ReviewType.IMPORTED;
      case "liked":
        return testimonial.liked;
      default:
        return true;
    }
  });

  // if (filter === "liked") {
  //   filteredTestimonials.sort((a: IReview, b: IReview) => {
  //     const dataA = new Date(a.updatedAt || 0).getTime();
  //     const dataB = new Date(b.updatedAt || 0).getTime();
  //     return dataB - dataA;
  //   });
  // }

  if (filteredTestimonials.length === 0) {
    return (
      <div className="w-full flex pt-52 justify-center items-center">
        <div className="bg-[#E9F8FF] w-[80px] h-[80px] rounded-full flex justify-center items-center mx-6">
          <FrownIcon color="#009EE2" size={30} />
        </div>
        <h1 className="text-3xl font-medium">
          You have no {filter} reviews yet
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-2 md:px-6">
      <div className="flex flex-col gap-4">
        {filteredAndSortedTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial._id!} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};
