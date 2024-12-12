"use client";

import {
  useSpaceDataStore,
  UserInformation as UserInformationType,
} from "@/store/useSpaceDataStore";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {} from "@/store/useSpaceDataStore";
import { useRouter } from "next/navigation";
import { UserInformationPreview } from "./preview/UserInformationPreview";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export const UserInformation = ({
  slug,
  page,
}: {
  slug?: string | undefined;
  page: "edit" | "create";
}) => {
  const { userInformation, setUserInformation } = useSpaceDataStore();
  const initializeSpaceData = useSpaceDataStore(
    (state) => state.initializeSpaceData
  );

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    initializeSpaceData();
    console.log("runned");
  }, [initializeSpaceData]);

  const router = useRouter();

  const handleCheckboxChange = (field: keyof UserInformationType) => {
    setUserInformation({
      ...userInformation,
      [field]: !userInformation[field],
    });
  };

  return (
    <div className="relative w-full pl-2 max-h-screen h-[85vh] lg:flex justify-center overflow-hidden gap-4">
      <div
        className="absolute lg:hidden right-0 z-50"
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? <Menu /> : <X />}
      </div>
      <div
        className={cn(
          "h-full space-y-6 px-6 pt-5 overflow-y-auto  flex items-center justify-center lg:items-start ",
          isHidden ? "hidden lg:block" : ""
        )}
      >
        <div className="flex-grow max-w-[448px] space-y-6">
          <h1 className="text-2xl md:text-[36px] font-medium">
            What info do you want to collect from your users?
          </h1>
          <p className="text-muted-foreground pt-2 font-normal text-sm md:text-[16px]">
            This information can be displayed with customer testimonials. User
            emails will remain private for safety concerns.
          </p>

          <div className="space-y-2 pt-2">
            {(
              Object.entries(userInformation) as [
                keyof UserInformationType,
                boolean,
              ][]
            ).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between bg-white p-3 md:p-4 rounded-lg "
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
      <div className="md:flex-1 md:relative h-full">
        <div className="md:absolute md:inset-0 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
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
                  if (page === "create") router.push("/space/create?page=2");
                  else router.push(`/space/${slug}/edit?page=2`);
                }}
                variant="outline"
                className="border-[#DDDEDF] rounded-full px-12 md:px-20 py-4"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="form"
                onClick={() => {
                  if (page === "create") router.push("/space/create?page=4");
                  else router.push(`/space/${slug}/edit?page=4`);
                }}
                className="px-12 md:px-20 py-4"
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
