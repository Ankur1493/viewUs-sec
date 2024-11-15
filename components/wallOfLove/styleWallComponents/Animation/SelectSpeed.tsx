import { useState } from "react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export const SelectSpeed = () => {
  const [open, setOpen] = useState(false);
  const { url, setUrl } = useWallTypeStore();
  const [radius, setRadius] = useState("low");
  const options = ["low", "medium", "high"];

  const handleRadiusChange = (newRadius: string) => {
    setRadius(newRadius);
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set("speed", newRadius);
      setUrl(testUrl.toString());
    }
  };

  return (
    <Card
      className={`w-full border-none shadow-none ${
        !open ? "hover:bg-gray-100" : ""
      }`}
    >
      <CardHeader
        className="flex flex-row justify-between gap-0 p-0 py-2 px-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-col">
          <CardTitle className="text-md font-medium">Animation Speed</CardTitle>
          {open && (
            <CardDescription className="text-xs">
              Select speed for your animation
            </CardDescription>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 transfor ${open ? "rotate-180" : ""}`}
        />
      </CardHeader>{" "}
      {open && (
        <CardContent className="flex flex-col gap-2 pb-2">
          {options.map((option) => (
            <button
              key={option}
              className={`py-1 px-2 rounded-md text-xs ${
                radius === option
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handleRadiusChange(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </CardContent>
      )}
    </Card>
  );
};
