import { create } from "zustand";

interface SpaceCreationDetails {
  projectName: string | null;
  projectSlug: string | null;
}

// have to update coverpage image
interface CoverPage {
  title: string;
  description: string;
  btnText: string;
  logo?: File | null | string | undefined;
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
  spaceCreationDetails: SpaceCreationDetails;
  coverPage: CoverPage;
  userInformation: UserInformation;
  testimonialType: TestimonialType;
  testimonialPageType: TestimonialPageType;
  thankyou: ThankYou;
  design: Design;
  setSpaceCreationDetails: (spaceCreationDetails: SpaceCreationDetails) => void;
  setCoverPage: (coverPage: CoverPage) => void;
  setUserInformation: (userInformation: UserInformation) => void;
  setTestimonialType: (testimonialType: TestimonialType) => void;
  setTestimonialPageType: (testimonialPageType: TestimonialPageType) => void;
  setThankYou: (thankyou: ThankYou) => void;
  setDesign: (design: Design) => void;
  initializeSpaceData: () => void;
}

// Default state
const defaultSpaceData = {
  spaceCreationDetails: { projectName: null, projectSlug: null },
  coverPage: {
    title: "Leave us a Testimonial",
    description:
      "We want to share customer success stories on our website and would love for you to submit a written or video testimonial.",
    btnText: "Tell us about your experience",
    logo: null,
  },
  userInformation: {
    userPhoto: false,
    firstName: true,
    lastName: true,
    email: true,
    jobTitle: false,
    company: false,
  },
  testimonialType: { text: true, video: false },
  testimonialPageType: {
    title: "Write a testimonial",
    description:
      "Thanks for taking out some time to fill a review for us, cheers!",
    tags: [],
    questionHeader: "Reflect on your experience",
    questions: [
      "What problems did we help you solve?",
      "What have you been able to achieve since using our product/service?",
      "What exceeded your expectations or surprised you the most?",
      "What would you tell someone considering our product/service?",
    ],
  },
  thankyou: {
    title: "Thanks for your feedback",
    description:
      "We appreciate you taking the time to provide us a testimonial.",
  },
  design: { gradientType: 1, btnColor: "#71D4FF" },
};

export const useSpaceDataStore = create<SpaceData>((set) => ({
  ...defaultSpaceData,

  setSpaceCreationDetails: (spaceCreationDetails) => {
    set({ spaceCreationDetails });
    sessionStorage.setItem(
      "spaceCreationDetails",
      JSON.stringify(spaceCreationDetails)
    );
  },

  setCoverPage: (coverPage) => {
    set({ coverPage });
    sessionStorage.setItem("coverPage", JSON.stringify(coverPage));
  },

  setUserInformation: (userInformation) => {
    set({ userInformation });
    sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
  },

  setTestimonialType: (testimonialType) => {
    set({ testimonialType });
    sessionStorage.setItem("testimonialType", JSON.stringify(testimonialType));
  },

  setTestimonialPageType: (testimonialPageType) => {
    set({ testimonialPageType });
    sessionStorage.setItem(
      "testimonialPageType",
      JSON.stringify(testimonialPageType)
    );
  },

  setThankYou: (thankyou) => {
    set({ thankyou });
    sessionStorage.setItem("thankyou", JSON.stringify(thankyou));
  },

  setDesign: (design) => {
    set({ design });
    sessionStorage.setItem("design", JSON.stringify(design));
  },

  initializeSpaceData: () => {
    const initializeState = (key: keyof SpaceData, defaultValue: any) => {
      const storedValue = sessionStorage.getItem(key);
      if (storedValue) {
        set({ [key]: JSON.parse(storedValue) });
      } else {
        sessionStorage.setItem(key, JSON.stringify(defaultValue));
      }
    };

    initializeState(
      "spaceCreationDetails",
      defaultSpaceData.spaceCreationDetails
    );
    initializeState("coverPage", defaultSpaceData.coverPage);
    initializeState("userInformation", defaultSpaceData.userInformation);
    initializeState("testimonialType", defaultSpaceData.testimonialType);
    initializeState(
      "testimonialPageType",
      defaultSpaceData.testimonialPageType
    );
    initializeState("thankyou", defaultSpaceData.thankyou);
    initializeState("design", defaultSpaceData.design);
  },
}));
