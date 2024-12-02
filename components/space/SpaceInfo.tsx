import { Video, MessageSquare, Import } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SpaceEditButton } from "../dashboard/SpaceEditButton";

interface SpaceInfoProps {
  slug: string;
  testimonialCounts: {
    total: number;
    text: number;
    video: number;
    imported: number;
  };
}

export default function SpaceInfo({ slug, testimonialCounts }: SpaceInfoProps) {
  return (
    <header className="w-full space-y-1 lg:space-y-0 justify-between items-center mt-6 border-b px-6  py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">{slug}</h1>
            <p className="text-sm text-gray-400 px-0 mx-0">
              Public Url:{" "}
              <Link
                href={`http://localhost:3000/space/${slug}`}
                className="underline underline-offset-4"
              >
                {`http://localhost:3000/space/${slug}`}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            {testimonialCounts?.video && (
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                <Video className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  {testimonialCounts.video}
                </span>
              </div>
            )}
            {testimonialCounts?.text && (
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                <MessageSquare className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  {testimonialCounts.text}
                </span>
              </div>
            )}
            {testimonialCounts?.imported && (
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                <Import className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  {testimonialCounts.text}
                </span>
              </div>
            )}
          </div>
          <Button className="flex items-center space-x-2 white px-4 py-2 rounded-full font-medium transition-all hover:shadow-md focus:outline-none focus:ring-2 ">
            Edit
            <SpaceEditButton slug={slug} />
          </Button>
        </div>
      </div>
    </header>
  );
}
