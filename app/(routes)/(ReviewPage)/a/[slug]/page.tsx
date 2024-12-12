import { getReviewFormDetails } from "@/actions/space";
import ReviewCard from "@/components/review/ReviewCard";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const reviewForm = await getReviewFormDetails({ slug: params.slug });
  return {
    title: `${reviewForm?.name}`,
    description:
      "Share your experience with us! Submit a review and help us improve.",
    openGraph: {
      title: `${reviewForm?.name}`,
      description:
        "Share your experience with us! Submit a review and help us improve.",
      images: ["/assets/images/reviewPage.png"],
      url: `https://www.viewus.in/a/${slug}`,
    },
  };
}

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
