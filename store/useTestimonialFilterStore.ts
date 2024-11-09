import { create } from 'zustand';

type FilterType = 'all' | 'text' | 'video' | 'imported' | 'liked';

interface TestimonialFilterState {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  initializeFilter: () => void;
}

export const useTestimonialFilterStore = create<TestimonialFilterState>((set) => ({
  filter: 'all',
  setFilter: (filter) => {
    set({ filter });
    localStorage.setItem('testimonialFilter', filter);
  },
  initializeFilter: () => {
    const savedFilter = (typeof window !== 'undefined' && localStorage.getItem('testimonialFilter')) as FilterType | null;
    if (savedFilter) {
      set({ filter: savedFilter });
    }
  },
}));
