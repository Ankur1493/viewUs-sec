import { useState } from "react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { WallSidebarWrapper } from "./WallSidebarWrapper";

export const SelectCardBorderRadius = () => {
  const { url, setUrl } = useWallTypeStore();
  const [radius, setRadius] = useState("high");
  const options = ["low", "medium", "high"];

  const handleRadiusChange = (newRadius: string) => {
    setRadius(newRadius);
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set("cardBorderRadius", newRadius);
      setUrl(testUrl.toString());
    }
  };

  return (
    <WallSidebarWrapper
      header="Card Border Radius"
      description="Select a border radius for your cards"
    >
      <div className="w-full flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            className={`py-1 px-2 rounded-md text-[10px] lg:text-xs ${
              radius === option
                ? "bg-primary text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => handleRadiusChange(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </WallSidebarWrapper>
  );
};
