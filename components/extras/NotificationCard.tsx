import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Video } from "lucide-react";
import { TimeAgo } from "./TimeAgo";

interface notificationProps {
  space: string;
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
  const { space, firstName, lastName, company, job, reviewType, timestamp } =
    notification;
  return (
    <Card className="relative w-8/12 mt-4 bg-gray-50 py-2 pt-2">
      <div className="absolute -top-1 -right-1">
        {reviewType == "text" ? <Pencil size={15} /> : <Video size={15} />}
      </div>
      <CardContent className="w-full flex flex-col jusify-center pb-0">
        <div className="flex ">
          <p className="text-sm text-gray-700 font-semibold">Space: {space}</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm p-0 m-0">
              You have received a {reviewType} testimonial from{" "}
              <span className="font-semibold">
                {firstName} {lastName}
              </span>{" "}
              <span className="text-sm bg-yellow-200 px-3 bg-main p-1 rounded-md">
                {job}, {company}
              </span>
            </p>
          </div>
          <p className="text-sm text-gray-600 p-0 -mb-2">
            {TimeAgo(timestamp)}
          </p>
        </div>
      </CardContent>
      {/* <CardFooter className="p-0 flex justify-between items-center px-2 pl-6"> */}
      {/* </CardFooter> */}
    </Card>
  );
};
