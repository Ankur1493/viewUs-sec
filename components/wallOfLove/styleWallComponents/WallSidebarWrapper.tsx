import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface WallSidebarWrappperProps {
  children: React.ReactNode;
  header: string;
  description: string;
}

export const WallSidebarWrapper = ({
  children,
  header,
  description,
}: WallSidebarWrappperProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Card
      className={`w-full max-w-md border-none shadow-none ${
        !open ? "hover:bg-gray-100" : ""
      }`}
    >
      <CardHeader
        className="flex flex-row justify-between gap-0 p-0 py-2 px-4 md:px-2 lg:px-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-col">
          <CardTitle className="text-xs lg:text-sm font-medium">
            {header}
          </CardTitle>
          {open && (
            <CardDescription className="text-[10px] lg:text-xs">
              {description}
            </CardDescription>
          )}
        </div>
        <div className="w-4 h-4">
          <ChevronDown
            className={`h-4 w-4 transfor ${open ? "rotate-180" : ""}`}
          />
        </div>
      </CardHeader>{" "}
      {open && (
        <CardContent className="flex flex-col gap-4 px-6 md:px-2 lg:px-6 pb-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
};
