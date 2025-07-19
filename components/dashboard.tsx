"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExpenseChart } from "@/components/expense-chart"
import { ExpenseList } from "@/components/expense-list"
import {
  Home,
  ShoppingBag,
  Car,
  Utensils,
  Plane,
  Heart,
  Dumbbell,
  Baby,
  Gamepad2,
  Shirt,
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
} from "lucide-react"

const categoryIcons = {
  home: Home,
  shopping: ShoppingBag,
  transport: Car,
  food: Utensils,
  trips: Plane,
  health: Heart,
  sport: Dumbbell,
  kids: Baby,
  leisure: Gamepad2,
  clothing: Shirt,
}

const summaryData = {
  totalBalance: 4000,
  totalExpenses: 2000,
  monthlyIncome: 6000,
  monthlyExpenses: 2000,
}

const budgetData = [
  { category: "Shopping", spent: 500, budget: 800, icon: "shopping", color: "bg-blue-500" },
  { category: "Food & Drink", spent: 600, budget: 800, icon: "food", color: "bg-red-500" },
  { category: "Trips", spent: 200, budget: 500, icon: "trips", color: "bg-purple-500" },
  { category: "Health & Beauty", spent: 150, budget: 300, icon: "health", color: "bg-green-500" },
  { category: "Sport", spent: 300, budget: 400, icon: "sport", color: "bg-cyan-500" },
  { category: "Transport", spent: 250, budget: 400, icon: "transport", color: "bg-yellow-500" },
]

export function Dashboard() {
  return (
    <div className="space-y-6 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your expenses</p>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          February 2023
        </Button>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Balance</p>
                <p className="text-2xl font-bold">${summaryData.totalBalance.toLocaleString()}</p>
              </div>
              <Wallet className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Income</p>
                <p className="text-2xl font-bold">${summaryData.monthlyIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Expenses</p>
                <p className="text-2xl font-bold">${summaryData.monthlyExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Saved</p>
                <p className="text-2xl font-bold">
                  ${(summaryData.monthlyIncome - summaryData.monthlyExpenses).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Budget Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Budget Summary
              <Badge variant="outline">February 2023</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetData.map((item) => {
              const IconComponent = categoryIcons[item.icon as keyof typeof categoryIcons]
              const percentage = (item.spent / item.budget) * 100

              return (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${item.color}`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${item.spent} from ${item.budget}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.budget - item.spent}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Expense Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseList />
        </CardContent>
      </Card>
    </div>
  )
}
