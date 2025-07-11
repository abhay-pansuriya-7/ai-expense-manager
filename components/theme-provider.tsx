"use client"
import { useEffect } from "react"
import { useThemeStore } from "@/hooks/use-theme-store"

export function ThemeProvider({ children, ...props }: any) {

  const initializeTheme = useThemeStore((state) => state.initializeTheme)
  useEffect(() => {
    // Initialize theme when component mounts
    initializeTheme()
  }, [initializeTheme])
  return <div {...props}>{children}</div>
}
