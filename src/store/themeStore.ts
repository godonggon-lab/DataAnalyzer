import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    setTheme: (theme: 'dark' | 'light') => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'dark', // Default to dark mode
            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                updateDomClass(newTheme);
                return { theme: newTheme };
            }),
            setTheme: (theme) => {
                updateDomClass(theme);
                set({ theme });
            },
        }),
        {
            name: 'theme-storage',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    updateDomClass(state.theme);
                }
            },
        }
    )
);

// Helper to update DOM class
const updateDomClass = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};
