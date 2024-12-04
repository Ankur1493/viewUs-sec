import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useWallTypeStore, WallData } from "@/store/useWallTypeStore";
import { cn } from "@/lib/utils";

interface WallCardTypesProps {
  index: number;
  title: string;
  desc: string;
  img: string;
  slug: WallData;
  url: string;
}

export const WallCardTypes = ({
  index,
  title,
  desc,
  img,
  slug,
  url,
}: WallCardTypesProps) => {
  const { setPage, setUrl } = useWallTypeStore();

  if (title.length === 0) {
    return (
      <Card className="min-h-60 flex flex-col justify-center items-center">
        <h2 className="text-5xl font-semibold ">More stuff coming soon</h2>
        <p>
          Give us some time, if you want any specific structure, please{" "}
          <Link href="mailto:team@viewus.in" className="text-blue-400">
            share it with us
          </Link>
        </p>
      </Card>
    );
  }

  return (
    <Card
      onClick={() => {
        setPage("editing", slug);
        setUrl(url);
      }}
      className={cn(
        "min-h-[400px] cursor-pointer group overflow-hidden",
        index === 0 || index === 3 || index === 4
          ? "border-dashed border-pink-300 hover:bg-pink-50 transition-colors duration-200"
          : "border-dashed border-purple-300 hover:bg-purple-50 transition-colors duration-200"
      )}
    >
      <CardHeader className="border-dashed border-b transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold mb-2 group-hover:text-purple-700 transition-colors duration-300">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              {desc}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div className="relative w-full h-64 overflow-hidden rounded-md">
          <Image
            src={img}
            alt="wall type"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
      </CardContent>
    </Card>
  );
};
