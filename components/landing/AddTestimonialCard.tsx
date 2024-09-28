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

export const AddTestimonialCard: React.FC<CardProps> = ({
  step,
  title,
  description,
  imageAlt,
  image,
}) => {
  return (
    <Card className="relative w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-black">
            {step}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src={image}
          alt={imageAlt}
          width={320}
          height={200}
          className="rounded-lg object-cover"
        />
      </CardContent>
    </Card>
  );
};
