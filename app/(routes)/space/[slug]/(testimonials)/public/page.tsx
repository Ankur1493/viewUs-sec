import { SpaceShareButton } from "@/components/dashboard/SpaceShareButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Us - Import Testimonials",
  description:
    "View us is build by us, to help you manage testimonials, import testimonials in the best way possible from popular social platforms",
};

export default function PublicURLPage({ params }: { params: { slug: string } }) {

  return (
    <div className="flex h-fit">
      <Card className="px-12 py-6">
        <CardHeader>
          <div className="bg-[#E9F8FF] w-[80px] h-[80px] rounded-full flex justify-center items-center">
            <PartyPopper color="#009EE2" size={30} />
          </div>
          <CardTitle className="max-w-3xl">Share this URL with your customers to collect reviews</CardTitle>
          <CardDescription className="max-w-xl">
            This will take you to the review form page, via which your users can submit a testimonial for you to showcase
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <SpaceShareButton slug={params.slug} ShowUrl={true} />
        </CardContent>
      </Card>
    </div>
  );
}
