import { IReview } from "@/models/review_model";
import { TestimonialCard } from "./TestimonialCard";

export const ManageTestimonials = ({
  testimonials,
}: {
  testimonials: IReview[];
}) => {
  return (
    <div className="w-full px-6 overflow-y-hidden">
      <div className="flex flex-col gap-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial._id!} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};
