import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Business",
  "Other",
]

export const themes = [
  { name: "Blue", value: "blue", color: "bg-blue-500", hexValue: "#3B82F6" },
  { name: "Emerald", value: "emerald", color: "bg-emerald-500", hexValue: "#10B981" },
  { name: "Violet", value: "violet", color: "bg-violet-500", hexValue: "#8B5CF6" },
  { name: "Slate", value: "slate", color: "bg-slate-500", hexValue: "#64748B" },
  { name: "Rose", value: "rose", color: "bg-rose-500", hexValue: "#F43F5E" },
]

export type ThemeKey = "blue" | "emerald" | "violet" | "slate" | "rose";