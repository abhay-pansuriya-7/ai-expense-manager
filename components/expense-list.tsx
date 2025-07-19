"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, ShoppingBag, Car, Utensils, Plane, Heart, Dumbbell, Trash2, Edit } from "lucide-react"

const categoryIcons = {
  home: Home,
  shopping: ShoppingBag,
  transport: Car,
  food: Utensils,
  trips: Plane,
  health: Heart,
  sport: Dumbbell,
}

const expenses = [
  { id: 1, category: "Food & Drink", amount: 25.5, date: "Today", icon: "food", color: "bg-red-500" },
  { id: 2, category: "Shopping", amount: 120.0, date: "Yesterday", icon: "shopping", color: "bg-blue-500" },
  { id: 3, category: "Transport", amount: 15.75, date: "2 days ago", icon: "transport", color: "bg-yellow-500" },
  { id: 4, category: "Health", amount: 45.0, date: "3 days ago", icon: "health", color: "bg-green-500" },
  { id: 5, category: "Sport", amount: 80.0, date: "1 week ago", icon: "sport", color: "bg-cyan-500" },
]

export function ExpenseList() {
  return (
    <div className="space-y-3">
      {expenses.map((expense) => {
        const IconComponent = categoryIcons[expense.icon as keyof typeof categoryIcons]

        return (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${expense.color}`}>
                <IconComponent className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">{expense.category}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{expense.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-red-600">
                -${expense.amount}
              </Badge>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
