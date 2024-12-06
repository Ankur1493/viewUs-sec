"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NotificationCardProps {
  message: string;
  imageUrl: string;
}

export const UpdatesNotificationCard: React.FC<NotificationCardProps> = ({
  message,
  imageUrl,
}) => {
  const [status, setStatus] = useState(false);
  return (
    <Card
      className={cn(
        "fixed bg-gradient-to-bl from-blue-100 to-blue-500 bottom-2 md:bottom-4 md:rounded-l-2xl md:rounded md:rounded-bl-2xl md:rounded-tr-2xl md:rounded-tl-2xl border border-blueButton right-2 md:right-4 w-[300px] md:w-[450px] h-[300px] shadow-lg",
        status === true ? "hidden" : "block"
      )}
    >
      <CardContent className="p-4 h-full pt-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 z-10"
          onClick={() => setStatus(true)}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-5 items-start h-full">
          <div className="w-full h-1/2 relative">
            <Image
              src={imageUrl}
              alt="Notification"
              layout="fill"
              className="object-cover"
            />
          </div>

          <p className="text-md">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
};
