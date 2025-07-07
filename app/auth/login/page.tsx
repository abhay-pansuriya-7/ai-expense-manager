"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { motion } from "framer-motion"

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
  //   message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  // }),
})
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)
    try {
      const result: any = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid email or password")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
    console.log("🔍 ~ LoginPage ~ app/auth/login/page.tsx:65 ~ error:", error)
      toast.error("An error occurred. Please try again.")
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
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
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
                <Button type="submit" className="w-full">
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : ""}
                  Submit</Button>
              </form>
            </Form>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
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
