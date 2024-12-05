import { useState } from "react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { WallSidebarWrapper } from "../WallSidebarWrapper";

export const SelectCardHeight = () => {
  const { url, setUrl } = useWallTypeStore();
  const [height, setHeight] = useState("auto");
  const options = ["fit", "auto"];

  const handleHeightChange = (newHeight: string) => {
    setHeight(newHeight);
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set("height", newHeight);
      setUrl(testUrl.toString());
    }
  };

  return (
    <WallSidebarWrapper
      header="Card Height"
      description="Select the height of the cards"
    >
      {" "}
      <div className="w-full flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            className={`py-1 px-2 rounded-md text-[10px] lg:text-xs ${
              height === option
                ? "bg-primary text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => handleHeightChange(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </WallSidebarWrapper>
  );
};
