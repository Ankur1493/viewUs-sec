import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Features } from "@/components/landing/Features";
import TriangleFeature from "@/components/landing/TriangleGrid";
import HeroImage from "@/components/landing/HeroImage";
import { Footer } from "@/components/Footer";
import HardCodedTestimonials from "./HardCodedTestimonials";
import { BookCall } from "./BookCall";
import { ManageTestimonials } from "./ManageTestimonials";
import { Button } from "../ui/button";
import { ExternalLink, ChevronRight } from "lucide-react";

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
            Showcase your Testimonials with{" "}
            <span className="block">Minimal Effort</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center text-gray-400 w-3/4 md:1/6 lg:w-3/5 ">
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
        <div className="relative w-full my-8 top-16 md:top-28 lg:top-40">
          <ManageTestimonials />
        </div>
        <div className="flex flex-col w-full md:flex-row items-center justify-between p-6 top-40 mt-20 md:mt-40 lg:mt-72 lg:px-12">
          <div className="w-[95%] md:w-2/5 space-y-4 text-center md:text-left">
            <div className="md:w-[90%] lg:w-[70%] flex flex-col gap-4 ">
              <div className="flex flex-col gap-3 w-full">
                <h2 className="text-2xl lg:text-4xl font-bold text-black text-left">
                  Instant testimonials Setup
                </h2>
                <p className="text-gray-800 text-sm md:text-xs lg:text-md tracking-wide text-left">
                  Easily set up testimonials on your website with just a few
                  clicks! Showcase customer reviews in a seamless and engaging
                  way, boosting your brand’s credibility in minutes.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-2 w-full">
                <Link href="#" className="flex-1">
                  <Button className="flex w-full py-5 gap-2 rounded-xl shadow-xl border-2 font-semibold group">
                    <p>Start your journey</p>
                    <ChevronRight className="w-[18px] h-[18px] group-hover:w-[20px] group-hover:h-[20px]  transition-all duration-100 ease-in-out" />
                  </Button>
                </Link>
                <Link href="#" className="flex-1">
                  <Button
                    variant="outline"
                    className="flex w-full py-5 gap-2 rounded-xl shadow-md border-2 font-semibold group"
                  >
                    <p>Live Preview</p>
                    <ExternalLink className="w-[15px] h-[15px] group-hover:w-[16px] group-hover:h-[16px]  transition-all duration-100 ease-in-out" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[95%] mt-12 md:mt-0 relative md:w-3/5 h-56 md:h-96 lg:h-[700px] mb-4 rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] border">
            <video
              className="w-full h-full object-cover rounded-md"
              loop
              autoPlay
              muted
              playsInline
            >
              <source src="/assets/videos/screen2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="relative w-full my-12 top-16 lg:top-24">
          <h2 className="text-3xl md:text-6xl font-bold text-center mb-2">
            See what our users say about us
          </h2>
          <p className="text-xl text-center text-gray-500 mb-12">
            Our very own wall of love. Or complaints. Whatever you want to call
            it.
          </p>
          <HardCodedTestimonials />
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
