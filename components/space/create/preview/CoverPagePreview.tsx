import { Button } from "@/components/ui/button";
import { gradients } from "@/constants/gradients";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSpaceDataStore } from "@/store/useSpaceDataStore";
import { cn } from "@/lib/utils";

interface CoverPagePreviewProps {
  title?: string;
  description?: string;
  btnText?: string;
  logo?: string | null;
  btnColor?: string;
  gradientType?: number;
}

export const CoverPagePreview: React.FC<CoverPagePreviewProps> = ({
  title,
  description,
  btnText,
  logo,
  btnColor,
  gradientType,
}) => {
  const { coverPage } = useSpaceDataStore();
  return (
    <div className="relative flex justify-center items-center w-full h-full bg-white">
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: gradients[gradientType ? gradientType - 1 : 0].style,
            filter: "blur(40px)",
          }}
        />
      </div>
      <Card className="max-w-[700px] px-[2%] border-none flex flex-col gap-4 shadow-none">
        {logo ||
          (coverPage.logo && (
            <CardHeader className="flex flex-row gap-3">
              <div className="relative w-[200px] h-[80px]">
                <Image
                  src={logo || coverPage.logo}
                  alt="logo"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="200px"
                />
              </div>
            </CardHeader>
          ))}
        <CardContent>
          <div className="text-[#33313B] font-nromal text-5xl">
            {title || coverPage.title}
          </div>
          <div className="mt-5">{description || coverPage.description}</div>
        </CardContent>
        <CardFooter className="flex">
          <Button
            variant="form"
            className={cn(
              "transition-colors text-white",
              btnColor ? { [`hover:bg-opacity-90`]: true } : {}
            )}
            style={{ backgroundColor: btnColor }}
          >
            {btnText || coverPage.btnText}{" "}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
