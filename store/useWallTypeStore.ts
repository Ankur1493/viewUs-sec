import { create } from 'zustand';

export type WallData = 'fixed' | 'animated' | 'carousal' | 'animated-carousal' | null;
type PageData = 'all' | 'editing' | 'final';

interface WallEditingPageState {
  page: PageData;
  data: WallData;
  setPage: (page: PageData, data: WallData) => void;
  initializepage: () => void;
}

export const useWallTypeStore = create<WallEditingPageState>((set) => ({
  page: 'all',
  data: null,
  setPage: (page: PageData, data: WallData) => {
    set({
      page,
      data
    });
    localStorage.setItem('wallPage', page);
  },
  initializepage: () => {
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('wallPage') as PageData | null;
      if (savedPage) {
        set({
          page: savedPage || 'all',
          data: savedPage === 'all' || savedPage === 'final' ? null : 'fixed'
        });
      }
    }
  },
}));

