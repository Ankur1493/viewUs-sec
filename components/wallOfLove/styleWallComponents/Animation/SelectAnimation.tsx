import { useState, useEffect } from "react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { Button } from "@/components/ui/button";
import { WallSidebarWrapper } from "../WallSidebarWrapper";

interface SelectAnimationProps {
  onAnimationChange: (isAnimated: boolean) => void;
}

export const SelectAnimation: React.FC<SelectAnimationProps> = ({
  onAnimationChange,
}) => {
  const { url, setUrl } = useWallTypeStore();
  const [theme, setTheme] = useState("off");
  const options = ["on", "off"];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    const isAnimated = newTheme === "on";

    if (url) {
      const testUrl = new URL(url!);
      if (newTheme === "on") {
        testUrl.searchParams.set("animated", newTheme);
      } else {
        testUrl.searchParams.delete("animated");
      }
      setUrl(testUrl.toString());
    }
    onAnimationChange(isAnimated);
  };

  useEffect(() => {
    if (url) {
      const testUrl = new URL(url);
      const animatedParam = testUrl.searchParams.get("animated");
      if (animatedParam === "on") {
        setTheme("on");
        onAnimationChange(true);
      } else {
        setTheme("off");
        onAnimationChange(false);
      }
    }
  }, [url, onAnimationChange]);

  return (
    <WallSidebarWrapper
      header="Animations"
      description="Select animations for your carousal"
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
