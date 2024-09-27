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
      "Whether it's written feedback or powerful video stories, ViewUs lets you gather all types of testimonials in just a few clicks. No need for complicated forms or technical setups—just effortless collection.",
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
      "Easily embed your testimonials on any website, blog, or social media platform. No coding skills required—just copy, paste, and start showcasing what your customers have to say.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
  {
    title: "Centralized Dashboard to Manage All Testimonials",
    description:
      "Keep all your customer testimonials organized in one easy-to-access dashboard. Sort, filter, and showcase the feedback that matters most—all without the clutter.",
    header: <Skeleton />,
    className: "md:col-span-3",
  },
];
