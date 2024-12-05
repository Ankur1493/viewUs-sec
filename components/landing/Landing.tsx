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
        <HeroSection imageSrc="/assets/images/HeroImage.png" />
        <div className="w-full my-8 top-16 md:top-28 lg:top-40 mt-16">
          <ManageTestimonials />
        </div>
        <div
          className="w-full h-screen flex justify-center items-center mx-20  "
          style={{ margin: 0 }}
        >
          <div className="w-full h-full">
            <iframe
              src="http://localhost:5173/w/embed-testimonials/carousal"
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
        </div>
        <div>
          <ReasonsToUse />
        </div>
        <div>
          <VideoSection
            heading="Instant testimonials Setup"
            content="Easily set up testimonials on your website with just a few clicks!
              Showcase customer reviews in a seamless and engaging way, boosting
              your brand’s credibility in minutes."
            videoSrc="/assets/videos/screen2.mp4"
            buttonContent1="Live Preview"
            linkHref1="#"
          />
        </div>
        <div>
          <VideoSection
            heading="Hall of Fame"
            content="Highlight the authentic voices of your customers with the Wall of Love. Share genuine testimonials that reflect trust and satisfaction, building lasting connections and enhancing your brand's credibility."
            videoSrc="/assets/videos/submitTextReview.mp4"
            buttonContent1="Start your journey"
            linkHref1="#"
            buttonContent2="Live Preview"
            linkHref2="#"
          />
        </div>

        <div className="relative w-full my-12 top-16 lg:top-24 flex flex-col jutify-center items-center">
          <h2 className="text-3xl md:text-6xl font-bold text-center mb-2">
            See what our users say about us
          </h2>
          <p className="text-xl text-center text-gray-500 mb-12">
            Our very own wall of love. Or complaints. Whatever you want to call
            it.
          </p>
          <div className="w-[95%] md:w-[90%] h-screen rounded-xl">
            <iframe
              src="http://localhost:5173/w/embed-testimonials?animated=on&theme=&speed=slow&columns=3"
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
