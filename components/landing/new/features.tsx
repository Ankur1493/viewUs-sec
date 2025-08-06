import { LargeSeparator } from "@/components/large-seprator";
import { FeatureShadow } from "@/components/svgs/feat-shadow";
import { Logo } from "@/components/svgs/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Folder, PaintBucket, Puzzle, Rocket } from "lucide-react";

export const featuresData = [
  {
    title: "Easy Testimonial Management",
    description:
      "Collect, tag, and organize testimonials in one place—no tech setup needed.",
    impact: {
      icon: Folder,
      label: "40% Faster",
    },
  },
  {
    title: "Effortless Embedding",
    description:
      "Embed responsive testimonial widgets on any site with a simple code snippet.",
    impact: {
      icon: Puzzle,
      label: "60% Efficiency",
    },
  },
  {
    title: "Personalized Display Options",
    description:
      "Customize testimonial cards to match your brand without writing CSS.",
    impact: {
      icon: PaintBucket,
      label: "70% Consistency",
    },
  },
  {
    title: "Boost Customer Confidence",
    description:
      "Showcase social proof to reduce hesitation and boost conversions.",
    impact: {
      icon: Rocket,
      label: "35% Conversion",
    },
  },
];

export const Features = () => {
  return (
    <div className="min-h-[40rem] flex flex-col my-24 items-center w-full max-h-fit p-4 ">
      <div className="flex items-center gap-2 flex-col">
        <Badge>Features</Badge>
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold leading-tight text-center text-balance max-w-2xl font-primary">
          Few of many reasons of choosing{" "}
          <span className="border-x-2 border-primary px-1 py-px bg-gradient-to-r from-primary/30 via-transparent to-primary/30">
            ViewUs
          </span>{" "}
        </h1>
      </div>

      <div className="w-full grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4   min-h-[30rem] max-h-fit">
        {featuresData.map((feature, index) => (
          <div
            key={feature.title}
            className={cn(
              `border rounded-xl relative flex h-[30rem] lg:h-auto flex-col justify-between`,
              index === 0 ? "lg:row-span-2" : "",
              index === 2 ? "lg:row-span-2" : ""
            )}
          >
            <LargeSeparator />
            <div className="bg-white relative group overflow-hidden h-full z-[10] flex flex-col rounded-xl hover:drop-shadow-xl justify-between transition-all duration-300 ease-in-out hover:translate-x-3 hover:-translate-y-3  p-4">
              <FeatureShadow
                className={cn(
                  `absolute -bottom-40 z-[-1] -right-40 group-hover:-bottom-20 group-hover:-right-20  transition-all duration-300  blur-[2em] size-[20rem] border`
                )}
              />
              <div className="-space-y-1">
                <div>
                  <Logo className="size-8 mb-2" />
                  <div className="font-semibold font-primary  text-xl text-left text-balance mb-2">
                    {feature.title}
                  </div>
                </div>
                <p className="text-sm/tight text-muted-foreground/80">
                  {feature.description}
                </p>
              </div>
              <Badge variant={"secondary"} className="w-fit">
                {<feature.impact.icon className="size-4 mr-2" />}
                {feature.impact.label}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
