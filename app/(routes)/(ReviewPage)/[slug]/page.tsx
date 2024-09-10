import { getSpaceDetails } from "@/data/space";
import ReviewCard from "@/components/review/ReviewCard";

export default async function ReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const reviewForm = await getSpaceDetails(params.slug);
  console.log(reviewForm);

  if (!reviewForm) {
    return <div>Can not found this space</div>;
  }

  return <ReviewCard reviewForm={reviewForm} />;
}
