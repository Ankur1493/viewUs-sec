import { SelectBackground } from "@/components/wallOfLove/styleWallComponents/SelectBackground";
import { SelectCardBackground } from "@/components/wallOfLove/styleWallComponents/SelectCardBackground";
import { SelectTextColor } from "@/components/wallOfLove/styleWallComponents/SelectTextColor";
import { SelectStar } from "@/components/wallOfLove/styleWallComponents/SelectStarColors";
import { SelectTagBackground } from "@/components/wallOfLove/styleWallComponents/SelectTagBackground";
import { SelectTagTextColor } from "@/components/wallOfLove/styleWallComponents/SelectTagTextColor";
import { Button } from "@/components/ui/button";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { ChevronRight, ArrowLeftIcon } from "lucide-react";

export const WallSidebar = () => {
  const { setPage } = useWallTypeStore();

  return (
    <div className=" h-full text-white p-2 shadow-lg border rounded-md flex flex-col pb-2">
      <div className="space-y-4 flex-grow">
        <SelectBackground />
        <SelectCardBackground />
        <SelectTextColor />
        <SelectStar />
        <SelectTagBackground />
        <SelectTagTextColor />
      </div>
      <div className="bottom-0 flex gap-2">
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
