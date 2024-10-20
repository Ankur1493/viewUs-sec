import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

interface videoSectionProps {
  heading: string;
  content: string;
  videoSrc: string;
  buttonContent1: string;
  linkHref1: string;
  buttonContent2?: string;
  linkHref2?: string;
  icon1: React.ElementType;
  icon2?: React.ElementType;
}

export const VideoSection = ({
  heading,
  content,
  videoSrc,
  buttonContent1,
  linkHref1,
  buttonContent2,
  linkHref2,
  icon1: Icon1,
  icon2: Icon2,
}: videoSectionProps) => {
  return (
    <div className="flex flex-col w-full md:flex-row items-center justify-between p-6 mt-20 md:mt-40 lg:px-12">
      <div className="w-[95%] md:w-2/5 space-y-4 text-center md:text-left">
        <div className="md:w-[90%] lg:w-[70%] flex flex-col gap-6">
          <div className="flex flex-col gap-5 w-full">
            <h2 className="text-2xl lg:text-4xl font-bold text-black text-left">
              {heading}
            </h2>
            <p className="text-gray-800 text-sm md:text-md lg:text-lg tracking-wider text-left">
              {content}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 w-full">
            <Link href={linkHref1} className="flex-1">
              <Button className="flex w-full py-5 gap-2 rounded-xl shadow-xl border-2 font-semibold group">
                <p>{buttonContent1}</p>
                <Icon1 className="w-[18px] h-[18px] group-hover:w-[20px] group-hover:h-[20px]  transition-all duration-100 ease-in-out" />
              </Button>
            </Link>
            {buttonContent2 && (
              <Link href={linkHref2 || "#"} className="flex-1">
                <Button
                  variant="outline"
                  className="flex w-full py-5 gap-2 rounded-xl shadow-md border-2 font-semibold group"
                >
                  <p>{buttonContent2}</p>
                  {Icon2 && (
                    <Icon2 className="w-[15px] h-[15px] group-hover:w-[16px] group-hover:h-[16px] transition-all duration-100 ease-in-out" />
                  )}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-[95%] mt-12 md:mt-0 relative md:w-3/5 h-56 md:h-96 lg:h-[800px] mb-4 rounded-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border">
        <video
          className="w-full h-full object-cover rounded-md"
          loop
          autoPlay
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
