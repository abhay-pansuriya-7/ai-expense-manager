"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Plus, TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock data - replace with real API calls
const mockExpenses = [
  {
    id: 1,
    title: "Grocery Shopping",
    amount: 85.5,
    category: "Food & Dining",
    date: new Date("2024-01-15"),
    description: "Weekly groceries",
  },
  {
    id: 2,
    title: "Gas Station",
    amount: 45.0,
    category: "Transportation",
    date: new Date("2024-01-14"),
    description: "Fuel for car",
  },
  {
    id: 3,
    title: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: new Date("2024-01-13"),
    description: "Monthly subscription",
  },
  {
    id: 4,
    title: "Coffee Shop",
    amount: 12.5,
    category: "Food & Dining",
    date: new Date("2024-01-12"),
    description: "Morning coffee",
  },
  {
    id: 5,
    title: "Uber Ride",
    amount: 18.75,
    category: "Transportation",
    date: new Date("2024-01-11"),
    description: "Ride to office",
  },
]

const mockStats = {
  totalBalance: 2450.75,
  monthlySpending: 1234.56,
  monthlyIncome: 3500.0,
  savingsRate: 65,
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/auth/login")
      return
    }
    setIsLoading(false)
  }, [session, status, router])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name?.split(" ")[0]}!</h1>
              <p className="text-muted-foreground mt-1">Here's your financial overview</p>
            </div>
            <Button asChild className="mt-4 sm:mt-0">
              <Link href="/expenses/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(mockStats.totalBalance)}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{formatCurrency(mockStats.monthlySpending)}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingDown className="inline h-3 w-3 mr-1" />
                    -5% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(mockStats.monthlyIncome)}</div>
                  <p className="text-xs text-muted-foreground">Steady income stream</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{mockStats.savingsRate}%</div>
                  <p className="text-xs text-muted-foreground">Great job saving!</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Expenses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Expenses</CardTitle>
                    <CardDescription>Your latest transactions</CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/expenses">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExpenses.slice(0, 5).map((expense, index) => (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{expense.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(expense.date)} • {expense.category}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">-{formatCurrency(expense.amount)}</p>
                        <Badge variant="secondary" className="text-xs">
                          {expense.category}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
