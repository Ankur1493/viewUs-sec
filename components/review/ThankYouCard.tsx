import React from "react";
import { Card, CardTitle, CardContent } from "../ui/card";
import { PartyPopper } from "lucide-react";
import { ReviewForm } from "@/types";

export const ThankYouCard = ({ reviewForm }: { reviewForm: ReviewForm }) => {
  return (
    <div className="flex items-center justify-center">
      <Card className="border-none shadow-none">
        <div className="bg-[#E9F8FF] w-[80px] h-[80px] rounded-full flex justify-center items-center mx-6">
          <PartyPopper color="#009EE2" size={30} />
        </div>
        <CardContent className="p-6">
          <CardTitle className="text-[36px] font-[500] mb-4">
            {reviewForm.details
              ? reviewForm.details.thankyouTitle
              : "Thanks for the feedback!"}
          </CardTitle>
          <p className="text-[14px] font-[400]">
            {reviewForm.details
              ? reviewForm.details.thankyouMessage
              : "We appreciate you taking the time to provide us a testimonial. "}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
