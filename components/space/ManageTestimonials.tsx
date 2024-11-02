"use client";
import { IReview } from "@/models/review_model";
import { TestimonialCard } from "./TestimonialCard";
// import useReviewPageStore from "@/store/useReviewPageStore";
// import { ImportPosts } from "./imports/ImportPosts";

export const ManageTestimonials = ({
  testimonials,
}: {
  testimonials: IReview[];
}) => {
  // const { testimonialType } = useReviewPageStore();

  return (
    <>
      {/* {testimonialType === "importTestimonials" ? (
        <ImportPosts />
      ) : ( */}
      <div className="w-full h-full px-6">
        <div className="flex flex-col gap-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id!} testimonial={testimonial} />
          ))}
        </div>
      </div>
      {/* )} */}
    </>
  );
};
