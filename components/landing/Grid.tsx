import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

export function Grid() {
  return (
    <BentoGrid className="w-[70%] mx-auto md:auto-rows-[25rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "Collect Testimonials Easily",
    description:
      "Gather text and video testimonials with just a few clicks—no technical setup needed.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
  {
    title: "Secure & Private",
    description:
      "Testimonials are encrypted and stored securely to protect customer data.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },

  {
    title: "No Developer Needed",
    description:
      "Start collecting testimonials quickly, even if you're not tech-savvy.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },
  {
    title: "Share Testimonials Anywhere",
    description:
      "Embed testimonials on websites, blogs, or social media—no coding required.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
  {
    title: "Manage Testimonials in One Place",
    description:
      "Keep all testimonials organized and easy to manage in one dashboard.",
    header: <Skeleton />,
    className: "md:col-span-3",
  },
];
