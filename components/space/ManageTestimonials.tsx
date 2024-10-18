import { IReview } from "@/models/review_model"
import { TestimonialCard } from "./TestimonialCard"
interface ExtendedIReview extends IReview {
  imageUrl?: string
}

export const ManageTestimonials = ({ testimonials }: { testimonials: ExtendedIReview[] }) => {
  return (
    <div className="w-full h-full px-4">
      <div className="flex flex-col gap-4 px-5">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id!} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}
