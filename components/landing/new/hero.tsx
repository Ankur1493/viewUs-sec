"use client";

import { Shadow } from "@/components/svgs/shadow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  return (
    <main className="h-fit relative overflow-hidden group max-h-fit md:min-h-[55rem] px-4 border mt-4 rounded-2xl bg-white z-[20] drop-shadow-sm pt-14 pb-4 sm:pt-24 sm:pb-24 flex flex-col items-center">
      <Shadow className="absolute -bottom-[30rem] group-hover:-bottom-[27rem] transition-all duration-1000 ease-in-out size-[45rem] group-hover:size-[50rem] -left-20 scale-y-[-1] z-2" />
      <Shadow className="absolute -bottom-[30rem] group-hover:-bottom-[27rem] transition-all duration-1000 ease-in-out size-[45rem] group-hover:size-[50rem] -right-20 scale-y-[-1] z-2" />
      <div className="flex gap-4 items-center flex-col">
        <div>
          <Badge
            variant={"default"}
            className="flex font-bold items-center gap-2"
          >
            <Star className="fill-white size-3 text-white" />
            <p className="text-sm font-primary font-medium">
              Trusted by 2000+ folks
            </p>
          </Badge>
        </div>
        <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl font-primary text-center text-balance max-w-3xl">
          Turn Customer Feedback into Social Proof in Minutes
        </h1>
        <p className="w-full md:max-w-2xl sm:text-lg text-center text-balance">
          Viewus helps you seamlessly collect and manage customer testimonials.
          No Developers, No complex setup.
        </p>
      </div>
      <div className="flex items-center w-full justify-center sm:w-auto mt-4 gap-3">
        <Button className="ring-4 flex-1 transition-all duration-300 group  overflow-hidden hover:ring-foreground/10 relative px-10 sm:px-16 mt-4 py-6 group">
          <div className="w-14 absolute bg-accent/20 -translate-x-[10rem] group-hover:translate-x-[10rem] transition-all duration-500 ease-in-out rotate-[30deg] h-[10rem]"></div>
          <span className="relative z-10">Get Started</span>
        </Button>
        <Button
          variant={"secondary"}
          className="border flex-1 px-10 sm:px-16 mt-4 py-6"
        >
          Book a Demo
        </Button>
      </div>

      <div className="max-w-2xl mt-14 md:mt-0 md:absolute z-[10] bg-white bottom-10 md:-bottom-36 sm:drop-shadow-2xl bg-background rounded-xl ring-4 ring-secondary overflow-hidden mx-auto border border-accent">
        <Image
          src={"/assets/dashboard.jpg"}
          width={1000}
          height={1000}
          className="object-contain [mask-image:linear-gradient(to_top,transparent,white_70%)]"
          alt="img"
        />
      </div>
    </main>
  );
};
