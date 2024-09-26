import { create } from "zustand";

interface buttonStore {
  reviewButton: string | null;
  detailsButton: boolean;
  textReview: string;
  submitButton: boolean;
  starred: number;
  setReviewButton: (buttonType: string) => void;
  setDetailsButton: (buttonType: boolean) => void;
  setTextReview: (review: string) => void;
  setSubmitButton: (buttonType: boolean) => void;
  setStarred: (star: number) => void;
}

const useReviewPageStore = create<buttonStore>((set) => ({
  reviewButton: null,
  detailsButton: false,
  textReview: "",
  submitButton: false,
  starred: 5,
  setReviewButton: (buttonType: string) => set({ reviewButton: buttonType }),
  setDetailsButton: (state: boolean) => set({ detailsButton: state }),
  setTextReview: (review: string) => set({ textReview: review }),
  setSubmitButton: (state: boolean) => set({ submitButton: state }),
  setStarred: (star: number) => set({ starred: star }),
}));

export default useReviewPageStore;
