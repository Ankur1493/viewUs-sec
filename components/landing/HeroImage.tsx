"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface HeroImageProps {
  imageSrc?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageSrc }) => {
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

    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } });

    tl.fromTo(
      ".hero__heading",
      { scale: 0.7 },
      { scale: 1, opacity: 1 }
    )
      .fromTo(
        ".hero__body",
        { y: 30 },
        { y: 0, opacity: 1 },
        "-=0.4"
      )
      .fromTo(
        ".hero__button",
        { scale: 1.3 },
        { scale: 1, opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        ".hero__image",
        { y: 80 },
        { y: 0, opacity: 1 },
        "-=0.3"
      )
      .fromTo(
        ".hero__glow",
        { scale: 0.7 },
        { scale: 1, opacity: 1 },
        "-=0.5"
      );

    gsap.to(".hero__glow--one", {
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 0,
      keyframes: [
        { top: "0%", left: "33%", duration: 0 },
        { top: "33%", left: "33%", duration: 1.5 },
        { top: "33%", left: "0%", duration: 2 },
        { top: "0%", left: "0%", duration: 1.5 },
        { top: "0%", left: "33%", duration: 2 },
      ],
    });

    gsap.to(".hero__glow--two", {
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 0,
      keyframes: [
        { top: "33%", left: "0%", duration: 0 },
        { top: "0%", left: "0%", duration: 1.5 },
        { top: "0%", left: "33%", duration: 2 },
        { top: "33%", left: "33%", duration: 1.5 },
        { top: "33%", left: "0%", duration: 2 },
      ],
    });
  }, []);

  return (
    <div className="relative text-center px-2 lg:px-0">
      <div className="hero__image glass-container mt-16 w-fit opacity-0">
        <div className="hero__glow hero__glow--one absolute left-1/3 top-0 -z-10 h-2/3 w-2/3 bg-violet-700/50 mix-blend-screen blur-3xl filter md:blur-[120px] opacity-0" />
        <div className="hero__glow hero__glow--two absolute left-0 top-1/3 -z-10 h-2/3 w-2/3 bg-orange-400 mix-blend-screen blur-3xl filter md:blur-[120px] opacity-0" />

        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Hero Image"
            width={1000}
            height={2000}
            className="rounded-3xl border-black border-8"
          />
        )}
      </div>
    </div>
  );
};

export default HeroImage;
