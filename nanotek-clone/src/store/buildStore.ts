// src/store/buildStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, Category, checkCompatibility } from '@/lib/mockApi';

interface BuildState {
  parts: Partial<Record<Category, Product>>;
  errors: string[];
  buildName: string;
  
  addPart: (category: Category, product: Product) => void;
  removePart: (category: Category) => void;
  resetBuild: () => void;
  updateBuildName: (name: string) => void;
  loadBuild: (savedParts: Partial<Record<Category, Product>>) => void;
}

export const useBuildStore = create<BuildState>()(
  persist(
    (set) => ({
      parts: {},
      errors: [],
      buildName: 'මගේ නව PC එක',

      addPart: (category, product) => set((state) => {
        const newParts = { ...state.parts, [category]: product };
        const newErrors = checkCompatibility(newParts as Record<string, Product | null>);
        return { parts: newParts, errors: newErrors };
      }),

      removePart: (category) => set((state) => {
        const newParts = { ...state.parts };
        delete newParts[category];
        const newErrors = checkCompatibility(newParts as Record<string, Product | null>);
        return { parts: newParts, errors: newErrors };
      }),

      resetBuild: () => set({ parts: {}, errors: [], buildName: 'නව ගොඩනැගීම' }),
      
      updateBuildName: (name) => set({ buildName: name }),

      loadBuild: (savedParts) => set(() => {
        const newErrors = checkCompatibility(savedParts as Record<string, Product | null>);
        return { parts: savedParts, errors: newErrors };
      }),
    }),
    {
      name: 'nano-build-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
