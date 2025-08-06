"use client";
import { LargeSeparator } from "@/components/large-seprator";
import { Logo } from "@/components/svgs/logo";
import { Badge } from "@/components/ui/badge";
import { steps } from "@/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Working = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress when step changes
    setProgress(0);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 100 / 40; // 4000ms / 100ms = 40 increments
      });
    }, 100);

    // Step change interval
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [activeStep]);

  return (
    <div className="min-h-[40rem] flex flex-col my-24 items-center w-full max-h-fit p-4 ">
      <div className="flex items-center gap-2 flex-col">
        <Badge>Working</Badge>
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold text-center leading-tight text-balance max-w-2xl font-primary">
          This is all you need to do to get your{" "}
          <span className="border-x-2 border-primary px-1 py-px bg-gradient-to-r from-primary/30 via-transparent to-primary/30">
            testimonials
          </span>{" "}
          setup
        </h1>
      </div>

      <div className="grid grid-cols-1 bg-white px-4 py-4 rounded-2xl mt-20 xl:grid-cols-2 min-h-[35rem] max-h-fit gap-4">
        <div className=" max-h-full flex flex-col gap-4 w-full rounded-lg">
          {steps.map((step, index) => (
            <motion.div
              className={`border-2 rounded-xl flex flex-col justify-center p-4 flex-1 relative overflow-hidden ${
                activeStep === index
                  ? "ring-2 ring-primary"
                  : "border-transparent justify-center bg-accent/60"
              }`}
              key={step.title}
              initial={{ opacity: 0.6 }}
              animate={{
                opacity: activeStep === index ? 1 : 0.5,
                scale: activeStep === index ? 1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress bar background */}
              {activeStep === index && (
                <motion.div
                  className="absolute inset-0 bg-primary/10 "
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              )}

              <div
                className={cn(
                  "flex gap-4 h-full relative z-10",
                  activeStep === index ? "items-start" : "items-center"
                )}
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary">
                  <step.icon className="size-5 text-white" />
                </div>
                <div className="flex flex-col justify-center gap-2 min-h-[4rem]">
                  <h1 className="text-md md:text-xl font-semibold font-primary">
                    {step.title}
                  </h1>
                  <AnimatePresence mode="wait">
                    {activeStep === index && (
                      <motion.p
                        className=" w-full font-medium text-muted-foreground text-sm md: leading-tight"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className=" border flex-col aspect-square relative max-h-[35rem] flex items-center justify-center w-full rounded-lg overflow-hidden">
          <LargeSeparator />
          <Logo className="z-[10] size-40" />
          <div className="z-[10]">INSERT RESPECTIVE IMAGES HERE</div>
          {/* <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={workingImages[activeStep]}
                alt={`Step ${activeStep + 1}`}
                width={1000}
                height={1000}
                className="w-[40rem] object-contain"
              />
            </motion.div>
          </AnimatePresence> */}
        </div>
      </div>
    </div>
  );
};
