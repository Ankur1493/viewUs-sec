import React from "react";
import { NotificationCard } from "./NotificationCard";

const notificationData = [
  {
    firstName: "John",
    lastName: "Doe",
    company: "Microsoft",
    job: "Software Developer",
    reviewType: "text",
    timestamp: "2024-10-18T10:24:00",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    company: "Apple",
    job: "Graphic Designer",
    reviewType: "video",
    timestamp: "2024-10-18T09:15:00",
  },
  {
    firstName: "Mark",
    lastName: "Johnson",
    company: "Flipkart",
    job: "Product Manager",
    reviewType: "text",
    timestamp: "2024-10-17T14:00:00",
  },
];

export const NotificationDetails = () => {
  return (
    <div className="container mx-auto px-4 overflow-hidden">
      <div className="mb-8 px-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
          Notifications
        </h2>
      </div>
      <div className="px-6">
        {notificationData.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
};
