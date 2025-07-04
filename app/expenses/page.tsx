"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency, formatDate, expenseCategories } from "@/lib/utils"
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
  {
    id: 6,
    title: "Lunch",
    amount: 25.0,
    category: "Food & Dining",
    date: new Date("2024-01-10"),
    description: "Business lunch",
  },
  {
    id: 7,
    title: "Gym Membership",
    amount: 50.0,
    category: "Healthcare",
    date: new Date("2024-01-09"),
    description: "Monthly gym fee",
  },
  {
    id: 8,
    title: "Book Purchase",
    amount: 19.99,
    category: "Education",
    date: new Date("2024-01-08"),
    description: "Programming book",
  },
]

export default function ExpensesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [expenses, setExpenses] = useState(mockExpenses)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  useEffect(() => {
    if (!session) {
      router.push("/auth/login")
    }
  }, [session, router])

  if (!session) return null

  const filteredExpenses = expenses
    .filter(
      (expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((expense) => selectedCategory === "all" || expense.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.amount - a.amount
        case "title":
          return a.title.localeCompare(b.title)
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Expenses</h1>
              <p className="text-muted-foreground mt-1">Manage and track all your expenses</p>
            </div>
            <Button asChild className="mt-4 sm:mt-0">
              <Link href="/expenses/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search expenses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredExpenses.length} of {expenses.length} expenses
                </p>
                <p className="text-sm font-medium">
                  Total: <span className="text-red-600">{formatCurrency(totalAmount)}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Expenses List */}
          <Card>
            <CardHeader>
              <CardTitle>All Expenses</CardTitle>
              <CardDescription>Your complete expense history</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                <div className="space-y-4">
                  {filteredExpenses.map((expense, index) => (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors group"
                    >
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{expense.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{expense.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {expense.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{formatDate(expense.date)}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-red-600 text-lg">-{formatCurrency(expense.amount)}</p>
                            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="sm" variant="ghost" asChild>
                                <Link href={`/expenses/${expense.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {filteredExpenses.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No expenses found matching your criteria.</p>
                      <Button asChild className="mt-4">
                        <Link href="/expenses/new">Add Your First Expense</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
