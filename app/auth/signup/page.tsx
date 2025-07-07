"use client"
import { useState } from "react"
import Link from "next/link"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { motion } from "framer-motion"
import { redirect, RedirectType } from 'next/navigation'


const currencies = [
  { code: "USD", country: "United States" },
  { code: "EUR", country: "European Union" },
  { code: "GBP", country: "United Kingdom" },
  { code: "JPY", country: "Japan" },
  { code: "AUD", country: "Australia" },
  { code: "CAD", country: "Canada" },
  { code: "CHF", country: "Switzerland" },
  { code: "CNY", country: "China" },
  { code: "INR", country: "India" },
] as const

const FormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)
    try {
      const response: any = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data?.username, email: data?.email, password: data?.password }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "Something went wrong")
      }
      toast.success("Account created successfully")
      redirect("/auth/login?message=Account created successfully", RedirectType.push)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-2xl">E</span>
            </div>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="confirm password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : ""}
                  Sign Up
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>

            <div className="text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
