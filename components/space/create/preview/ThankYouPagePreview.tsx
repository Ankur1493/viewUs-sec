import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import { gradients } from "@/constants/gradients";
import { useSpaceDataStore } from "@/store/useSpaceDataStore";

type ThankYouPreviewProps = { title?: string; description?: string };

export const ThankYouPagePreview = ({
  title,
  description,
}: ThankYouPreviewProps) => {
  const { design } = useSpaceDataStore();
  return (
    <div className="flex relative justify-center items-center w-full h-full bg-white">
      <div className="absolute hidden md:block inset-0 overflow-hidden pointer-events-none z-50">
        <div
          className="absolute md:-bottom-8 md:-left-72 lg:-bottom-20 lg:-left-80 w-[600px] h-[200px]"
          style={{
            transform: "rotate(70deg)",
            background: gradients[design.gradientType].style,
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -top-4 md:-right-96 lg:-right-80 lg:-top-20 w-[600px] h-[200px]"
          style={{
            transform: "rotate(70deg)",
            background: gradients[design.gradientType].style,
            filter: "blur(80px)",
          }}
        />
      </div>
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
