import { WallData } from "@/store/useWallTypeStore";
import { BarChart3, Folder, Network, UserPlus, Video } from "lucide-react";

interface features {
  title: string;
  desc: string;
}

interface wallCardType {
  key: number;
  title: string;
  slug: WallData;
  url?: string;
  urlReset?: string;
  desc: string;
  img: string;
  info?: string;
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
];

export const WallCardTypesConstants: wallCardType[] = [
  {
    key: 1,
    title: "Fixed",
    slug: "fixed" as const,
    url: "https://embed.viewus.in/",
    urlReset: "https://embed.viewus.in/",
    desc: "A fixed grid layout structure for showcasing a selected and crucial reviews",
    img: "/assets/images/grid_fixed.png",
  },
  {
    key: 2,
    title: "Animated",
    slug: "animated" as const,
    url: "https://embed.viewus.in?animated=on",
    urlReset: "https://embed.viewus.in?animated=on",
    desc: "A animated grid layout structure for showcasing a lot of reviews which are important",
    img: "/assets/images/grid_animated.gif",
  },
  {
    key: 3,
    url: "https://embed.viewus.in/w/carousal",
    urlReset: "https://embed.viewus.in/w/carousal",
    title: "Carousel (Horizontal Cards)",
    slug: "carousal-horizontal" as const,
    desc: "A carousel for you to have an showcase horizontaly and clear reviews",
    img: "/assets/images/carousal1.png",
  },
  {
    key: 4,
    url: "https://embed.viewus.in/w?cards=3",
    urlReset: "https://embed.viewus.in/w?cards=3",
    title: "Carousel (Vertical Cards)",
    slug: "carousal-vertical" as const,
    desc: "A carousel for you to have an showcase horizontaly and clear reviews",
    img: "/assets/images/carousal2.png",
  },
  {
    key: 5,
    url: "https://embed.viewus.in/w/carousal?animated=on&rows=2",
    urlReset: "https://embed.viewus.in/w/carousal?animated=on&rows=2",
    title: "Carousel Animated (2 rows)" as const,
    slug: "carousal-2rows-animated",
    desc: "A animated carousel for you to have an showcase horizontaly and clear reviews",
    img: "/assets/images/carousal_2rows_animated.gif",
    info: "Only text reviews & texts from imported reviews are shown in this carousel",
  },
  {
    key: 6,
    title: "Customize your Wall of Love",
    url: "/articles",
    slug: "fixed" as const,
    desc: "We can design a custom wall of love for you as per your requirements",
    img: "/assets/images/coming_soon.jpg",
  },
];


export const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Set Up Your Profile",
    description:
      "Create your account and personalize your testimonial dashboard to match your brand.",
  },
  {
    icon: Folder,
    title: "Create Testimonial Collections",
    description:
      "Group testimonials into collections like product reviews, service feedback, or client success stories.",
  },
  {
    icon: Video,
    title: "Import or Collect Testimonials",
    description:
      "Upload video/text testimonials or import them from forms, emails, and social platforms.",
  },
  {
    icon: BarChart3,
    title: "Embed & Track Performance",
    description:
      "Embed testimonial cards on your site and monitor their impact with detailed analytics.",
  },
];

export const workingImages = ["/assets/blue-bg.png", "/assets/blue-bg.png", "/assets/blue-bg.png", "/assets/blue-bg.png"];