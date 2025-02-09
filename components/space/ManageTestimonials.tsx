"use client";

import { useEffect, useState, useMemo } from "react";
import { useTestimonialFilterStore } from "@/store/useTestimonialFilterStore";
import { TestimonialCard } from "./TestimonialCard";
import { Video } from "lucide-react";
import TestimonialSkeleton from "./TestimonialSkeleton";
import { Card } from "../ui/card";

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
      <div className="px-6 flex flex-col gap-4">
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

  if (filteredTestimonials.length === 0) {
    return (
      <div className="w-full flex justify-center items-center px-6">
        {/* <div className="bg-[#E9F8FF] w-[80px] h-[80px] rounded-full flex justify-center items-center mx-6">
          <FrownIcon color="#009EE2" size={30} />
        </div>
        <h1 className="text-3xl font-medium">
          You have no {filter} reviews yet
        </h1> */}
        <Card className="flex flex-col items-center justify-center p-12 w-full">
          <div className="mb-6 rounded-full bg-[#E9F8FF] p-4">
            <Video color="#009EE2" className="h-8 w-8 text-slate-500" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">
            You have no {filter} reviews yet
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Start collecting {filter} testimonials from your customers to build
            trust and credibility.
          </p>
        </Card>
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
