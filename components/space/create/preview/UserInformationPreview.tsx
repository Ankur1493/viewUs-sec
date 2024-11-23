import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PreviewSectionProps = {
  userInformation: Record<string, boolean>;
};

export const UserInformationPreview: React.FC<PreviewSectionProps> = ({
  userInformation,
}) => {
  return (
    <div className="flex justify-center items-center w-full h-[75vh] bg-white">
      <Card className="relative w-[550px] px-[2%] h-full overflow-y-auto scrollbar-hidden border-none shadow-none font-satoshi">
        <CardHeader>
          <CardTitle className="text-left text-[#33313B] text-[36px] font-[500]">
            Tell us about Yourself
          </CardTitle>
          <CardDescription className="text-[#222222] font-[400] text-[16px] leading-[24px]">
            This information may be displayed with your testimonial.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-[14px]">
          <div className="space-y-4 mt-3">
            {(
              Object.entries(userInformation) as [
                keyof typeof userInformation,
                boolean
              ][]
            ).map(([key, value]) => (
              <div key={key}>
                <Label className="capitalize text-[#33313B] text-[14px] font-medium">
                  {key.replace(/([A-Z])/g, " $1").trim()} {value && "*"}
                </Label>
                <input
                  type={key === "email" ? "email" : "text"}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm h-[48px]"
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  disabled
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="form">Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
