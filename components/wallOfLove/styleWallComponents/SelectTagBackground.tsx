import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { ChevronDown } from "lucide-react";

export const SelectTagBackground = () => {
  const [color, setColor] = useState("#000000");
  const [hexInput, setHexInput] = useState("#000000");
  const presetColors = ["#000000", "#FFD700", "#FFE135", "#FFFFFF", "#FF1493"];
  const [open, setOpen] = useState(false);
  const { url, setUrl } = useWallTypeStore();

  useEffect(() => {
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set(`tag`, color.slice(1));
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
    <Card
      className={`w-full max-w-md border-none shadow-none ${
        !open ? "hover:bg-gray-100" : ""
      }`}
    >
      <CardHeader
        className="flex flex-row justify-between gap-0 p-0 py-2 px-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-col">
          <CardTitle className="text-md">Tag Background Color</CardTitle>
          {open && (
            <CardDescription className="text-xs">
              Select a background color for tags
            </CardDescription>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 transfor ${open ? "rotate-180" : ""}`}
        />
      </CardHeader>{" "}
      {open && (
        <CardContent className="flex flex-col gap-4 pb-0">
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-8 h-8 p-0 rounded-full"
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
                className="w-8 h-8 p-0 rounded-full"
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
              className="w-20"
            />
            <div
              className="w-8 h-8 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
