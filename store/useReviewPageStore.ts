import { create } from "zustand";

interface buttonStore {
  reviewButton: string | null;
  detailsButton: boolean;
  textReview: string;
  submitButton: boolean;
  starred: number;
  selectedTags: string[];
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string | null;
    jobTitle?: string | null;
    image?: File | null;
  };
  setReviewButton: (buttonType: string) => void;
  setDetailsButton: (buttonType: boolean) => void;
  setTextReview: (review: string) => void;
  setSubmitButton: (buttonType: boolean) => void;
  setStarred: (star: number) => void;
  setSelectedTags: (tag: string) => void;
  setCustomerDetails: (
    details: Partial<buttonStore["customerDetails"]>
  ) => void;
}

const useReviewPageStore = create<buttonStore>((set) => ({
  reviewButton: null,
  detailsButton: false,
  textReview: "",
  submitButton: false,
  starred: 0,
  videoButtonOpt: false,
  selectedTags: [],
  customerDetails: {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    image: null,
  },
  setReviewButton: (buttonType: string) => set({ reviewButton: buttonType }),
  setDetailsButton: (state: boolean) => set({ detailsButton: state }),
  setTextReview: (review: string) => set({ textReview: review }),
  setSubmitButton: (state: boolean) => set({ submitButton: state }),
  setStarred: (star: number) => set({ starred: star }),
  setCustomerDetails: (details) =>
    set((state) => ({
      customerDetails: { ...state.customerDetails, ...details },
    })),
  setSelectedTags: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
}));

export default useReviewPageStore;
