import { ReviewForm } from "@/types";
import { Card, CardHeader, CardContent } from "../ui/card";

export const Questions = ({ reviewForm }: { reviewForm: ReviewForm }) => {
  return (
    <Card className="w-full flex flex-col gap-4 font-satoshi">
      <CardHeader className="text-sm md:text-[18px] md:px-2 lg:px-6 font-medium pb-0">
        {reviewForm.details
          ? reviewForm.details.questionHeader
          : "Reflect on your experience"}
      </CardHeader>
      <CardContent className="flex flex-col gap-3 md:px-2 lg:px-6">
        {reviewForm.details &&
          reviewForm.details.questions.map((question, index) => (
            <div key={index} className="flex items-center gap-6">
              <div className="inline-block">
                <p className="w-[28px] h-[28px] flex items-center justify-center bg-[#EAEBEC] rounded-full text-xs md:text-[12px]">
                  {index + 1}
                </p>
              </div>
              <div>
                <p className="text-xs md:text-[14px] font-[400] text-justify">
                  {question}
                </p>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
