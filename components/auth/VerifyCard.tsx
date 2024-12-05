import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "../ui/card";
import { VerificationButton } from "@/components/auth/VerificationButton";
import { Button } from "../ui/button";
import Link from "next/link";

export const VerifyCard = ({
  title,
  content,
  mail,
}: {
  title: string;
  content: string;
  mail: string;
}) => {
  return (
    <Card className="w-full mx-3 md:w-3/5 xl:mx-0 xl:w-1/4 flex  flex-col border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {content} <span className="font-semibold">{mail}</span>.
      </CardContent>
      <CardFooter className="flex flex-col px-6 justify-start items-start">
        Verify your email to start using ViewUs.
        <div className="flex justify-between w-full">
          <VerificationButton email={mail} />
          <Button variant="link">
            <Link href="/dashboard">Do it later</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
