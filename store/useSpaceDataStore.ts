import { SpaceCreationDetails } from "@/components/space/create/SpaceCreationDetails";
import { create } from "zustand"

interface SpaceCreationDetails {
  projectName: string | null;
  projectSlug: string | null;
}

interface CoverPage {
  title: string;
  description: string;
  btnText: string;
  logo: File | string | null;
}

export interface UserInformation {
  userPhoto: boolean;
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  jobTitle: boolean;
  company: boolean;
}

interface TestimonialType {
  text: boolean;
  video: boolean;
}

interface TestimonialPageType {
  title: string;
  description: string;
  tags: string[];
  questionHeader: string;
  questions: string[];
}

interface ThankYou {
  title: string;
  description: string;
}

interface Design {
  gradientType: number;
  btnColor: string;
}

interface SpaceData {
  spaceCreationDetails: SpaceCreationDetails
  coverPage: CoverPage;
  userInformation: UserInformation;
  testimonialType: TestimonialType;
  testimonialPageType: TestimonialPageType;
  thankyou: ThankYou;
  design: Design;
  setSpaceCreationDetails: (spaceCreationDetails: SpaceCreationDetails) => void
  setCoverPage: (coverPage: CoverPage) => void;
  setUserInformation: (userInformation: UserInformation) => void;
  setTestimonialType: (testimonialType: TestimonialType) => void;
  setTestimonialPageType: (testimonialPageType: TestimonialPageType) => void;
  setThankYou: (thankyou: ThankYou) => void;
  setDesign: (design: Design) => void;
}

export const useSpaceDataStore = create<SpaceData>((set) => ({
  spaceCreationDetails: {
    projectName: null,
    projectSlug: null
  },
  setSpaceCreationDetails: (spaceCreationDetails: SpaceCreationDetails) => set({ spaceCreationDetails }),
  coverPage: {
    title: "Leave us a Testimonial",
    description: "we want to share customer success stories on our website and would love for you to submit a written or video testimonial. Your feedback means a lot to us!",
    btnText: "Tell us about your experience",
    logo: null
  },
  setCoverPage: (coverPage: CoverPage) => set({ coverPage }),
  userInformation: {
    userPhoto: false,
    firstName: true,
    lastName: true,
    email: true,
    jobTitle: false,
    company: false
  },
  setUserInformation: (userInformation: UserInformation) => set({ userInformation }),
  testimonialType: {
    text: true,
    video: false,
  },
  setTestimonialType: (testimonialType: TestimonialType) => set({ testimonialType }),
  testimonialPageType: {
    title: "Write a testimonial",
    description: "Thanks for taking out some time to fill a review for us, cheers",
    tags: [],
    questionHeader: "Reflect on your experience",
    questions: [
      "What problems did we help you solve?",
      "What have you been able to achieve since using our product/service?",
      "What exceeded your expectations or surprised you the most?",
      "What would you tell someone considering our product/service?",
    ]
  },
  setTestimonialPageType: (testimonialPageType: TestimonialPageType) => set({ testimonialPageType }),
  thankyou: {
    title: "Thanks for your feedback",
    description: "We appreciate you taking the time to provide us a testimonial"
  },
  setThankYou: (thankyou: ThankYou) => set({ thankyou }),
  design: {
    gradientType: 1,
    btnColor: "#71D4FF"
  },
  setDesign: (design: Design) => set({ design })
}));
