import { SelectBackground } from "@/components/wallOfLove/styleWallComponents/SelectBackground";
import { SelectCardBackground } from "@/components/wallOfLove/styleWallComponents/SelectCardBackground";
import { SelectTextColor } from "@/components/wallOfLove/styleWallComponents/SelectTextColor";
import { SelectStar } from "@/components/wallOfLove/styleWallComponents/SelectStarColors";
import { SelectTagBackground } from "@/components/wallOfLove/styleWallComponents/SelectTagBackground";
import { SelectTagTextColor } from "@/components/wallOfLove/styleWallComponents/SelectTagTextColor";
import { Button } from "@/components/ui/button";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { ChevronRight, ArrowLeftIcon } from "lucide-react";
import { SelectBorderRadius } from "./SelectBorderRadius";
import { SelectCardBorderRadius } from "./SelectCardBorderRadius";
import { SelectTheme } from "./SelectTheme";
import { SelectShadowColor } from "./Animation/SelectShadowColor";
import "./WallSidebar.css";
import { SelectSpeed } from "./Animation/SelectSpeed";
import { SelectColumns } from "./Grid/SelectColumns";
import { SelectAlignCard } from "./Carousal/SelectAlignCard";
import { SelectCardHeight } from "./Carousal/SelectCardHeight";

export const WallSidebar = () => {
  const { data, setPage } = useWallTypeStore();

  return (
    <div className="h-full text-white p-2 shadow-lg border rounded-md flex flex-col pb-2 overflow-y-hidden">
      <h2 className="text-black text-lg py-2 font-semibold text-center">
        Wall of Love
      </h2>
      <div className="space-y-4 flex-grow overflow-y-auto no-scrollbar">
        <SelectTheme />
        <SelectBackground />
        <SelectCardBackground />
        <SelectTextColor />
        <SelectStar />
        <SelectTagBackground />
        <SelectTagTextColor />
        <SelectCardBorderRadius />
        {data === "animated" || data === "fixed" ? (
          <>
            <SelectColumns />
            {data === "animated" && (
              <>
                <SelectBorderRadius />
                <SelectShadowColor />
                <SelectSpeed />
              </>
            )}
          </>
        ) : null}
        {data === "carousal" || data === "animated-carousal" ? (
          <>
            <SelectCardHeight />
            <SelectAlignCard />
            {data === "animated-carousal" && (
              <>
                <SelectBorderRadius />
                <SelectShadowColor />
                <SelectSpeed />
              </>
            )}
          </>
        ) : null}
      </div>
      <div className="bottom-0 flex gap-2 pt-6">
        <Button
          onClick={() => setPage("all", null)}
          className="bg-white text-black hover:bg-gray-100 flex-1 flex gap-2 border shadow-xl"
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
