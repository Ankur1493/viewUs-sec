"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export function Features() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto w-full px-3 lg:px-0">
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-pink-600 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-lg">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Easily manage all of your testimonials from one place
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
          className="absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-4 lg:-bottom-16 object-contain rounded-2xl"
        />
      </WobbleCard>

      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-violet-600 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Collect Testimonials Easily
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            gather all types of testimonials in just a few clicks. No need for
            complicated forms or technical setups.
          </p>
        </div>
        <Image
          src="/assets/images/reviewPageMod.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[20%] grayscale filter -bottom-4 lg:-bottom-16 object-contain rounded-2xl"
        />
      </WobbleCard>
      <Card className="col-span-1 bg-orange-600 min-h-[300px] relative  h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden">
        <CardContent className="flex flex-col h-full justify-center ">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Still not Impressed?
          </h2>
          <p className="my-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            let us show you how we can increase your sales
          </p>
          <Link href="/login" className="w-full">
            <Button
              className="w-full bg-neutral-200 hover:bg-white text-xl font-semibold py-6 rounded-2xl"
              variant="secondary"
            >
              Start for free
            </Button>
          </Link>
        </CardContent>
      </Card>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-red-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-md">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Share your Testimonials Anywhere
          </h2>
          <p className="mt-4 max-w-[32rem] text-left  text-base/6 text-neutral-200">
            start showcasing what your customers have to say easily. Integrate
            your testimonials in your blogs, sales page or anywhere you like.
          </p>
        </div>
        <Image
          src="/assets/images/importTestimonialsMod.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-32 lg:-bottom-40 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
