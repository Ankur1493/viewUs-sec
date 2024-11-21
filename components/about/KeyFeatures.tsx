"use client";

import { motion } from "framer-motion";
import { CheckCircle, Share2, BarChart3, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: CheckCircle,
    title: "Easy Collection",
    description:
      "Streamlined process to gather authentic testimonials from your satisfied customers.",
  },
  {
    icon: Share2,
    title: "Smart Distribution",
    description:
      "Automatically share testimonials across your website and social media platforms.",
  },
  {
    icon: BarChart3,
    title: "Insightful Analytics",
    description:
      "Gain valuable insights from your testimonials with our advanced analytics tools.",
  },
  {
    icon: Zap,
    title: "Instant Integration",
    description:
      "Seamlessly integrate with your existing systems and workflows.",
  },
];

export default function KeyFeatures() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how our platform empowers your business to leverage the
            full potential of customer testimonials.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <CardTitle className="text-xl font-semibold text-center">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
