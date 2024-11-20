"use client";
import { motion } from "framer-motion";
import { Users, Zap, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ProblemsSolving from "./ProblemsSolving";
import GetStarted from "./GetStarted";

export const About = () => {
  const futureMetrics = [
    { label: "Potential Market Size", value: "1M+", icon: Users },
    { label: "Time Saved per Customer", value: "5hrs/week", icon: Zap },
    { label: "Projected ROI", value: "300%", icon: Target },
  ];

  return (
    <div className="min-h-screen w-full px-56">
      <section className="px-4 py-20 md:pt-32">
        <div className="mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold  mb-6">
              The Future of Social Proof
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We&apos;re building the next generation platform to help
              businesses harness the power of customer testimonials. Our
              innovative solution will make collecting, managing, and showcasing
              customer stories effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {futureMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="border-dashed border-pink-300 bg-white bg-opcaity-20 hover:bg-pink-50 transition-colors duration-200">
                  <CardContent className="p-6 flex flex-col items-center">
                    <metric.icon className="w-8 h-8 text-purple-500 mb-4" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-gray-500">{metric.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ProblemsSolving />
      <GetStarted />
    </div>
  );
};
