import { create } from 'zustand';

export type WallData = 'fixed' | 'animated' | 'carousal' | 'animated-carousal' | null;
type PageData = 'all' | 'editing' | 'final';

interface WallEditingPageState {
  page: PageData;
  data: WallData;
  url: string | null;
  setUrl: (url: string) => void;
  setPage: (page: PageData, data: WallData) => void;
  initializepage: () => void;
}

export const useWallTypeStore = create<WallEditingPageState>((set) => ({
  page: 'all',
  data: null,
  url: null,
  setPage: (page: PageData, data: WallData) => {
    set({
      page,
      data
    });
    localStorage.setItem('wallPage', page);
    localStorage.setItem('wallData', data === null ? "" : data);

  },
  setUrl: (url: string) => {
    set({ url })
  },
  initializepage: () => {
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('wallPage') as PageData | null;
      let wallData = localStorage.getItem('wallData') as WallData | null;

      // Set `wallData` to `null` if an empty string is retrieved from localStorage

      if (savedPage) {
        set({
          page: savedPage,
          data: wallData
        });
      }
    }
  }
}));

