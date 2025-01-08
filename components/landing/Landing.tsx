"use client";
import Navbar from "@/components/Navbar";
import { Features } from "@/components/landing/Features";
import TriangleFeature from "@/components/landing/TriangleGrid";
import HeroSection from "@/components/landing/HeroSection";
import { Footer } from "@/components/Footer";
import { BookCall } from "./BookCall";
import { ManageTestimonials } from "./ManageTestimonials";
import { VideoSection } from "./VideoSection";
import ReasonsToUse from "./ReasonsToUse";
import { useEffect } from "react";

export const Landing = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:5173/iframeEmbedder.js"; // Path to your iframeEmbedder.js in the public directory
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      console.log("Iframe embedder script loaded successfully");

      if (window.embedIframe) {
        window.embedIframe("#my-embed-frame", {
          log: true, // Enable logging for debugging
          checkOrigin: false, // Disable origin checking if necessary
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
        </div>
        <div>
          <ReasonsToUse />
        </div>
        <div>
          <div>
            <VideoSection
              heading="Use a customized Review form"
              content="Design a review form that perfectly fits your brand. Add your logo, pick your colors, and customize the style to create a form that looks and feels just right for your business."
              videoSrc="https://d3eyp937ijscg0.cloudfront.net/viewus_videos/create.mp4"
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
              videoSrc="https://d3eyp937ijscg0.cloudfront.net/viewus_videos/wallOfLove.mp4"
              buttonContent1="Start for free"
              linkHref1="/dashboard"
              buttonContent2="Live Preview"
              linkHref2="#landing-wall"
            />
          </div>
        </div>

        <div
          id="landing-wall"
          className="relative w-full md:my-12 top-16 lg:top-24 flex flex-col jutify-center items-center"
        >
          <h2 className="text-3xl md:text-6xl font-semibold text-center text-black mb-2">
            See what our users say about us
          </h2>
          <p className="text-sm md:text-xl text-center text-gray-500 mb-12 px-8 md:px-0">
            Our very own wall of love. Or complaints. Whatever you want to call
            it.
          </p>
          {/* <div className="w-[95%] md:w-[90%] h-screen rounded-xl scrollbar-hidden max-w-screen-2xl"> */}
          {/* <script
            type="text/javascript"
            src="http://localhost:5173/iframeResizer.min.js"
            async
          ></script>
          <iframe
            src="http://localhost:5173/?slug=viewus&animated&cardBorderRadius=medium"
            frameBorder="0"
            scrolling="no"
            width="100%"
            style={{
              border: "none",
            }}
          ></iframe>
          <script
            type="text/javascript"
            src="http://localhost:5173/embed.js"
            async
          ></script> */}
          {/* <script
            type="text/javascript"
            src="http://localhost:5173/iframeScript.js"
            async
          ></script>
          <div id="iframe-container" className="w-screen h-full"></div> */}
          {/* <iframe
            id="my-embed-frame"
            src="http://localhost:5173/?slug=viewus&animated&cardBorderRadius=medium"
            frameBorder="0"
            scrolling="no"
            width="100%"
            style={{ border: "none" }}
          ></iframe> */}
          {/* <script type="text/javascript">embedIframe("#my-embed-frame", { log: true, checkOrigin: false });</script> */}
          {/* </div> */}
        </div>
        <iframe
          id="my-embed-frame"
          src="http://localhost:5173/?slug=viewus&animated&cardBorderRadius=medium"
          frameBorder="0"
          scrolling="no"
          width="100%"
          height="100%" // This is required for the iframe to fill the container
          style={{ border: "none" }}
        ></iframe>
        {/* <iframe
          id="testimonialto-calenso-tag-all-light"
          src="https://embed-v2.testimonial.to/w/calenso?theme=light&card=base&loadMore=on&initialCount=20&tag=all&cc=off"
          frameBorder="0"
          scrolling="no"
          width="100%"
        ></iframe> */}

        <div className="flex flex-col justify-center items-center md:mt-10 pt-20 font-bold text-center w-full">
          <h2 className="md-w-[90%] lg:w-3/5 pb-12 text-2xl md:text-5xl lg:text-6xl text-black">
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
