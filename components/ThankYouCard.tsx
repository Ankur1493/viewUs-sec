import React from "react";
import { Card, CardTitle, CardContent } from "./ui/card";

const ThankYouCard = () => {
  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-sm w-full bg-white shadow-lg rounded-lg">
        <CardContent className="p-6">
          <CardTitle className="text-xl font-semibold mb-4 text-center">
            Thank You!
          </CardTitle>
          <p className="text-gray-700 text-center">
            Thank you for submitting your review. We appreciate your feedback!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYouCard;
