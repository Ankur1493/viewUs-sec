import { getReviewFormDetails } from "@/actions/space";
import ReviewCard from "@/components/review/ReviewCard";

export default async function ReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const reviewForm = await getReviewFormDetails({ slug: params.slug });

  if (!reviewForm || !reviewForm.details) {
    return <div>Can not found this space</div>;
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <ReviewCard reviewForm={reviewForm} />
    </div>
  );
}
