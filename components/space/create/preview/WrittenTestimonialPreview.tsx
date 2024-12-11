import { Video } from "lucide-react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type TestimonialPreviewProps = {
  title?: string;
  description?: string;
  tags?: string[];
  questionHeader?: string;
  questions?: string[];
};

export const WrittenTestimonialPreview = ({
  title,
  description,
  tags,
  questionHeader,
  questions,
}: TestimonialPreviewProps) => {
  return (
    <div className="relative flex justify-center items-center w-full h-[75vh] bg-white p-6 md:px-0 lg:px-6">
      <Card className="w-full h-full px-[2%] border-none shadow-none flex flex-col md:justify-center lg:justify-start">
        <div className="flex flex-col md:gap-0 gap-12 md:flex-row mt-0">
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
            <CardContent className="pb-1 w-full md:w-[85%] px-0 lg:px-6">
              <div>
                <p className="w-full border border-gray-400 rounded-lg h-40 p-3 text-sm md:text-base">
                  {description}
                </p>
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
                    or record a video testimonial <Video size={20} />
                  </p>
                </Button>
              </div>
            </CardContent>
          </div>
          <aside className="md:basis-2/5 lg:basis-1/3 flex flex-col gap-6 ">
            <div className="hidden w-full md:flex flex-col items-center border border-gray-200 px-4 py-4 rounded-lg">
              <div className="flex flex-col items-center gap-3">
                <div className="flex justify-center items-center w-20 h-20 bg-[#E9F8FF] rounded-full">
                  <Video className="text-[#71D4FF]" />
                </div>
                <h5 className="text-center text-[#33313B] text-base font-normal tracking-[2%]">
                  Or create a video testimonial
                </h5>
              </div>
              <button className="mt-4 px-6 py-2 border-2 border-[#71D4FF] text-black rounded-3xl text-sm">
                Record Video Testimonial
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
