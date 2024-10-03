"use client";
import { StepsToCreateCard } from "./StepsToCreateCard";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    step: 1,
    title: "Create Your Space",
    description:
      "Customize your very own testimonial collection space in minutes. Set up a branded page where customers can easily leave their feedback, whether it's written or in video form. Tailor it to match your business’s identity and make the process seamless for your customers.",
    image: "/assets/images/test1.webp",
    imageAlt: "Dashboard Image",
  },
  {
    step: 2,
    title: "Share the form with others",
    description:
      "Effortlessly share your testimonial form with clients through a link, email, or social media. No complicated setups—just a simple, user-friendly form that allows your customers to provide feedback with ease. Watch as the testimonials start flowing in.",

    image: "/assets/images/test2.webp",
    imageAlt: "Collection Image",
  },
  {
    step: 3,
    title: "Showcase Your testimonials",
    description:
      "Display the best of your customer feedback for the world to see. Use our beautiful, customizable display options to integrate testimonials directly into your website, or share them across your social media platforms. Build trust and credibility through the authentic voices of your satisfied customers.",

    image: "/assets/images/test3.webp",
    imageAlt: "Showcase Image",
  },
];

export const StepstoCreate = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTransform1 = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const yTransform2 = useTransform(scrollYProgress, [0.5, 1], ["0%", "-100%"]);

  const widthTransform1 = useTransform(
    scrollYProgress,
    [0, 1],
    ["100vw", "92vw"]
  );
  const widthTransform2 = useTransform(
    scrollYProgress,
    [0, 1],
    ["100vw", "96vw"]
  );
  const widthTransform3 = useTransform(
    scrollYProgress,
    [0, 1],
    ["100vw", "100vw"]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col justify-center items-center"
    >
      {cards.map((card, i) => {
        const isSecondCard = i === 1;
        const isThirdCard = i === 2;

        const yTransform =
          i === 1 ? yTransform1 : i === 2 ? yTransform2 : "none";
        const widthTransform =
          i === 0
            ? widthTransform1
            : i === 1
              ? widthTransform2
              : widthTransform3;

        return (
          <motion.div
            key={i}
            style={{
              position: "sticky",
              top: isSecondCard ? "38vh" : isThirdCard ? "41vh" : "35vh",
              zIndex: i,
              width: widthTransform,
              transform: isSecondCard
                ? yTransform1
                : isThirdCard
                  ? yTransform2
                  : "none",
            }}
            className="w-full"
          >
            <StepsToCreateCard
              step={card.step}
              title={card.title}
              description={card.description}
              imageAlt={card.imageAlt}
              image={card.image}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
