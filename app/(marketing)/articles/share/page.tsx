import Image from "next/image";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function SharePage() {
  return (
    <div className="min-h-screen w-full py-12 lg:px-56">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Collect testimonials easily
        </h1>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-pink-600 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-lg">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Coming soon!
            </h2>
            <p className="mt-4 max-w-[32rem] text-left  text-base/6 text-neutral-200">
              We have a enriched dashboard to let you manage these testimonials at
              warp speed and let you focus on your product.
            </p>
          </div>
          <Image
            src="/assets/images/testimonialsPageMod.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-40 object-contain rounded-2xl"
          />
        </WobbleCard>

      </div>
    </div>
  );
}
