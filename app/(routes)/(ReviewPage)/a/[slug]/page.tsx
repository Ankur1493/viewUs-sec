import { getReviewFormDetails } from "@/actions/space";
import ReviewCard from "@/components/review/ReviewCard";
import { Metadata } from "next";
import { gradients } from "@/constants/gradients";

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
    <div className="flex relative justify-center items-center w-screen min-h-screen h-full">
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-50">
        <div
          className="w-full h-full"
          style={{
            background: gradients[reviewForm.details.theme].style,
            filter: "blur(40px)",
          }}
        />
      </div>
      <ReviewCard reviewForm={reviewForm} />
    </div>
  );
}
