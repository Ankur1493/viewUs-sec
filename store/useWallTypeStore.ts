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
    sessionStorage.setItem('wallPage', page);
    sessionStorage.setItem('wallData', data === null ? "" : data);
  },
  setUrl: (url: string) => {
    set({ url })
    sessionStorage.setItem('urlData', url)
  },
  initializepage: () => {
    if (typeof window !== 'undefined') {
      const savedPage = sessionStorage.getItem('wallPage') as PageData | null;
      const wallData = sessionStorage.getItem('wallData') as WallData | null;
      const urlData = sessionStorage.getItem('urlData') as string | null;

      if (savedPage) {
        set({
          page: savedPage,
          data: wallData,
          url: urlData,
        });
      }
    }
  }
}));

