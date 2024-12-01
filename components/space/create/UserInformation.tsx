"use client";

import {
  useSpaceDataStore,
  UserInformation as UserInformationType,
} from "@/store/useSpaceDataStore";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { } from "@/store/useSpaceDataStore";
import { useRouter } from "next/navigation";
import { UserInformationPreview } from "./preview/UserInformationPreview";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export const UserInformation = ({ slug, page }: { slug?: string | undefined, page: "edit" | "create" }) => {
  const { userInformation, setUserInformation } = useSpaceDataStore();
  const initializeSpaceData = useSpaceDataStore(
    (state) => state.initializeSpaceData
  );

  useEffect(() => {
    initializeSpaceData();
    console.log("runned")
  }, [initializeSpaceData]);

  const router = useRouter();

  const handleCheckboxChange = (field: keyof UserInformationType) => {
    setUserInformation({
      ...userInformation,
      [field]: !userInformation[field],
    });
  };

  return (
    <div className="w-full pl-2 max-h-screen h-[85vh] flex justify-center overflow-hidden gap-4">
      <div className="max-w-[448px] h-full space-y-6 px-6 pt-5 overflow-y-auto">
        <div className="flex-grow">
          <h1 className="text-[36px] font-medium">
            What info do you want to collect from your users?
          </h1>
          <p className="text-muted-foreground pt-2 font-normal text-[16px]">
            This information can be displayed with customer testimonials. User
            emails will remain private for safety concerns.
          </p>

          <div className="space-y-2 pt-2">
            {(
              Object.entries(userInformation) as [
                keyof UserInformationType,
                boolean
              ][]
            ).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between bg-white p-4 rounded-lg "
              >
                <Label>
                  {" "}
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .replace(/^./, (char) => char.toUpperCase())}
                </Label>
                <Checkbox
                  checked={value}
                  onCheckedChange={() => handleCheckboxChange(key)}
                  className={cn(
                    "border-[#D0D1D2]",
                    "data-[state=checked]:bg-[#71D4FF] data-[state=checked]:border-[#71D4FF] data-[state=checked]:text-black"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[90%]">
        {" "}
        <div className="w-full h-full flex flex-col">
          {" "}
          <div className="h-80% w-full">
            {" "}
            <UserInformationPreview
              userInformation={Object.fromEntries(
                Object.entries(userInformation).map(([key, value]) => [
                  key,
                  value,
                ])
              )}
            />
          </div>{" "}
          <div className="pt-6 flex justify-center items-center">
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  if (page === "create")
                    router.push("/space/create?page=2");
                  else
                    router.push(`/space/${slug}/edit?page=2`);
                }} variant="outline"
                className="border-[#DDDEDF] rounded-full px-20 py-4"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="form"
                onClick={() => {
                  if (page === "create")
                    router.push("/space/create?page=4");
                  else
                    router.push(`/space/${slug}/edit?page=4`);
                }}
                className=" px-20 py-4"
              >
                Next
              </Button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
