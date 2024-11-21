import { create } from "zustand"

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

interface SpaceData {
  coverPage: CoverPage;
  userInformation: UserInformation;
  setCoverPage: (coverPage: CoverPage) => void;
  setUserInformation: (userInformation: UserInformation) => void;
}

export const useSpaceDataStore = create<SpaceData>((set) => ({
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
  setUserInformation: (userInformation: UserInformation) => set({ userInformation })
}));
