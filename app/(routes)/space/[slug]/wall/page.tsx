import { WallOfLove } from "@/components/wallOfLove/WallOfLove";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Us - wall of love",
  description:
    "View us is build by us, to help you manage testimonials, import testimonials in the best way possible from popular social platforms",
};

interface PageProps {
  params: { slug: string };
}

export default function Dashboard({ params }: PageProps) {
  const { slug } = params;

  return (
    <div className="px-4 pt-20">
      <WallOfLove slug={slug} />
    </div>
  );
}
