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
  console.log({ slug });
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
  console.log({ reviewForm: reviewForm.details.theme });
  const getGradientStyle = (themeId: number | null) => {
    if (themeId === null) {
      return gradients[1].style;
    }
    return (
      gradients.find((gradient) => gradient.id === themeId)?.style ||
      gradients[1].style
    );
  };

  return (
    <div className="flex relative justify-center items-center w-screen min-h-screen h-full">
      {/* <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-50">
        <div
          className="w-full h-full"
          style={{
            background: getGradientStyle(reviewForm.details.theme),
            filter: "blur(40px)",
          }}
        />
      </div> */}
      <div className="fixed hidden md:block inset-0 overflow-hidden pointer-events-none z-50">
        <div
          className="absolute md:-bottom-8 md:-left-72 lg:-bottom-4 lg:-left-60 w-[600px] h-[200px]"
          style={{
            transform: "rotate(70deg)",
            background: getGradientStyle(reviewForm.details.theme),
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -top-4 md:-right-96 lg:-right-80 w-[600px] h-[200px]"
          style={{
            transform: "rotate(70deg)",
            background: getGradientStyle(reviewForm.details.theme),
            filter: "blur(80px)",
          }}
        />
      </div>
      <ReviewCard reviewForm={reviewForm} />
    </div>
  );
}
