"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ReasonsToUse: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  };
  const addToCardRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lines = lineRefs.current;
    const glow = glowRef.current;
    const cards = cardRefs.current;

    if (!glow || lines.length === 0 || cards.length === 0) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(glow, {
      top: "50%",
      duration: 0.5,
      ease: "power2.inOut",
    });

    tl.to(
      glow,
      {
        left: "0%",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "horizontal"
    );
    tl.to(
      glow,
      {
        left: "100%",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "horizontal"
    );
    tl.to(
      glow,
      {
        top: "100%",
        left: "50%",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "horizontal"
    );

    tl.to(
      glow,
      {
        top: "100%",
        left: "0%",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "vertical"
    );
    tl.to(
      glow,
      {
        top: "100%",
        left: "100%",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "vertical"
    );

    tl.set(glow, { top: "0%", left: "50%" });

    lines.forEach((line, index) => {
      if (index === 0) {
        tl.to(line, { opacity: 1, duration: 0.5 }, 0);
        tl.to(line, { opacity: 0.2, duration: 0.5 }, 0.5);
      } else if (index === 1 || index === 2 || index === 4) {
        tl.to(line, { opacity: 1, duration: 0.5 }, 1);
        tl.to(line, { opacity: 0.2, duration: 0.5 }, 1.5);
      } else {
        tl.to(line, { opacity: 1, duration: 0.5 }, 2);
        tl.to(line, { opacity: 0.2, duration: 0.5 }, 2.5);
      }
    });
    tl.to(glow, { top: "50%", duration: 0.5, ease: "power2.inOut" }, 0);
    tl.to(
      glow,
      { left: "0%", duration: 0.5, ease: "power2.inOut" },
      "horizontal"
    );
    tl.to(
      glow,
      { left: "100%", duration: 0.5, ease: "power2.inOut" },
      "horizontal"
    );
    tl.to(
      glow,
      { top: "100%", left: "50%", duration: 0.5, ease: "power2.inOut" },
      "horizontal"
    );
    tl.to(
      glow,
      { top: "100%", left: "0%", duration: 0.5, ease: "power2.inOut" },
      "vertical"
    );
    tl.to(
      glow,
      { top: "100%", left: "100%", duration: 0.5, ease: "power2.inOut" },
      "vertical"
    );
    tl.set(glow, { top: "0%", left: "50%" });

    const animateCard = (cardIndex: number, startTime: number) => {
      tl.to(
        cards[cardIndex],
        {
          boxShadow: "0 0 15px -4px rgba(168, 85, 247, 0.5)",
          zIndex: 10,
          duration: 0.75,
          ease: "power2.inOut",
        },
        startTime
      );
      tl.to(
        cards[cardIndex],
        {
          boxShadow:
            "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
          zIndex: 1,
          duration: 0.75,
          ease: "power2.inOut",
        },
        startTime + 0.75
      );
    };

    animateCard(0, 2.5);
    animateCard(2, 2.5);

    animateCard(1, 1.5);
  }, []);

  const cards = [
    {
      title: "Best Pricing — Maximize Your ROI with Flexible Plans-",
      content:
        "ViewUs offers feature-rich testimonial tools at competitive rates. Our flexible plans let you scale with ease, ensuring maximum impact without breaking the bank.",
      image: "/assets/images/card1.png",
    },
    {
      title: "Personalized Support - Guidance at every step",
      content:
        "Our dedicated team provides expert assistance, helping you set up and optimize your testimonials to resonate with your audience and enhance credibility.",
      image: "/assets/images/card2.png",
    },
    {
      title: "Boost Your Sales Performance with Real reviews",
      content:
        "Showcase authentic customer testimonials to build trust and attract new clients. With ViewUs, real feedback becomes a powerful tool to drive sales growth.",
      image: "/assets/images/card3.png",
    },
  ];

  return (
    <div className="container mx-auto text-center flex flex-col gap-10 lg:gap-0 justify-center items-center overflow-hidden">
      <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold">
        3 reasons to choose ViewUs
      </h2>
      <div
        className="relative hidden lg:block flex items-center justify-center h-32 w-[800px]"
        ref={containerRef}
      >
        <div
          ref={addToRefs}
          className="absolute w-0.5 h-16 bg-purple-500 top-0 left-1/2 -translate-x-1/2 opacity-20"
        ></div>
        <div className="absolute flex w-full top-1/2 -translate-y-1/2">
          <div className="w-1/2 h-0.5 bg-transparent flex-1">
            <div
              ref={addToRefs}
              className="h-0.5 bg-purple-500 w-full opacity-20"
            ></div>
          </div>
          <div className="w-1/2 h-0.5 bg-transparent flex-1">
            <div
              ref={addToRefs}
              className="h-0.5 bg-purple-500 w-full opacity-20"
            ></div>
          </div>
        </div>
        <div className="absolute w-full h-16 flex justify-between top-1/2">
          <div
            ref={addToRefs}
            className="w-0.5 h-16 bg-purple-500 opacity-20"
          ></div>
          <div
            ref={addToRefs}
            className="w-0.5 h-16 bg-purple-500 opacity-20"
          ></div>
          <div
            ref={addToRefs}
            className="w-0.5 h-16 bg-purple-500 opacity-20"
          ></div>
        </div>
        <div
          ref={glowRef}
          className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_10px_5px_rgba(255,255,255,0.7),0_0_20px_10px_rgba(255,255,255,0.5)] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-4 px-4 lg:px-2">
        {cards.map((card, index) => (
          <Card
            key={index}
            ref={addToCardRefs}
            className={cn(
              "relative rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 text-black text-left lg:max-w-[400px] place-items-center overflow-hidden pb-0",
              index === 2 ? "md:col-span-2 lg:col-span-1" : "lg:col-span-1"
            )}
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {card.title}
              </CardTitle>
              <CardDescription className="tracking-wider">
                {card.content}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[250px] md:h-[300px]">
              <Image
                src={card.image}
                alt={card.title}
                width={800}
                height={800}
                className="object-cover z-10 absolute md:w-[350px] md:h-[350px]"
              />
              <div
                className={cn(
                  "absolute  w-[900px] h-[900px] rounded-full bg-gradient-radial from-transparent via-transparent to-black flex justify-center items-center z-0",
                  index == 0
                    ? "-bottom-[800px] -right-[270px] md:-bottom-[800px] md:-right-[460px] lg:-bottom-[800px] lg:-right-[665px]"
                    : index == 1
                    ? "-bottom-[800px] -right-[270px] md:-bottom-[800px] md:-right-[100px] lg:-bottom-[800px] lg:-right-[250px]"
                    : "-bottom-[800px] -right-[270px] md:-bottom-[760px] md:-right-[100px] lg:-bottom-[800px] lg:right-[163px]"
                )}
              ></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReasonsToUse;
