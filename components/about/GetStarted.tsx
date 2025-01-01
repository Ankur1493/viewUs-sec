import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const GetStarted = () => {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    "Gain Trust with Real Reviews",
    "Connect with Your Audience",
    "Boost Your Reputation",
    "Increase Conversions",
  ];
  return (
    <div>
      <section className="px-4 py-20">
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-[#141414] text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Ready to Get Started?
                  </h2>
                  <p className="text-purple-100">
                    Join Viewus to Gain Trust Through Real Feedback and Reviews
                  </p>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <Check className="w-5 h-5 text-purple-300" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              <div className="p-8 md:p-12 flex flex-col items-center justify-center bg-white dark:bg-gray-800">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-6"
                >
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Start Your Free Trial Today
                  </h3>
                  <Button
                    className="px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#141414] opacity-90 hover:bg-black hover:opacity-100 text-white"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    asChild
                  >
                    <Link
                      href="/login"
                      className="inline-flex items-center space-x-2"
                    >
                      <span>Start Free Trial</span>
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isHovered ? (
                          <ArrowRight className="w-5 h-5" />
                        ) : (
                          <Sparkles className="w-5 h-5" />
                        )}
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default GetStarted;
