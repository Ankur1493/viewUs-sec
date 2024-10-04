"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
    <Card
      className={cn(
        "flex h-[450px] relative w-[70%] mb-12 mx-auto rounded-2xl bg-secondBackground text-gray-900",
        step === 2 ? "bg-gray-300" : step === 3 ? "bg-secondBackground" : ""
      )}
    >
      <CardHeader className="px-4">
        <div className="flex flex-col items-center justify-around h-full relative">
          {[1, 2, 3].map((s, index) => (
            <div key={s} className="relative flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full text-white ${
                  s === step ? "bg-black" : "bg-gray-900"
                }`}
              >
                {s}
              </div>
              {index < 2 && (
                <div
                  className="w-0.5 h-28 bg-black"
                  style={{ position: "absolute", top: "3rem" }}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center pl-2">
        <div className="w-2/3">
          <CardTitle className="text-5xl font-bold text-black">
            {title}
          </CardTitle>
          <CardDescription className="pt-4 w-[80%] text-lg text-justify">
            {description}
          </CardDescription>
        </div>
        <div className=" flex items-center h-[450px] justify-center">
          <Image
            src={image}
            alt={imageAlt}
            width={500}
            height={500}
            className="rounded-lg shadow-lg shadow-gray-500 w-[400px] h-[350px] object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
};
