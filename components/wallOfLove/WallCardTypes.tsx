import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useWallTypeStore, WallData } from "@/store/useWallTypeStore";

interface WallCardTypesProps {
  title: string;
  desc: string;
  img: string;
  slug: WallData;
}

export const WallCardTypes = ({ title, desc, img, slug }: WallCardTypesProps) => {

  const { setPage } = useWallTypeStore()

  if (title.length === 0) {
    return (
      <Card className="min-h-60 flex flex-col justify-center items-center">
        <h2 className="text-5xl font-semibold ">More stuff coming soon</h2>
        <p>Give us some time, if you want any specific structure, please <Link href="mailto:team@viewus.in" className="text-blue-400">share it with us</Link></p>
      </Card>
    )
  }

  return (
    <Card
      onClick={() => setPage("editing", slug)}
      className="min-h-60 cursor-pointer shadow-xs hover:shadow-red-200 hover:shadow-sm"
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={img}
          height={300}
          width={300}
          alt="wall type"
          className="w-[80%] h-48"
        />
      </CardContent>
    </Card>
  )
}
