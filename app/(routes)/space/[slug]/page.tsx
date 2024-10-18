import { ManageTestimonials } from "@/components/space/ManageTestimonials";
import axios from "axios";
import { FrownIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Us - space",
  description:
    "Ankur Sharma is a full stack developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default async function SpacePage({
  params,
}: {
  params: { slug: string };
}) {

  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api/review/text" : "http://viewus.in/api/review/text"
  const response = await axios.get(baseUrl, {
    params: { slug: params.slug },
  });
  const spaceTestimonials = response.data.reviews

  if (spaceTestimonials.length === 0) {
    return (
      <div className="h-full w-full flex  justify-center items-center">
        <div className="bg-[#E9F8FF] w-[80px] h-[80px] rounded-full flex justify-center items-center mx-6">
          <FrownIcon color="#009EE2" size={30} />
        </div>
        <h1 className="text-3xl font-medium">You have no project yet</h1>
      </div>
    )
  }

  return (
    <div className="flex justify-center h-full w-full">
      <ManageTestimonials testimonials={spaceTestimonials} />
    </div>
  )
}
