"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Video, MessageSquare, Zap, Import, BookHeart } from "lucide-react";

export default function SettingDetails() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex items-top justify-center p-4 h-fit">
      <Card className="p-8 flex flex-col gap-4 w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-purple-700">
            Your Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Card className="border-dashed border-purple-300 flex-1 hover:bg-purple-50 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-center font-medium text-lg flex flex-col items-center gap-2">
                  <BookHeart className="text-purple-500" />1{" "}
                  <span className="block text-sm text-gray-600">
                    spaces left
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-dashed border-pink-300 flex-1 hover:bg-pink-50 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-center font-medium text-lg flex flex-col items-center gap-2">
                  <Import className="text-pink-500" />4{" "}
                  <span className="block text-sm text-gray-600">
                    imports left
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div className="flex gap-4">
            <Card className="border-dashed border-pink-300 flex-1 hover:bg-pink-50 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-center font-medium text-lg flex flex-col items-center gap-2">
                  <Video className="text-pink-500" />2{" "}
                  <span className="block text-sm text-gray-600">
                    videos left
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-dashed border-purple-300 flex-1 hover:bg-purple-50 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-center font-medium text-lg flex flex-col items-center gap-2">
                  <MessageSquare className="text-purple-500" />
                  12{" "}
                  <span className="block text-sm text-gray-600">
                    texts left
                  </span>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="w-full"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Button
                    variant="default"
                    className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                  >
                    Upgrade{" "}
                    <Zap
                      className={`ml-2 ${isHovered ? "animate-pulse" : ""}`}
                    />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Unlock more videos and unlimited texts and imports!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
