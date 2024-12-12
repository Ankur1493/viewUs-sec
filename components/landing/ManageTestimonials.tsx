"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export const ManageTestimonials = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });

  return (
    <div
      className="bg-gradient-radial from-[#141111] to-gray-950 text-white pt-28 p-10 space-y-10 overflow-x-hidden flex justify-center flex-col items-center"
      ref={ref}
    >
      <section className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold"
        >
          Manage testimonials in minutes not hours.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-lg text-gray-400"
        >
          Say goodbye to hours of work—manage testimonials in minutes.
        </motion.p>
      </section>

      <div className="grid grid-cols-4 place-content-center gap-1 md:gap-4 overflow-hidden w-[600px] md:w-[1200px] lg:w-[2000px] h-full">
        <div className="col-span-1 row-span-2 flex items-center justify-center">
          <div className="rounded-lg">
            <Image
              src="/assets/images/Signup.png"
              alt="Image 1"
              layout="responsive"
              width={100}
              height={500}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="col-span-1 grid grid-rows-3 gap-8">
          <div className="rounded-lg flex items-end">
            <Image
              src="/assets/images/dashboard.png"
              alt="Image 2"
              layout="responsive"
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="rounded-lg">
            <Image
              src="/assets/images/importTestimonials.png"
              alt="Image 3"
              layout="responsive"
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="rounded-lg w-[300px] h-[300px] flex items-start overflow-hidden">
            <Image
              src="/assets/images/testimonialsPage.png"
              alt="A preview of the testimonials page"
              layout="responsive"
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="col-span-2 grid grid-rows-2 gap-8">
          <div className="col-span-2 row-span-2">
            <Image
              src="/assets/images/wallOfLovePage.png"
              alt="Image 5"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-md object-cover"
            />
          </div>
          <div className="row-span-1 col-span-1 rounded-lg">
            <Image
              src="/assets/images/test3.webp"
              alt="Image 6"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-md object-cover"
            />
          </div>
          <div className="row-span-1 col-span-1 rounded-lg">
            <Image
              src="/assets/images/test2.webp"
              alt="Image 7"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-md object-fill"
            />
          </div>

          <div className="col-span-2 row-span-2 rounded-lg">
            <Image
              src="/assets/images/test1.webp"
              alt="Image 8"
              layout="responsive"
              width={800}
              height={800}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
