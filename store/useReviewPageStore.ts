import { create } from "zustand";

interface buttonStore {
  reviewButton: string | null;
  detailsButton: boolean;
  textReview: string;
  submitButton: boolean;
  starred: number;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    jobTitle: string;
    image: File | null;
  };
  setReviewButton: (buttonType: string) => void;
  setDetailsButton: (buttonType: boolean) => void;
  setTextReview: (review: string) => void;
  setSubmitButton: (buttonType: boolean) => void;
  setStarred: (star: number) => void;
  setCustomerDetails: (details: Partial<buttonStore["customerDetails"]>) => void;
  resetCustomerDetails: () => void;
}

const useReviewPageStore = create<buttonStore>((set) => ({
  reviewButton: null,
  detailsButton: false,
  textReview: "",
  submitButton: false,
  starred: 5,
  customerDetails: {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    image: null,
  },
  setReviewButton: (buttonType: string) => set({ reviewButton: buttonType }),
  setDetailsButton: (state: boolean) => set({ detailsButton: state }),
  setTextReview: (review: string) => set({ textReview: review }),
  setSubmitButton: (state: boolean) => set({ submitButton: state }),
  setStarred: (star: number) => set({ starred: star }),
  setCustomerDetails: (details) => set((state) => ({
    customerDetails: { ...state.customerDetails, ...details },
  })),
  resetCustomerDetails: () => set({
    customerDetails: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
      image: null,
    },
  }),
}));

export default useReviewPageStore;
