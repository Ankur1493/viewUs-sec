import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OauthButton } from "./OauthButton";

interface AuthWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backLabel: string;
  backLabelHref: string;
  description: string;
}

export const AuthWrapper = ({ children, headerLabel, backLabel, backLabelHref, description }: AuthWrapperProps) => {
  return (
    <Card className="w-full mx-3 xl:mx-0 xl:w-1/4 flex  flex-col  shadow-md shadow-input">
      <CardHeader className="text-center">
        <CardTitle >{headerLabel}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <OauthButton />
      </CardContent>

      <CardFooter>
        <Link href={backLabelHref} className="flex">
          <p>{backLabel}</p>
          <ArrowUpRight size={20} />
        </Link>
      </CardFooter>
    </Card>
  )
}
