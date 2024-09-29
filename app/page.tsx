import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Grid } from "@/components/landing/Grid";
import { StepstoCreate } from "@/components/landing/StepsToCreate";
import TriangleGrid from "@/components/landing/TriangleGrid";
import HeroImage from "@/components/landing/HeroImage";
import { Footer } from "@/components/Footer";

export default function Home() {
  const slice = {
    primary: {
      image: "/assets/images/sample.png",
    },
  };
  return (
    <>
      <div className=" relative flex flex-col items-center absolute top-0 w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
        <Navbar />
        <div className="absolute top-20 w-full flex justify-center">
          <TriangleGrid />
        </div>
        <div className="w-screen flex flex-col items-center md:mt-32 mt-16">
          <div className="flex flex-col justify-center items-center w-4/6">
            <h1 className="text-4xl mt-2 md:text-5xl font-bold pb-3 text-center">
              Capture, Organize, and Feature Testimonials with Minimal Effort
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center text-gray-400 md:w-2/5 w-3/4">
            <p className="text-md md:text-xl text-center">
              ViewUs helps you seamlessly collect and manage customer
              testimonials. No developers, no complex setup.
            </p>
          </div>
          <div className="flex gap-2 w-1/6 mt-6">
            <Link
              href={"/upgrade"}
              className="flex-1 p-2 px-3 border-white bg-black text-white text-[20px] font-semibold rounded-xl w-1/2 bg-opacity-90 text-center hover:bg-opacity-80"
            >
              Upgrade
            </Link>
            <Link
              href={"/login"}
              className="p-2 flex-1 px-5 border-white bg-black text-white text-[20px] font-semibold rounded-xl w-1/2 bg-opacity-90 text-center hover:bg-opacity-80"
            >
              SignUp
            </Link>
          </div>
          <div>
            <HeroImage imageSrc={slice.primary.image} />
          </div>
          <div className="relative w-full top-40">
            <h2
              className="w-full text-center text-5xl font-bold pb-8 sticky"
              style={{ top: "20vh" }}
            >
              Collect Your Testimonials in 3 Easy Steps
            </h2>
            <StepstoCreate />
          </div>

          <div className="flex flex-col justify-center items-center pt-60 font-bold text-center w-full pb-12">
            <h2 className="w-2/4 pb-12 text-5xl">
              Build Trust with Real Customer Stories
            </h2>
            <Grid />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
