import { useState } from "react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { Button } from "@/components/ui/button";
import { WallSidebarWrapper } from "../WallSidebarWrapper";

export const SelectDirection = () => {
  const { url, setUrl } = useWallTypeStore();
  const [theme, setTheme] = useState("right");
  const options = ["left", "right"];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set("direction1", newTheme);
      setUrl(testUrl.toString());
    }
  };

  return (
    <WallSidebarWrapper
      header="Animation Direction"
      description="Select a direction for your animations"
    >
      <div className="flex flex-col lg:flex-row gap-2 py-0">
        {options.map((option) => (
          <Button
            key={option}
            className={`p-0 py-1 flex-1 rounded-md text-[10px] lg:text-xs ${
              theme === option
                ? "bg-primary text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
            onClick={() => handleThemeChange(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Button>
        ))}
      </div>
    </WallSidebarWrapper>
  );
};
