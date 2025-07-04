import { z } from "zod"

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  date: z.date(),
})

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long"),
  email: z.string().email("Invalid email address"),
  theme: z.enum(["blue", "emerald", "violet", "slate", "rose"]),
})

export type ExpenseFormData = z.infer<typeof expenseSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
