"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeStore {
  colorTheme: string
  setColorTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      colorTheme: "blue",
      setColorTheme: (theme: string) => {
        set({ colorTheme: theme })
        // Apply theme to document
        document.documentElement.className = document.documentElement.className.replace(/theme-\w+/g, "")
        document.documentElement.classList.add(`theme-${theme}`)
      },
    }),
    {
      name: "theme-storage",
    },
  ),
)
