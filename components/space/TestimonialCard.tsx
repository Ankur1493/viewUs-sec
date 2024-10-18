import Image from "next/image"
import { IReview, ReviewType } from "@/models/review_model"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Import, Pencil, Video } from 'lucide-react'
interface ExtendedIReview extends IReview {
  imageUrl?: string
}

export const TestimonialCard = ({ testimonial }: { testimonial: ExtendedIReview }) => {
  return (
    <Card key={testimonial.id!} className="w-full  bg-gray-50 text-black shadow-sm hover:shadow-md duration-200 group">
      <CardHeader className="flex-row justify-start w-full  items-center gap-4">
        <div className="bg-[#E9F8FF] w-[40px] h-[40px] rounded-full flex justify-center items-center ">
          {
            testimonial.reviewType === ReviewType.TEXT ? (
              <Pencil color="#009EE2" size={20} />
            ) : testimonial.reviewType === ReviewType.VIDEO ?
              (<Video color="#009EE2" size={20} />)
              : (<Import color="#009EE2" size={20} />
              )
          }
        </div>
        <CardTitle className="text-xl font-medium">{testimonial.review}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 w-[60%] text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <Image
              src={testimonial.imageUrl ? testimonial.imageUrl : "/assets/images/profile.png"}
              alt="profile"
              width={100}
              height={100}
              className="h-[50px] w-[50px] rounded-full"
            />
            <h1>{testimonial.email}</h1>
          </div>
          {testimonial.stars}
        </div>
      </CardContent>
    </Card>
  )
}
