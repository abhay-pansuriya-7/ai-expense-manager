"use client"

import { Badge } from "@/components/ui/badge"
import { Home, ShoppingBag, Car, Utensils, Plane, Heart, Dumbbell } from "lucide-react"

const categoryIcons = {
  home: Home,
  shopping: ShoppingBag,
  transport: Car,
  food: Utensils,
  trips: Plane,
  health: Heart,
  sport: Dumbbell,
}

const transactions = [
  {
    id: 1,
    type: "expense",
    category: "Home",
    amount: 100.52,
    date: "05-02-2023 10:22",
    icon: "home",
    color: "bg-green-500",
  },
  {
    id: 2,
    type: "expense",
    category: "Food & Drink",
    amount: 300.9,
    date: "05-02-2023 20:08",
    icon: "food",
    color: "bg-red-500",
  },
  {
    id: 3,
    type: "expense",
    category: "Shopping",
    amount: 400.5,
    date: "05-02-2023 20:12",
    icon: "shopping",
    color: "bg-blue-500",
  },
  {
    id: 4,
    type: "expense",
    category: "Trips",
    amount: 190.9,
    date: "05-02-2023 19:42",
    icon: "trips",
    color: "bg-purple-500",
  },
  {
    id: 5,
    type: "expense",
    category: "Transport",
    amount: 200.53,
    date: "05-02-2023 20:59",
    icon: "transport",
    color: "bg-yellow-500",
  },
  {
    id: 6,
    type: "expense",
    category: "Health & Beauty",
    amount: 140.53,
    date: "05-02-2023 15:59",
    icon: "health",
    color: "bg-green-500",
  },
  {
    id: 7,
    type: "expense",
    category: "Sport",
    amount: 156.53,
    date: "05-02-2023 04:59",
    icon: "sport",
    color: "bg-cyan-500",
  },
]

export function TransactionsList() {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            05
          </div>
          <div>
            <p className="font-medium">Tuesday</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">February 2023</p>
          </div>
        </div>
        <Badge variant="destructive">-1634.94$</Badge>
      </div>

      {transactions.map((transaction) => {
        const IconComponent = categoryIcons[transaction.icon as keyof typeof categoryIcons]

        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${transaction.color}`}>
                <IconComponent className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">{transaction.category}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-red-600">{transaction.amount.toFixed(2)}$</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
