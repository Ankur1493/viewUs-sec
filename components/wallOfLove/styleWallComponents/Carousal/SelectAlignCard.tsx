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

export const SelectAlignCard = () => {
  const [open, setOpen] = useState(false);
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
          <CardTitle className="text-md font-medium">Align Cards</CardTitle>
          {open && (
            <CardDescription className="text-xs">
              Select alignment for cards
            </CardDescription>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 transform ${open ? "rotate-180" : ""}`}
        />
      </CardHeader>
      {open && (
        <CardContent className="flex flex-col gap-2 pb-2">
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
        </CardContent>
      )}
    </Card>
  );
};
