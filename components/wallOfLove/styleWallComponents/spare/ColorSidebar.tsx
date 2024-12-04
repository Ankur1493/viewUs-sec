"use client";

import * as React from "react";
import { HexColorPicker } from "react-colorful";
import { ChevronDown, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
// import { useWallTypeStore } from "@/store/useWallTypeStore";

interface ColorSection {
  id: string;
  title: string;
  description: string;
  defaultColor: string;
  presetColors: string[];
}

const colorSections: ColorSection[] = [
  {
    id: "background",
    title: "Background Color",
    description: "Select a background color",
    defaultColor: "#000000",
    presetColors: ["#000000", "#FFD700", "#FFE135", "#FFFFFF", "#FF1493"],
  },
  {
    id: "cardBackground",
    title: "Card Background",
    description: "Choose card background color",
    defaultColor: "#FFFFFF",
    presetColors: ["#FFFFFF", "#F8F9FA", "#E9ECEF", "#DEE2E6", "#CED4DA"],
  },
  {
    id: "text",
    title: "Text Color",
    description: "Set the text color",
    defaultColor: "#000000",
    presetColors: ["#000000", "#212529", "#495057", "#6C757D", "#ADB5BD"],
  },
  {
    id: "star",
    title: "Star Color",
    description: "Choose star highlight color",
    defaultColor: "#FFD700",
    presetColors: ["#FFD700", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347"],
  },
];

function ColorPicker({
  color,
  onChange,
  presetColors,
}: {
  color: string;
  onChange: (color: string) => void;
  presetColors: string[];
}) {
  const [hexInput, setHexInput] = React.useState(color);

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value);
    }
  };

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    setHexInput(newColor);
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full p-0"
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
            className="h-8 w-8 rounded-full p-0"
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
          className="h-8 w-24"
        />
        <div
          className="h-8 w-8 rounded-full border"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export const ColorSidebar = () => {
  const [colors, setColors] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(
      colorSections.map(({ id, defaultColor }) => [id, defaultColor])
    )
  );
  // const { url, setUrl } = useWallTypeStore();

  // useEffect(() => {
  //   if (url) {
  //     const testUrl = new URL(url!);
  //     // testUrl.searchParams.set(`${}`, color.slice(1));
  //     setUrl(testUrl.toString());
  //   }
  // }, [color, url, setUrl]);

  const [openSection, setOpenSection] = React.useState<string | null>(
    "background"
  );

  const handleColorChange = (sectionId: string, color: string) => {
    setColors((prev) => ({ ...prev, [sectionId]: color }));
  };

  return (
    <SidebarProvider>
      <Sidebar className="w-64 border-r">
        <SidebarHeader className="border-b px-4 py-2">
          <h2 className="text-lg font-semibold">Wall of Love</h2>
        </SidebarHeader>
        <SidebarContent>
          {colorSections.map((section) => (
            <SidebarGroup key={section.id}>
              <Collapsible
                open={openSection === section.id}
                onOpenChange={(open) =>
                  setOpenSection(open ? section.id : null)
                }
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 hover:bg-accent">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: colors[section.id] }}
                    />
                    <SidebarGroupLabel className="text-sm font-medium">
                      {section.title}
                    </SidebarGroupLabel>
                  </div>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 transition-transform duration-200"
                    style={{
                      transform:
                        openSection === section.id
                          ? "rotate(-180deg)"
                          : undefined,
                    }}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <ColorPicker
                      color={colors[section.id]}
                      onChange={(color) => handleColorChange(section.id, color)}
                      presetColors={section.presetColors}
                    />
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
