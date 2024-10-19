import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Pencil, Video } from "lucide-react";
import { TimeAgo } from "./TimeAgo";

interface notificationProps {
  firstName: string;
  lastName: string;
  company: string;
  job: string;
  reviewType: string;
  timestamp: string;
}

interface notificationCardProps {
  notification: notificationProps;
}

export const NotificationCard: React.FC<notificationCardProps> = ({
  notification,
}) => {
  const { firstName, lastName, company, job, reviewType, timestamp } =
    notification;
  return (
    <Card className="relative w-7/12 mt-4 bg-gray-50 py-2 pt-2">
      <div className="absolute -top-1 -right-1">
        {reviewType == "text" ? <Pencil size={15} /> : <Video size={15} />}
      </div>
      <CardContent className="w-full flex jusify-center items-center gap-3 pb-0">
        <div>
          <p>
            Congratulations!!!! You have received a {reviewType} testimonial
            from{" "}
            <span className="font-semibold">
              {firstName} {lastName}
            </span>{" "}
            .
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-0 flex justify-between items-center px-2 pl-6">
        <p className="text-sm bg-gray-300 bg-main p-1 rounded-md">
          {job}, {company}
        </p>
        <p className="text-sm text-gray-600">{TimeAgo(timestamp)}</p>
      </CardFooter>
    </Card>
  );
};
