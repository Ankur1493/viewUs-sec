import axios from "axios";
import { FrownIcon } from "lucide-react";
import { ManageTestimonials } from "@/components/space/ManageTestimonials";
import SpaceInfo from "@/components/space/SpaceInfo";
import { ReviewType } from "@/models/review_model";

export const metadata = {
  title: "View Us - space",
  description:
    "Ankur Sharma is a full stack developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

interface TestimonialType {
  reviewType: ReviewType;
}

async function fetchTestimonials(slug: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/review/text"
      : "http://viewus.in/api/review/text";

  try {
    const response = await axios.get(baseUrl, {
      params: { slug },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

const SpacePage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const response = await fetchTestimonials(slug);
  const { space } = response;
  const spaceTestimonials = response.reviews || [];
  const testimonialCounts = {
    total: spaceTestimonials.length,
    text: spaceTestimonials.filter((t: TestimonialType) => t.reviewType === 0)
      .length,
    video: spaceTestimonials.filter((t: TestimonialType) => t.reviewType === 1)
      .length,
    imported: spaceTestimonials.filter(
      (t: TestimonialType) => t.reviewType === 2
    ).length,
  };

  if (spaceTestimonials.length === 0) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-[#E9F8FF] w-[80px] h-[80px] rounded-full flex justify-center items-center mx-6">
          <FrownIcon color="#009EE2" size={30} />
        </div>
        <h1 className="text-3xl font-medium">You have no project yet</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center pb-4">
      <div className="mb-3 px-7">
        {slug && (
          <SpaceInfo space={space} testimonialCounts={testimonialCounts} />
        )}
      </div>
      <ManageTestimonials testimonials={spaceTestimonials} />
    </div>
  );
};

export default SpacePage;
