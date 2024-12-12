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
import { useState, useEffect } from "react";

interface CoverPagePreviewProps {
  name?: string | undefined;
  slug?: string | undefined;
  title?: string;
  description?: string;
  btnText?: string;
  logo?: string | File | null;
  btnColor?: string;
  gradientType?: number;
}

export const CoverPagePreview: React.FC<CoverPagePreviewProps> = ({
  name,
  slug,
  title,
  description,
  btnText,
  logo,
  btnColor,
  gradientType,
}) => {
  const { coverPage, spaceCreationDetails } = useSpaceDataStore();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (logo instanceof File) {
      const url = URL.createObjectURL(logo);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof logo === "string") {
      console.log({ slug, message: "aagya yaha" });
      if (slug && logo === `space/${slug}-${name}-logo`)
        setLogoUrl(`https://d3eyp937ijscg0.cloudfront.net/${logo}`);
      else setLogoUrl(logo);
    } else {
      setLogoUrl(null);
    }
  }, [logo]);

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
        <CardHeader className="pb-0 md:pb-6">
          <h2
            className="text-xl md:text-3xl font-medium"
            style={{ textTransform: "uppercase" }}
          >
            {spaceCreationDetails.projectName}
          </h2>
        </CardHeader>
        {logoUrl && (
          <CardHeader className="flex flex-row gap-3">
            <div className="relative w-[200px] h-[80px]">
              <Image
                src={logoUrl}
                alt="logo"
                fill
                style={{ objectFit: "cover" }}
                sizes="200px"
              />
            </div>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-[#33313B] font-nromal text-3xl md:text-5xl">
            {title || coverPage.title}
          </div>
          <div className="mt-5 text-sm">
            {description || coverPage.description}
          </div>
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
