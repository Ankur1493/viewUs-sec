import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { WallSidebarWrapper } from "./WallSidebarWrapper";

export const SelectStar = () => {
  const [color, setColor] = useState("#71d4fe");
  const [hexInput, setHexInput] = useState("#71d4fe");
  const presetColors = ["#000000", "#71d4fe", "#FFFFFF", "#FFD700", "#FF1493"];
  const { url, setUrl } = useWallTypeStore();

  useEffect(() => {
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set(`star`, color.slice(1));
      setUrl(testUrl.toString());
    }
  }, [color, url, setUrl]);

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexInput(e.target.value);
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      setColor(e.target.value);
    }
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setHexInput(newColor);
  };

  return (
    <WallSidebarWrapper
      header="Star Color"
      description="Select color for stars"
    >
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-6 h-6 p-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
              }}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Pick custom color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <HexColorPicker color={color} onChange={handleColorChange} />
          </PopoverContent>
        </Popover>
        {presetColors.map((presetColor) => (
          <Button
            key={presetColor}
            variant="outline"
            className="w-6 h-6 p-0 rounded-full"
            style={{
              backgroundColor: presetColor,
              border:
                color === presetColor
                  ? "2px solid hsl(var(--primary))"
                  : undefined,
            }}
            onClick={() => handleColorChange(presetColor)}
          >
            <span className="sr-only">Pick color {presetColor}</span>
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={hexInput}
          onChange={handleHexInputChange}
          placeholder="#000000"
          className="w-16 text-xs p-0 px-2"
        />
        <div
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </WallSidebarWrapper>
  );
};
