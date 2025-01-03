import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTestimonial } from '@/actions/testimonial'
import { WobbleCard } from '@/components/ui/wobble-card'
import Image from 'next/image'
import { VideoPlayer } from '@/components/space/VideoPlayer'
import { ReviewType } from '@/models/review_model'
import twitter from "@/public/assets/images/twitter_logo.png";
import linkedIn from "@/public/assets/images/linkedIn_logo.png";
import productHunt from "@/public/assets/images/ProductHunt_logo.png";

const importedReviewTypeLabels = {
  0: "Twitter",
  1: "LinkedIn",
  2: "Product Hunt",
} as const;

const importedReviewTypeImages = {
  Twitter: twitter,
  LinkedIn: linkedIn,
  "Product Hunt": productHunt,
} as const;

type ImportedReviewType = keyof typeof importedReviewTypeImages;

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const id = params.id
  const response = await getTestimonial(id)

  if (!response.status) {
    return notFound()
  }
  const testimonial = response.data

  const title = `${testimonial.firstName}'s Testimonial`
  const description = testimonial.review.substring(0, 160)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/assets/images/reviewPage.png"],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ["/assets/images/reviewPage.png"],

    },
  }
}

export default async function TestimonialPage({ params }: Props) {
  const response = await getTestimonial(params.id)

  if (!response.status) {
    return notFound()
  }
  const testimonial = response.data

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 max-w-7xl h-fit bg-violet-600 min-h-[500px] lg:min-h-[300px]"
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            {testimonial.firstName}
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            {testimonial.reviewType !== ReviewType.VIDEO && testimonial.review}
          </p>
        </div>
        {testimonial.reviewType === ReviewType.VIDEO && (
          <VideoPlayer videoLink={testimonial.review} />
        )}
        {testimonial.importedImage &&
          testimonial?.importedImage[0]?.length > 0 ? (
          <Image
            src={testimonial.importedImage[0]}
            alt={`${testimonial.importedReviewType} image`}
            width={500}
            height={500}
            className="absolute -right-4 lg:-right-[5%] grayscale filter -bottom-4 lg:-bottom-16 object-contain rounded-2xl"
          />
        ) : (
          testimonial.importedVideo &&
          testimonial?.importedVideo[0]?.length > 0 && (
            <div className="w-[300px] h-[200px]">
              <video
                src={testimonial.importedVideo[0]}
                controls
                className="absolute -right-4 lg:-right-[5%] grayscale filter -bottom-4 lg:-bottom-16 object-contain rounded-2xl"
              />
            </div>
          )
        )}
      </WobbleCard>
    </div>
  )
}


