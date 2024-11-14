import { WallOfLove } from "@/components/wallOfLove/WallOfLove";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Us - wall of love",
  description:
    "View us is build by us, to help you manage testimonials, import testimonials in the best way possible from popular social platforms",
};

export default function Dashboard() {
  return (
    <div className="px-4">
      <WallOfLove />
    </div>
  );
}
