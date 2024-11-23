import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star, Video, Square, Pen } from "lucide-react";

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
  return (
    <div className="relative flex justify-center items-center w-full h-[75vh] bg-white p-6">
      {" "}
      <Card className="w-full h-full px-[2%] border-none shadow-none flex flex-col">
        <div className="flex flex-row mt-0">
          <div className="flex flex-col gap-2 basis-2/3">
            <div className="px-6">
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
              <div className="text-[#33313B] font-normal text-4xl">{title}</div>
              <div className="flex gap-1 ">
                {[...Array(5)].map((_, index) => (
                  <div key={index}>
                    <Star className="text-[#71D4FF]" fill="#71D4FF" />
                  </div>
                ))}
              </div>
            </div>
            <CardContent className="pb-1 w-[85%]">
              <div>
                <div className="w-full aspect-video">
                  <div
                    className={`bg-zinc-700 rounded-lg overflow-hidden transition-all duration-800  ${"w-full aspect-video"}`}
                  >
                    <div
                      className={`relative w-full h-full flex ${"justify-center"} flex-col items-center`}
                    >
                      <Button
                        className={`w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 hover:bg-red-600 transition-colors`}
                      >
                        <Video className="w-8 h-8 text-white" />
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
            </CardContent>
          </div>
          <aside className="basis-1/3 flex flex-col gap-6 ">
            <div className="w-full flex flex-col items-center border border-gray-200 px-4 pt-4 rounded-lg">
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
            {questions && (
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
