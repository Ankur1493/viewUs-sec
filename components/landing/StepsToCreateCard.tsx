"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

type CardProps = {
  step: number;
  title: string;
  description: string;
  imageAlt: string;
  image: string;
  className?: string;
};

export const StepsToCreateCard: React.FC<CardProps> = ({
  step,
  title,
  description,
  imageAlt,
  image,
}) => {
  return (
    <Card className="relative w-[70%] mb-28 mx-auto bg-secondBackground text-white flex h-[300px]">
      <CardHeader className="px-0 pl-3">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-black">
            {step}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center pl-2">
        <div className="w-1/2">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="pt-4 w-[90%] text-justify">
            {description}
          </CardDescription>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <Image
            src={image}
            alt={imageAlt}
            width={500}
            height={320}
            className="rounded-lg object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
};
