"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AddTestimonialCard } from "./AddTestimonialCard";
const cards = [
  {
    step: 1,
    title: "Create Your Space",
    description:
      "Whether it's written feedback or powerful video stories, ViewUs lets you gather all types of testimonials in just a few clicks. No need for complicated forms or technical setups—just effortless collection",
    image: "/path-to-dashboard-image.jpg",
    imageAlt: "Dashboard Image",
  },
  {
    step: 2,
    title: "Share the form with others",
    description:
      "Whether it's written feedback or powerful video stories, ViewUs lets you gather all types of testimonials in just a few clicks. No need for complicated forms or technical setups—just effortless collection",
    image: "/path-to-review-form-image.jpg",
    imageAlt: "Review Form Image",
  },
  {
    step: 3,
    title: "Showcase Your testimonials",
    description:
      "Whether it's written feedback or powerful video stories, ViewUs lets you gather all types of testimonials in just a few clicks. No need for complicated forms or technical setups—just effortless collection",
    image: "/path-to-wall-of-love-image.jpg",
    imageAlt: "Wall of Love Image",
  },
];

export const AddTestimonial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cardHeight = 400;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {cards.map((card, index) => {
        const startScroll = index * cardHeight;
        const progress = Math.min(
          Math.max((scrollY - startScroll) / cardHeight, 0),
          1
        );

        return (
          <motion.div
            key={index}
            style={{ height: "100%" }}
            className="absolute top-0 left-0 w-full flex items-center justify-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: progress * -100,
              opacity: progress,
              zIndex: index,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <AddTestimonialCard
              step={card.step}
              title={card.title}
              description={card.description}
              image={card.image}
              imageAlt={card.imageAlt}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
