import { create } from "zustand";

interface buttonStore {
  clickedButton: string | null;
  setClickedButton: (buttonType: string) => void;
}

const useReviewPageStore = create<buttonStore>((set) => ({
  clickedButton: null,
  setClickedButton: (buttonType: string) => set({ clickedButton: buttonType }),
}));

export default useReviewPageStore;
