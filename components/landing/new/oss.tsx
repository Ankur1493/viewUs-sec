import Github from "@/components/svgs/github";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const Oss = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/assets/blue-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="border h-80 rounded-[2rem] p-7 md:p-10"
    >
      <div className="flex flex-col items-start justify-between h-full">
        <div className="flex md:flex-row flex-col gap-4 items-start w-full justify-between">
          <div className="text-white font-primary font-medium text-3xl sm:text-4xl lg:text-5xl max-w-full sm:max-w-xl">
            We are proudly powered by open source
          </div>
          <Button className="bg-accent/20 backdrop-blur-xl">
            <Star className="size-4 fill-yellow-500 text-yellow-500 mr-2" />
            <span className="mr-1">1250+</span>
            <span>Stars</span>
          </Button>
        </div>
        <Button variant={"secondary"}>
          <Github className="size-4 mr-2" />
          <span>Visit Github</span>
        </Button>
      </div>
    </div>
  );
};
