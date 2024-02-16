import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'dark',
      setTheme: theme => set(() => ({ theme })),
    }),
    {
      name: 'theme_storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
