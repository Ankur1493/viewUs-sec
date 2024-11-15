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
import { Button } from "@/components/ui/button";

export const SelectTheme = () => {
  const [open, setOpen] = useState(false);
  const { url, setUrl } = useWallTypeStore();
  const [theme, setTheme] = useState("light");
  const options = ["light", "dark"];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set("theme", newTheme);
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
          <CardTitle className="text-md font-medium">Theme</CardTitle>
          {open && (
            <CardDescription className="text-xs">
              Select a theme for your wall of love
            </CardDescription>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 transfor ${open ? "rotate-180" : ""}`}
        />
      </CardHeader>{" "}
      {open && (
        <CardContent className="flex gap-2 py-0">
          {options.map((option) => (
            <Button
              key={option}
              className={`p-0 py-1 flex-1 rounded-md text-xs ${
                theme === option
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
              onClick={() => handleThemeChange(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Button>
          ))}
        </CardContent>
      )}
    </Card>
  );
};
