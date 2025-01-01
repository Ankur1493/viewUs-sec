import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { gradients } from "@/constants/gradients";
import { Star, Video, Pen } from "lucide-react";
import { useSpaceDataStore } from "@/store/useSpaceDataStore";

type TestimonialPreviewProps = {
  title?: string;
  description?: string;
  tags?: string[];
  questionHeader?: string;
  questions?: string[];
};

export const VideoReviewPreview = ({
  title,
  tags,
  questionHeader,
  questions,
}: TestimonialPreviewProps) => {
  const { design } = useSpaceDataStore();

  return (
    <div className="relative flex justify-center items-center w-full h-[75vh] bg-white p-6 md:px-0 lg:px-6">
      <div className="absolute hidden md:block inset-0 overflow-hidden pointer-events-none z-50">
        <div
          className="absolute md:-bottom-8 md:-left-72 lg:-bottom-20 lg:-left-80 w-[600px] h-[200px]"
          style={{
            transform: "rotate(70deg)",
            background: gradients[design.gradientType].style,
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -top-4 md:-right-96 lg:-right-80 lg:-top-20 w-[600px] h-[200px]"
          style={{
            transform: "rotate(70deg)",
            background: gradients[design.gradientType].style,
            filter: "blur(80px)",
          }}
        />
      </div>
      <Card className="w-full h-full px-[2%] border-none shadow-none flex flex-col md:justify-center lg:justify-start md:overflow-y-hidden">
        <div className="flex flex-col gap-12 md:gap-0 md:flex-row mt-0">
          <div className="flex flex-col gap-2 md:basis-3/5 lg:basis-2/3">
            <div className="lg:px-6">
              <div className="flex flex-col">
                <div className="flex">
                  <Image
                    src="https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
                    alt="Logo"
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="text-[#33313B] font-normal text-2xl md:text-4xl">
                {title}
              </div>
              <div className="flex gap-1 md:pt-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index}>
                    <Star className="text-[#71D4FF]" fill="#71D4FF" />
                  </div>
                ))}
              </div>
            </div>
            <CardContent className="pb-1 px-0 lg:px-6 md:w-[85%]">
              <div>
                <div className="w-full aspect-video">
                  <div
                    className={`bg-zinc-700 rounded-lg overflow-hidden transition-all duration-800  ${"w-full aspect-video"}`}
                  >
                    <div
                      className={`relative w-full h-full flex ${"justify-center"} flex-col items-center`}
                    >
                      <Button
                        className={`w-16 h-16 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 hover:bg-red-600 transition-colors`}
                      >
                        <Video className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {tags && tags?.length > 0 && (
                <div className="flex flex-col gap-2 pt-8">
                  <p>What do we do?</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 border-none rounded-full text-[14px] bg-[#C2F19D] text-black"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-2 md:hidden">
                <Button variant="formOutline" className="w-full">
                  <p className="text-gray-500 flex gap-1 items-center">
                    or Write a testimonial <Pen size={16} />
                  </p>
                </Button>
              </div>
            </CardContent>
          </div>
          <aside className="md:basis-2/5 lg:basis-1/3 flex flex-col gap-6 ">
            <div className="hidden w-full md:flex flex-col items-center border border-gray-200 px-4 py-4 rounded-lg">
              <div className="flex flex-col items-center gap-3">
                <div className="flex justify-center items-center w-20 h-20 bg-[#E9F8FF] rounded-full">
                  <Pen className="text-[#71D4FF]" />
                </div>
                <h5 className="text-center text-[#33313B] text-base font-normal tracking-[2%]">
                  Or create a text testimonial
                </h5>
              </div>
              <button className="mt-4 px-6 py-2 border-2 border-[#71D4FF] text-black rounded-3xl text-sm">
                Submit written Testimonial
              </button>
            </div>
            {questions && questions?.length > 0 && (
              <>
                <div className="space-y-2 mt-4">
                  <h4 className="font-medium">{questionHeader}</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    {questions.map((question, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <Button
                variant="link"
                className="text-black text-[14px] px-0 hover:text-gray-800"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="form"
                className="text-[14px] p-0 py-2 px-4"
              >
                Continue
              </Button>
            </div>
          </aside>
        </div>
      </Card>
    </div>
  );
};
