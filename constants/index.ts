import { WallData } from "@/store/useWallTypeStore";

interface features {
  title: string;
  desc: string;
}

interface wallCardType {
  key: number;
  title: string;
  slug: WallData;
  url?: string;
  desc: string;
  img: string;
}

export const freeFeatures: features[] = [
  {
    title: "Upto 15 text testimonials",
    desc: "you can collect 15 text testimonials as showcase them",
  },
  {
    title: "2 video testimonials",
    desc: "why 2? you may ask, we are in our early stages so only 2 so far, upgrade if you want more",
  },
  {
    title: "Share your customized form",
    desc: "Easily share your review form to your customers, for collecting reviews in as simple as 3 clicks",
  },
  {
    title: "Wall of Love",
    desc: "You can create a wall of love for embedding in your website, to increase trust",
  },
  {
    title: "Personalized Support",
    desc: "We are a team of 2, we try to reply to each query ourself within 24 hours",
  },
  {
    title: "Constant upgrades",
    desc: "We are regularly researching and working on new features to help you increase credibility",
  },
  {
    title: "2 video testimonials",
    desc: "why 2? you may ask, we are in our early stages so only 2 so far, upgrade if you want more",
  },
  {
    title: "Upto 15 text testimonials",
    desc: "you can collect 15 text testimonials as showcase them",
  },
  {
    title: "Share your customized form",
    desc: "Easily share your review form to your customers, for collecting reviews in as simple as 3 clicks",
  },
];

export const WallCardTypesConstants: wallCardType[] = [
  {
    key: 1,
    title: "Fixed",
    slug: "fixed" as const,
    url: "http://localhost:5173/w/embed-testimonials",
    desc: "A fixed grid layout structure for showcasing a selected and crucial reviews",
    img: "/assets/images/grid_fixed.png",
  },
  {
    key: 2,
    title: "Animated",
    slug: "animated" as const,
    url: "https://embed-viewus.netlify.app/w/embed-testimonials?animated=on",
    desc: "A animated grid layout structure for showcasing a lot of reviews which are important",
    img: "/assets/images/grid_animated.gif",
  },
  {
    key: 3,
    url: "https://embed-viewus.netlify.app/w/embed-testimonials/carousal",
    title: "Carousel",
    slug: "carousal" as const,
    desc: "A carousel for you to have an showcase horizontaly and clear reviews",
    img: "/assets/images/carousal_fixed.png",
  },
  {
    key: 4,
    url: "https://embed-viewus.netlify.app/w/embed-testimonials/carousal?animated=on",
    title: "Carousel Animated" as const,
    slug: "animated-carousal",
    desc: "A animated carousel for you to have an showcase horizontaly and clear reviews",
    img: "/assets/images/carousal_animated.gif",
  },
  {
    key: 5,
    title: "testing",
    url: "lalala",
    slug: "fixed" as const,
    desc: "A animated carousel for you to have an showcase horizontaly and clear reviews",
    img: "/assets/images/coming_soon.jpg",
  },
];
