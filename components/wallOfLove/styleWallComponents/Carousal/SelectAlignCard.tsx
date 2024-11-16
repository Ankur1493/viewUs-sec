import { useState } from "react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { WallSidebarWrapper } from "../WallSidebarWrapper";

export const SelectAlignCard = () => {
  const { url, setUrl } = useWallTypeStore();
  const [alignment, setAlignment] = useState("top");
  const options = ["top", "center", "end"];

  const handleAlignmentChange = (newAlignment: string) => {
    setAlignment(newAlignment);
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set("align", newAlignment);
      setUrl(testUrl.toString());
    }
  };

  return (
    <WallSidebarWrapper
      header="Align Cards"
      description="Select alignment for cards"
    >
      {options.map((option) => (
        <button
          key={option}
          className={`py-1 px-2 rounded-md text-xs ${
            alignment === option
              ? "bg-primary text-white"
              : "bg-gray-100 text-black"
          }`}
          onClick={() => handleAlignmentChange(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </WallSidebarWrapper>
  );
};
