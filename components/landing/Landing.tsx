import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Features } from "@/components/landing/Features";
import { StepstoCreate } from "@/components/landing/StepsToCreate";
import TriangleFeature from "@/components/landing/TriangleGrid";
import HeroImage from "@/components/landing/HeroImage";
import { Footer } from "@/components/Footer";
import HardCodedTestimonials from "./HardCodedTestimonials";

export const Landing = () => {
  return (
    <div className="flex flex-col items-center absolute top-0 w-screen transform">
      <Navbar />
      <div className="absolute z-0 top-20 w-full flex justify-center">
        <TriangleFeature />
      </div>
      <div className="w-screen z-10 flex flex-col items-center md:mt-32 mt-16">
        <div className="flex flex-col justify-center items-center w-4/6">
          <h1 className="text-4xl mt-2 md:text-7xl font-bold pb-3 text-center">
            Showcase your Testimonials
            <span className="block">with Minimal Effort</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center text-gray-400 md:w-2/5 w-3/4">
          <p className="text-md md:text-xl text-center">
            ViewUs helps you seamlessly collect and manage customer
            testimonials.
            <span className="block">No Developers, No complex setup.</span>
          </p>
        </div>
        <div className="flex gap-2 w-1/6 pt-6">
          <Link
            href={"/login"}
            className="w-2/3 p-3 flex-1 px-5 border-white bg-gradient-to-br from-violet-700 to-orange-500 text-white text-[24px] font-bold rounded-xl  text-center cursor-pointer"
          >
            Start for Free
          </Link>
        </div>
        <div>
          <HeroImage imageSrc="/assets/images/HeroImage.png" />
        </div>
        <div className="relative w-full my-12 top-40">
          <h2 className="text-6xl font-extrabold text-center text-gray-900 mb-2">
            See what our users say about us
          </h2>
          <p className="text-xl text-center text-gray-500 mb-12">
            Our very own wall of love. Or complaints. Whatever you want to call it.
          </p>
          <HardCodedTestimonials />
        </div>
        <div className="relative w-full top-40">
          <h2
            className="w-full text-center text-6xl font-bold pb-12 sticky"
            style={{ top: "20vh" }}
          >
            Manage your Testimonials in
            <span className="block">3 easy steps</span>
          </h2>
          <StepstoCreate />
        </div>

        <div className="flex flex-col justify-center items-center pt-60 font-bold text-center w-full pb-12">
          <h2 className="w-3/5 pb-12 text-6xl">
            Forge Lasting Connections: From First Click to Loyal Customer
          </h2>
          <Features />
        </div>
      </div>
      <Footer />
    </div>
  )
}
