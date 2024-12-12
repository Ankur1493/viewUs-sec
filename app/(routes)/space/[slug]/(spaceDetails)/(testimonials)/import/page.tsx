import { ImportPosts } from "@/components/space/imports/ImportPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Us - Import Testimonials",
  description:
    "View us is build by us, to help you manage testimonials, import testimonials in the best way possible from popular social platforms",
};

export default function Dashboard() {
  return (
    <div>
      <ImportPosts />
    </div>
  );
}
