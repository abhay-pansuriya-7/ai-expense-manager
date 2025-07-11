"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { DARK_THEMES, LIGHT_THEMES } from "@/lib/themeColors"

type ThemeKey = keyof typeof LIGHT_THEMES
interface ThemeStore {
  colorTheme: ThemeKey
  theme: "" | "dark" | "light"
  setColorTheme: (theme: ThemeKey) => void
  setTheme: (theme: "" | "dark" | "light") => void
  initializeTheme: () => void
  applyTheme: (theme: ThemeKey) => void
}


export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      colorTheme: "blue", // Default theme is blue
      theme: "light", // Default theme is light

      setTheme: (newTheme: "" | "dark" | "light") => {
        set({ theme: newTheme })
        const { colorTheme, applyTheme } = get()
        applyTheme(colorTheme) // Re-apply theme in new mode
      },

      applyTheme: (themeKey: ThemeKey) => {
        if (typeof document !== 'undefined') {
          const root = document.documentElement
          const { theme } = get()

          // Remove any previously applied theme class
          root.classList.remove("theme-blue", "theme-emerald", "theme-violet", "theme-slate", "theme-rose")
          root.classList.add(`theme-${themeKey}`)

          // Add/remove dark class
          if (theme === "dark") {
            root.classList.add("dark")
          } else {
            root.classList.remove("dark")
          }

          // Pick correct theme values
          const themeColors = theme === "dark"
            ? DARK_THEMES[themeKey]
            : LIGHT_THEMES[themeKey]

          // Apply each color as a CSS variable
          Object.entries(themeColors).forEach(([key, value]) => {
            const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
            root.style.setProperty(cssVar, value)
          })
        }
      },
      setColorTheme: (theme: ThemeKey) => {
        set({ colorTheme: theme })
        get().applyTheme(theme)
      },
      initializeTheme: () => {
        const { colorTheme, applyTheme } = get()
        applyTheme(colorTheme)
      }
    }),
    {
      name: "theme-storage",
    },
  ),
)
