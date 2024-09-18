import { create } from "zustand";

interface buttonStore {
  reviewButton: string | null;
  detailsButton: boolean;
  setReviewButton: (buttonType: string) => void;
  setDetailsButton: (buttonType: boolean) => void;
}

const useReviewPageStore = create<buttonStore>((set) => ({
  reviewButton: null,
  detailsButton: false,
  setReviewButton: (buttonType: string) => set({ reviewButton: buttonType }),
  setDetailsButton: (state: boolean) => set({ detailsButton: state }),
}));

export default useReviewPageStore;
