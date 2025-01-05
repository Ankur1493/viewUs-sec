"use client";
import { SelectBackground } from "@/components/wallOfLove/styleWallComponents/SelectBackground";
import { SelectCardBackground } from "@/components/wallOfLove/styleWallComponents/SelectCardBackground";
import { SelectTextColor } from "@/components/wallOfLove/styleWallComponents/SelectTextColor";
import { SelectStar } from "@/components/wallOfLove/styleWallComponents/SelectStarColors";
import { SelectTagBackground } from "@/components/wallOfLove/styleWallComponents/SelectTagBackground";
import { SelectTagTextColor } from "@/components/wallOfLove/styleWallComponents/SelectTagTextColor";
import { Button } from "@/components/ui/button";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { ChevronRight, ArrowLeftIcon, X } from "lucide-react";
import { SelectBorderRadius } from "./SelectBorderRadius";
import { SelectCardBorderRadius } from "./SelectCardBorderRadius";
import { SelectTheme } from "./SelectTheme";
import { SelectShadowColor } from "./Animation/SelectShadowColor";
import "./WallSidebar.css";
import { SelectSpeed } from "./Animation/SelectSpeed";
import { SelectColumns } from "./Grid/SelectColumns";
import { SelectAlignCard } from "./Carousal/SelectAlignCard";
import { SelectCardHeight } from "./Carousal/SelectCardHeight";
import { SelectCardBorderColor } from "./SelectCardBorderColor";
import { SelectDirection } from "./Animation/SelectDirection";
import { SelectDirection2 } from "./Animation/SelectDirection2";
import { SelectAnimation } from "./Animation/SelectAnimation";
import { useEffect, useState } from "react";
import { SelectQuoteColor } from "./Carousal/SelectQuoteColor";
import { SelectImageBackground } from "./SelectImageBackground";

interface SidebarToggleProps {
  onClick: () => void;
  isSidebarOpen: boolean;
}

export const WallSidebar = ({ onClick, isSidebarOpen }: SidebarToggleProps) => {
  const { data, setPage } = useWallTypeStore();
  const [isAnimated, setIsAnimated] = useState(false);

  const handleAnimationChange = (isAnimatedTrue: boolean) => {
    setIsAnimated(isAnimatedTrue);
  };

  useEffect(() => {
    console.log("isAnimated", isAnimated);
  }, [isAnimated]);

  return (
    <div className=" relative h-full text-white lg:p-2 shadow-lg border rounded-md flex flex-col pb-2 overflow-y-hidden">
      {isSidebarOpen && (
        <div className="absolute top-1 right-1 ">
          <X size={15} onClick={onClick} color="black" />{" "}
        </div>
      )}
      <h2 className="text-black text-base lg:text-lg py-2 font-semibold text-center">
        Customize your{" "}
        <span className="block md:inline lg:block">Wall of Love</span>
      </h2>
      <div className="space-y-2 flex-grow overflow-y-auto no-scrollbar border-t py-1">
        <SelectTheme />
        <SelectBorderRadius />
        <SelectBackground />
        <SelectCardBackground />
        <SelectCardBorderColor />
        <SelectCardBorderRadius />
        <SelectTextColor />
        <SelectStar />
        <SelectTagBackground />
        <SelectTagTextColor />
        {data === "animated" || data === "fixed" ? (
          <>
            <SelectColumns />
            {data === "animated" && (
              <>
                {/* <SelectBorderRadius /> */}
                {/* <SelectShadowColor /> */}
              </>
            )}
          </>
        ) : null}
        {data === "carousal-vertical" ? (
          <>
            <SelectCardHeight />
            <SelectAlignCard />
          </>
        ) : null}
        {data === "carousal-2rows-animated" ||
        data === "carousal-horizontal" ||
        data === "carousal-vertical" ? (
          <>
            {data === "carousal-horizontal" || data === "carousal-vertical" ? (
              <SelectAnimation onAnimationChange={handleAnimationChange} />
            ) : null}
            {isAnimated ||
              (data === "carousal-2rows-animated" && (
                <>
                  <SelectImageBackground />
                  <SelectQuoteColor />
                  <SelectShadowColor />
                  <SelectSpeed />
                  <SelectDirection />
                  {data === "carousal-2rows-animated" && <SelectDirection2 />}
                </>
              ))}
            {data === "carousal-horizontal" && <SelectQuoteColor />}
          </>
        ) : null}
      </div>

      <div className="bottom-0 flex flex-col lg:flex-row gap-2 pt-6 px-2 lg:px-0">
        <Button
          onClick={() => setPage("all", null)}
          className="bg-white text-black hover:bg-gray-100 flex-1 flex gap-2 border shadow-md"
        >
          <ArrowLeftIcon size={20} />
          Back
        </Button>
        <Button
          onClick={() => setPage("final", null)}
          className="flex gap-2 flex-1"
        >
          Go Next
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};
