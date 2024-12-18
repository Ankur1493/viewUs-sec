import Navbar from "@/components/Navbar";
import { Features } from "@/components/landing/Features";
import TriangleFeature from "@/components/landing/TriangleGrid";
import HeroSection from "@/components/landing/HeroSection";
import { Footer } from "@/components/Footer";
import { BookCall } from "./BookCall";
import { ManageTestimonials } from "./ManageTestimonials";
import { VideoSection } from "./VideoSection";
import ReasonsToUse from "./ReasonsToUse";

export const Landing = () => {
  return (
    <div className="flex flex-col items-center relative top-0 w-full transform">
      <Navbar active="none" />
      <div className="absolute z-0 top-20 w-full flex justify-center">
        <TriangleFeature />
      </div>
      <div className="w-screen z-10 flex flex-col items-center md:mt-24 mt-12 gap-20">
        <HeroSection />
        <div className="bg-gradient-radial w-full from-[#141111] to-gray-950">
          <div className="w-full my-8 top-16 md:top-28 lg:top-40 mt-16">
            <ManageTestimonials />
          </div>
          {/* <div
            className="w-full h-screen flex justify-center items-center lg:px-40 "
            style={{ margin: 0 }}
          >
            <div className="w-full h-full max-w-screen-2xl">
              <iframe
                src="https://embed.viewus.in/w/embed-testimonials/carousal?slug=bakedui&theme=dark&cardBorder=000000&cardBackground=141414&star=FACC3C"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                style={{
                  border: "none",
                  height: "100%",
                }}
              ></iframe>
            </div>
          </div> */}
        </div>
        <div>
          <ReasonsToUse />
        </div>
        <div>
          <div>
            <VideoSection
              heading="Customize your review form"
              content="Design a review form that perfectly fits your brand. Add your logo, pick your colors, and customize the style to create a form that looks and feels just right for your business."
              videoSrc="/assets/videos/create.mp4"
              buttonContent1="Live Preview"
              linkHref1="a/viewus"
            />
          </div>
          <div>
            <VideoSection
              heading="Wall of love"
              content="Easily set up testimonials on your website with just a few clicks!
              Showcase customer reviews in a seamless and engaging way, boosting
              your brand's credibility in minutes."
              videoSrc="/assets/videos/wallOfLove.mp4"
              buttonContent1="Start your journey"
              linkHref1="/dashboard"
              buttonContent2="Live Preview"
              linkHref2="https://embed.viewus.in/w/embed-testimonials?slug=bakedui&theme=&speed=slow&columns=4"
            />
          </div>
        </div>

        <div className="relative w-full md:my-12 top-16 lg:top-24 flex flex-col jutify-center items-center">
          <h2 className="text-3xl md:text-6xl font-bold text-center mb-2">
            See what our users say about us
          </h2>
          <p className="text-sm md:text-xl text-center text-gray-500 mb-12 px-8 md:px-0">
            Our very own wall of love. Or complaints. Whatever you want to call
            it.
          </p>
          <div className="w-[95%] md:w-[90%] h-screen rounded-xl scrollbar-hidden max-w-screen-2xl">
            <iframe
              src="https://embed.viewus.in/w/embed-testimonials?slug=bakedui&theme=&speed=slow&columns=4"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="yes"
              style={{
                border: "none",
              }}
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-40 md:mt-24 pt-20 font-bold text-center w-full">
          <h2 className="md-w-[90%] lg:w-3/5 pb-12 text-2xl md:text-5xl lg:text-6xl">
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
