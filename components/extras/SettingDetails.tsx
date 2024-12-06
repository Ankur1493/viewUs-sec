import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Video, MessageSquare, Zap, Import, BookHeart } from "lucide-react";
import Link from "next/link";

export default function SettingDetails() {
  return (
    <div className="w-full flex items-top justify-center lg:p-4 h-fit">
      <Card className="lg:p-8 flex flex-col gap-4 w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-4">
          <CardTitle className="text-3xl font-bold text-center text-purple-700">
            Subscribe to PRO for
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Card className="border-dashed border-purple-300 flex-1 hover:bg-purple-50 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-center p-0 font-medium text-lg flex flex-col items-center gap-2">
                  <BookHeart className="text-purple-500" />3 Spaces{" "}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-dashed border-pink-300  flex-1 hover:bg-pink-50 transition-colors duration-200">
              <CardHeader className="p-0 px-2 py-6">
                <CardTitle className="text-center font-medium text-lg flex flex-col items-center gap-2">
                  <Import className="text-pink-500" />
                  Infinte Imports
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div className="flex gap-4">
            <Card className="border-dashed border-purple-300 flex-1 hover:bg-purple-50 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-center font-medium text-lg flex flex-col items-center gap-2">
                  <MessageSquare className="text-purple-500" />
                  Infinite Texts
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-dashed border-pink-300 flex-1 hover:bg-pink-50 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-center font-medium text-lg flex flex-col items-center gap-2">
                  <Video className="text-pink-500" />7 Videos
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Link
            href={"/pricing"}
            className={`w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform group"
              }`}
          >
            Upgrade <Zap className="ml-2 group-hover:animate-pulse" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
