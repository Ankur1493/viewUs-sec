"use client";
import { Label } from "@/components/ui/label";
import { gradients } from "@/constants/gradients";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSpaceDataStore } from "@/store/useSpaceDataStore";
import Image from "next/image";

type PreviewSectionProps = {
  userInformation: Record<string, boolean>;
};

export const UserInformationPreview: React.FC<PreviewSectionProps> = ({
  userInformation,
}) => {
  const { design } = useSpaceDataStore();

  return (
    <div className="relative flex justify-center items-center w-full h-[75vh] bg-white">
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
      <Card className="relative w-[550px] px-[2%] h-full overflow-y-auto scrollbar-hidden border-none shadow-none font-satoshi ">
        <CardHeader>
          <CardTitle className="text-left text-[#33313B] text-2xl md:text-[36px] font-[500]">
            Tell us about Yourself
          </CardTitle>
          <CardDescription className="text-[#222222] font-[400] text-sm md:text-[16px] leading-[24px]">
            This information may be displayed with your testimonial.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-[14px]">
          <div className="flex items-center space-x-4">
            <div className="relative w-[50px] h-[50px] md:w-[64px] md:h-[64px] rounded-full overflow-hidden bg-[#E9F8FF] flex items-center justify-center">
              <Image
                src="https://d3eyp937ijscg0.cloudfront.net/viewus_images/profile.png"
                alt="Profile"
                width={28}
                height={28}
              />
            </div>

            <div className="flex flex-col">
              <Button
                variant="outline"
                className="rounded-3xl  border-gray-400 text-sm "
              >
                Add photo
                {userInformation.userPhoto && (
                  <span className="text-red-500">*</span>
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-4 mt-3">
            {(
              Object.entries(userInformation) as [
                keyof typeof userInformation,
                boolean,
              ][]
            )
              .filter(([key]) => key !== "userPhoto")
              .map(([key, value]) => (
                <div key={key}>
                  <Label className="capitalize text-[#33313B] text-[14px] font-medium">
                    {key.replace(/([A-Z])/g, " $1").trim()}{" "}
                    <span className="text-red-500">{value && "*"}</span>
                  </Label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm md:h-[48px]"
                    placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                    disabled
                  />
                </div>
              ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="form">Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
