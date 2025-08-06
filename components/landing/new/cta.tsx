import { Circle } from "@/components/svgs/circle";
import { CombinedCircleX } from "@/components/svgs/combined-circle-x";
import { CombinedCircleY } from "@/components/svgs/combined-circle-y";
import { Button } from "@/components/ui/button";

export const Cta = () => {
  return (
    <section className=" relative">
      {/* <Shadow className="absolute top-10 blur-[1em] size-[20rem] lg:size-[30rem] -translate-x-1/2 -translate-y-1/2 left-1/2 rotate-[-30deg]" /> */}

      <div
        //   style={{
        //     backgroundImage: "url(/assets/blue-bg.png)",
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //     backgroundRepeat: "no-repeat",
        //   }}
        className=" relative overflow-hidden bg-primary/10 h-[25rem] flex items-start gap-4 justify-start rounded-[2rem]  mx-auto mb-10 p-6 md:p-10"
      >
        <CombinedCircleX className="absolute hidden md:block top-[55%] z-[10] md:size-[63rem] lg:size-[70rem] -translate-y-1/2 -right-[45rem]" />
        <CombinedCircleY className="absolute block md:hidden -bottom-[40rem] z-[10] size-[40rem] -translate-y-1/2 left-1/2 -translate-x-1/2" />
        {/* <CombinedCircleY className="absolute top-1/2 -translate-y-1/2 -right-20" /> */}
        <Circle className="size-[40rem]  rounded-full  ring-offset-[20px] absolute right-1/2 translate-x-1/2 md:-right-[2rem] top-[140%] sm:top-[120%] md:top-1/2 -translate-y-1/2" />
        {/* <BorderLogo className="size-60 absolute right-1/2 translate-x-1/2 lg:right-20 z-[20] drop-shadow-2xl -bottom-20 lg:top-1/2 -translate-y-1/2" /> */}
        {/* <Shadow className="absolute top-[80%] size-[40rem] lg:size-[70rem] -translate-y-1/2 -left-[80%] md:-left-[40%] lg:-left-[75%] rotate-[10deg]" />
        <Shadow className="absolute top-[80%] size-[40rem] lg:size-[70rem] -translate-y-1/2 -right-[80%] md:-right-[40%] lg:-right-[75%] -rotate-[10deg] scale-x-[-1]" /> */}
        <div className="flex flex-col items-center md:items-start gap-4 py-4 md:py-10">
          <div className="z-[100] font-primary text-center md:text-left max-w-2xl text-balance font-semibold text-3xl md:text-4xl">
            Are you excited to elevate your brand value ?
          </div>
          <p className="md:max-w-lg md:block hidden">
            Viewus helps you seamlessly collect and manage customer
            testimonials. No Developers, No complex setup.
          </p>
          <Button className="z-[100]">
            <span>Get Started</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
