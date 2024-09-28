"use client";
import { AddTestimonialCard } from "./AddTestimonialCard";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    step: 1,
    title: "Create Your Space",
    description: "Gather all types of testimonials.",
    image: "/path-to-dashboard-image.jpg",
    imageAlt: "Dashboard Image",
  },
  {
    step: 2,
    title: "Collect Testimonials",
    description: "Easily collect testimonials through various formats.",
    image: "/path-to-collection-image.jpg",
    imageAlt: "Collection Image",
  },
  {
    step: 3,
    title: "Showcase on Your Website",
    description: "Display your testimonials seamlessly.",
    image: "/path-to-showcase-image.jpg",
    imageAlt: "Showcase Image",
  },
];

export const AddTestimonial = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTransform1 = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const yTransform2 = useTransform(scrollYProgress, [0.5, 1], ["0%", "-100%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      {cards.map((card, i) => {
        const isSecondCard = i === 1;
        const isThirdCard = i === 2;

        return (
          <motion.div
            key={i}
            style={{
              position: "sticky",
              top: isSecondCard ? "37vh" : isThirdCard ? "39vh" : "35vh",
              zIndex: i,
              transform: isSecondCard
                ? yTransform1
                : isThirdCard
                ? yTransform2
                : "none",
            }}
            className="w-full"
          >
            <AddTestimonialCard
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
