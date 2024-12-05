"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const CostAnimated = ({ period }: { period: "month" | "year" }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.3, delay: 0.7 } },
  };

  const newPriceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 1 } },
  };

  return (
    <div className="p-8 w-full">
      <motion.div
        ref={sectionRef}
        className="flex items-baseline relative items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="relative" variants={itemVariants}>
          <span
            className="text-5xl md:text-6xl font-bold text-white pr-3"
            aria-hidden="true"
          >
            {period === "month" ? "$25" : "$250"}
          </span>
          <motion.div
            className="absolute top-1/2 left-0 w-full h-1.5 rounded-r-xl bg-blue-400 transform -translate-y-1/2 origin-left"
            variants={lineVariants}
            aria-hidden="true"
          />
        </motion.div>
        <motion.span
          className="text-5xl md:text-6xl font-bold text-blue-400"
          variants={newPriceVariants}
          aria-label="New price: $20 per month"
        >
          {period === "month" ? "$20" : "$200"}
        </motion.span>
        <motion.span className="text-white" variants={itemVariants}>
          {period === "month" ? "/month" : "/year"}
        </motion.span>
      </motion.div>
    </div>
  );
};
