import { getSpaceDetails } from "@/data/space";
import Image from "next/image";

export default async function ReviewPage({ params }: { params: { "slug": string } }) {
  //have added the slug, create a card component here which have text and video options along
  //use Link from next/Link to redirect user to the text or video review

  const reviewForm = await getSpaceDetails(params.slug)
  console.log(reviewForm)

  if (!reviewForm) {
    return (
      <div>Can't found this space</div>
    )
  }

  return (
    <div>
      <Image
        src={reviewForm.image!}
        alt="logo"
        height={100}
        width={100}
      />
      {reviewForm.title}
    </div>
  );
}

