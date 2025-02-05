import { SpaceShareButton } from "@/components/dashboard/SpaceShareButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Us - Import Testimonials",
  description:
    "View us is build by us, to help you manage testimonials, import testimonials in the best way possible from popular social platforms",
};

export default function PublicURLPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="flex h-fit px-2 md:px-6 py-12 pt-16">
      <Card className="w-full">
        <CardHeader className="gap-2">
          <div className="flex items-center gap-4">
            <div className="bg-[#E9F8FF] w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <Share2 color="#009EE2" size={25} />
            </div>
            <CardTitle className="max-w-3xl font-bold leading-6 text-2xl">
              Share with your customers
            </CardTitle>
          </div>
          <CardDescription className="max-w-xl leading-5 text-md">
            Share this review collection URL with your customers to gather
            testimonials.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <SpaceShareButton slug={params.slug} ShowUrl={true} />
        </CardContent>
      </Card>
    </div>
  );
}
