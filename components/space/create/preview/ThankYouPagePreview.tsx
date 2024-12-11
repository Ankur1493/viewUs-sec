import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";

type ThankYouPreviewProps = { title?: string; description?: string };

export const ThankYouPagePreview = ({
  title,
  description,
}: ThankYouPreviewProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-white">
      <Card className="border-none shadow-none">
        <div className="bg-[#E9F8FF] w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full flex justify-center items-center mx-6">
          <PartyPopper color="#009EE2" size={30} />
        </div>
        <CardContent className="p-6">
          <CardTitle className="text-2xl md:text-[36px] font-[500] mb-4">
            {title}{" "}
          </CardTitle>
          <p className="text-sm md:text-[14px] font-[400] max-w-[500px] flex flex-wrap break-words overflow-wrap">
            {description}{" "}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
