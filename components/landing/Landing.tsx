import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Features } from "@/components/landing/Features";
import { StepstoCreate } from "@/components/landing/StepsToCreate";
import TriangleFeature from "@/components/landing/TriangleGrid";
import HeroImage from "@/components/landing/HeroImage";
import { Footer } from "@/components/Footer";
import HardCodedTestimonials from "./HardCodedTestimonials";
import { BookCall } from "./BookCall";

export const Landing = () => {
  return (
    <div className="flex flex-col items-center relative top-0 w-full transform">
      <Navbar />
      <div className="absolute z-0 top-20 w-full flex justify-center">
        <TriangleFeature />
      </div>
      <div className="w-screen z-10 flex flex-col items-center md:mt-24 mt-12">
        <div className="flex flex-col justify-center items-center w-full md:w-11/12 lg:w-4/6">
          <h1 className="text-4xl mt-2 md:text-5xl lg:text-6xl font-bold pb-3 text-center">
            Showcase your Testimonials
            with Minimal Effort
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center text-gray-400 w-3/4 md:1/6 lg:w-2/5 ">
          <p className="text-md md:text-xl text-center">
            ViewUs helps you seamlessly collect and manage customer
            testimonials.
            <span className="block">No Developers, No complex setup.</span>
          </p>
        </div>
        <div className="flex gap-2 w-fit pt-6">
          <Link
            href={"/login"}
            className="w-fit p-3 flex-1 px-5 border-white bg-gradient-to-br from-violet-700 to-orange-500 text-white text-[24px] font-bold rounded-xl  text-center cursor-pointer"
          >
            Start for Free
          </Link>
        </div>
        <div>
          <HeroImage imageSrc="/assets/images/HeroImage.png" />
        </div>
        <div className="relative w-full my-12 top-16 md:top-28 lg:top-40">
          <h2 className="text-3xl md:text-6xl font-bold text-center mb-2">
            See what our users say about us
          </h2>
          <p className="text-xl text-center text-gray-500 mb-12">
            Our very own wall of love. Or complaints. Whatever you want to call
            it.
          </p>
          <HardCodedTestimonials />
        </div>
        <div className="relative w-full top-40 mt-4 md:mt-28">
          <h2
            className="w-full text-center text-3xl top-[10vh] md:top-[17vh] md:text-6xl font-bold pb-12 sticky"
          >
            Manage your Testimonials in
            <span className="md:block"> 3 easy steps</span>
          </h2>
          <StepstoCreate />
        </div>

        <div className="flex flex-col justify-center items-center mt-40 md:mt-44 pt-20 font-bold text-center w-full">
          <h2 className="w-[90%] lg:w-3/5 pb-12 text-4xl md:text-5xl lg:text-6xl">
            Forge Lasting Connections: From First Click to Loyal Customer
          </h2>
          <Features />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-24 font-bold text-center w-full bg-[#141111]">
        <BookCall />
      </div>
      <Footer />
    </div>
  );
};
