import { useState, useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useWallTypeStore } from "@/store/useWallTypeStore"

export const SelectBackground = () => {
  const [color, setColor] = useState("#000000")
  const [hexInput, setHexInput] = useState("#000000")
  const presetColors = ["#000000", "#FFD700", "#FFE135", "#FFFFFF", "#FF1493"]
  const { url, setUrl } = useWallTypeStore()

  useEffect(() => {
    console.log("Selected color:", color)
    if (url) {
      const testUrl = new URL(url!)
      testUrl.searchParams.set("background", color.slice(1));
      setUrl(testUrl.toString())
      console.log({ url, testUrl })
    }
  }, [color, url, setUrl])

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexInput(e.target.value)
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      setColor(e.target.value)
    }
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    setHexInput(newColor)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Background Color</CardTitle>
        <CardDescription>Select a background color</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-10 h-10 p-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
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
              className="w-10 h-10 p-0 rounded-full"
              style={{
                backgroundColor: presetColor,
                border: color === presetColor ? "2px solid hsl(var(--primary))" : undefined,
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
            className="w-28"
          />
          <div
            className="w-10 h-10 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </CardContent>
    </Card>
  )
}
