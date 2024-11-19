"use client";

import { motion } from "framer-motion";
import step1Image from "@/public/assets/images/test2.webp";
import step2Image from "@/public/assets/images/test3.webp";
import step3Image from "@/public/assets/images/HeroImage.png";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { number } from "zod";

export default function OurProcess() {
  const steps = [
    {
      number: 1,
      title: "Collect Testimonials Effortlessly",
      description:
        "Easily gather authentic customer testimonials with customizable forms and intuitive submission workflows.",
      image: step1Image,
    },
    {
      number: 2,
      title: "Organize & Manage in One Place",
      description:
        "Store, categorize, and access all your testimonials in a central hub for seamless organization.",
      image: step2Image,
    },
    {
      number: 3,
      title: "Showcase Testimonials Beautifully",
      description:
        "Display your testimonials in stunning, customizable widgets designed to boost your brand's credibility.",
      image: step3Image,
    },
  ];

  return (
    <section className="px-4 py-12">
      <div className=" mx-auto">
        <h1 className="text-6xl font-bold text-center mb-12">
          Simplifying Your Journey, Step by Step
        </h1>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-1 px-4 flex items-center gap-4"
              >
                <div>
                  <h2 className="text-9xl font-bold flex items-center justify-center">
                    {step.number}
                  </h2>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">{step.title}</h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative h-[400px] rounded-2xl overflow-hidden flex-1"
              >
                <Image
                  src={step.image}
                  alt={`${step.title} Illustration`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
