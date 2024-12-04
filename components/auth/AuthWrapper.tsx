import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { OauthButton } from "./OauthButton";

interface AuthWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backLabel: string;
  backLabel2: string;
  backLabelHref: string;
}

export const AuthWrapper = ({
  children,
  headerLabel,
  backLabel,
  backLabel2,
  backLabelHref,
}: AuthWrapperProps) => {
  return (
    <Card className="w-full mx-3 md:w-3/5 xl:mx-0 xl:w-1/4 flex  flex-col border-none">
      <CardHeader className="text-center px-0 md:px-6">
        <CardTitle className="text-4xl">{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        <div className="flex flex-row w-full items-center justify-center gap-2 mt-4 text-[#D0D1D2]">
          <div className="w-[40%] border h-[2px]"></div>
          <div className="text-[#838485]">or</div>
          <div className="w-[40%] border h-[2px]"></div>
        </div>
        <OauthButton />
      </CardContent>

      <CardFooter>
        <p className="flex flex-row gap-1">
          {backLabel}{" "}
          <Link href={backLabelHref} className="flex">
            <span className="text-blue-800 underline underline-offset-2">
              {backLabel2}{" "}
            </span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
