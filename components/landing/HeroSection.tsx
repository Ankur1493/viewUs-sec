"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

// const HeroSection: React.FC<HeroVideoProps> = ({ videoSrc }) => {
const HeroSection = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
        {
          opacity: 1,
        }
      );
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1.2 },
    });

    tl.fromTo(
      ".hero__heading",
      { scale: 0.7 },
      { scale: 1, opacity: 1, duration: 1.5 }
    )
      .fromTo(".hero__body", { y: 30 }, { y: 0, opacity: 1 }, "-=0.6")
      .fromTo(
        ".hero__button",
        { scale: 1.3 },
        { scale: 1, opacity: 1, duration: 1.4 },
        "-=0.7"
      )
      .fromTo(".hero__image", { y: 80 }, { y: 0, opacity: 1 }, "-=0.6")
      .fromTo(".hero__glow", { scale: 0.7 }, { scale: 1, opacity: 1 }, "-=0.7");

    gsap.to(".hero__glow--one", {
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 0,
      keyframes: [
        { top: "0%", left: "33%", duration: 0 },
        { top: "33%", left: "33%", duration: 2 },
        { top: "33%", left: "0%", duration: 2.5 },
        { top: "0%", left: "0%", duration: 2 },
        { top: "0%", left: "33%", duration: 2.5 },
      ],
    });

    gsap.to(".hero__glow--two", {
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 0,
      keyframes: [
        { top: "33%", left: "0%", duration: 0 },
        { top: "0%", left: "0%", duration: 2 },
        { top: "0%", left: "33%", duration: 2.5 },
        { top: "33%", left: "33%", duration: 2 },
        { top: "33%", left: "0%", duration: 2.5 },
      ],
    });
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full md:w-11/12 lg:w-4/6">
          <h1 className="hero__heading text-4xl mt-2 md:text-5xl lg:text-6xl font-bold pb-3 text-center opacity-0">
            Showcase your Testimonials with{" "}
            <span className="block">Minimal Effort</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center text-gray-500 w-3/4 md:1/6 lg:w-3/5">
          <p className="hero__body text-md md:text-xl text-center opacity-0">
            ViewUs helps you seamlessly collect and manage customer
            testimonials.
            <span className="block">No Developers, No complex setup.</span>
          </p>
        </div>
        <div className="flex gap-2 w-fit pt-6">
          <Link
            href={"/login"}
            className="hero__button w-fit p-3 flex-1 px-5 border-white bg-gradient-to-br from-violet-700 to-orange-500 text-white text-[24px] font-bold rounded-xl text-center cursor-pointer opacity-0"
          >
            Start for Free
          </Link>
        </div>
      </div>
      <div className="relative text-center px-2 lg:px-0">
        <div className="hero__image glass-container mt-16 w-fit opacity-0">
          <div className="hero__glow hero__glow--one absolute left-1/3 top-0 -z-10 h-2/3 w-2/3 bg-violet-700/50 mix-blend-screen blur-3xl filter md:blur-[120px] opacity-0" />
          <div className="hero__glow hero__glow--two absolute left-0 top-1/3 -z-10 h-2/3 w-2/3 bg-orange-400 mix-blend-screen blur-3xl filter md:blur-[120px] opacity-0" />
          <video
            src="/assets/videos/mainProd.mp4"
            autoPlay
            muted
            loop
            playsInline
            width={1000}
            height={2000}
            className="rounded-3xl z-50 border-black border-8"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
