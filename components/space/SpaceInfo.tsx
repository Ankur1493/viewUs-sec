import { Video, MessageSquare, Edit } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function SpaceInfo() {
  return (
    <header className="w-full space-y-1 lg:space-y-0 justify-between items-center mt-6 border-b px-6 pl-9 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm">
            <Image
              src="/assets/images/avatar.webp"
              alt="Logo"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">calenso</h1>
            <p className="text-sm text-gray-400 px-0 mx-0">
              Public Url:{" "}
              <Link
                href="http://viewUs.in/a/calenso"
                className="underline underline-offset-4"
              >
                http://viewUs.in/a/calenso
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              <Video className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">1</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              <MessageSquare className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">1</span>
            </div>
          </div>
          <Button className="flex items-center space-x-2 white px-4 py-2 rounded-full font-medium transition-all hover:shadow-md focus:outline-none focus:ring-2 ">
            <Edit className="w-4 h-4" />
            <span>Edit space</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
