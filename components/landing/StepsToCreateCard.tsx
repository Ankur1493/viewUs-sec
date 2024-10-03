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
    <Card className="relative w-[70%] mb-28 mx-auto rounded-2xl bg-secondBackground text-white flex h-[300px]">
      <CardHeader className="px-4">
        <div className="flex flex-col items-center justify-around h-full relative">
          {[1, 2, 3].map((s, index) => (
            <div key={s} className="relative flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  s === step ? "bg-black text-white" : "bg-gray-200 text-black"
                }`}
              >
                {s}
              </div>
              {index < 2 && (
                <div
                  className="w-0.5 h-10 bg-black"
                  style={{ position: "absolute", top: "3rem" }}
                />
              )}
            </div>
          ))}
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
