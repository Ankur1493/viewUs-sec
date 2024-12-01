import { Video } from "lucide-react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="relative flex justify-center items-center w-full h-[75vh] bg-white p-6">
      <div className="flex flex-row">
        <div className="basis-2/3">
          <header className="flex flex-row gap-3 items-center mb-4">
            <Image
              src="https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
              alt="Logo"
              height={40}
              width={40}
              className="rounded-full"
            />
          </header>
          <section className="w-[85%] space-y-4">
            <h2 className="text-[#33313B] font-medium text-3xl">{title}</h2>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 ">
                {[...Array(5)].map((_, index) => (
                  <div key={index}>
                    <Star className="text-[#71D4FF]" fill="#71D4FF" />
                  </div>
                ))}
              </div>
              <p className="w-full border border-gray-400 rounded-lg h-40 p-3 text-base">
                {description}
              </p>
            </div>
            {tags && tags.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
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
          </section>
          <div className="w-[85%] flex justify-between pt-6">
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
              Submit
            </Button>
          </div>
        </div>

        <aside className="basis-1/3 flex flex-col gap-5 pt-5">
          <div className="w-full flex flex-col items-center border border-gray-200 p-4 rounded-lg">
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
          )}
        </aside>
      </div>
    </div>
  );
};
