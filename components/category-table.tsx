"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
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

const categoryData = [
  { category: "Food & Drink", amount: 600, percentage: 30, transactions: 12, icon: "food", color: "bg-red-500" },
  { category: "Shopping", amount: 500, percentage: 25, transactions: 8, icon: "shopping", color: "bg-blue-500" },
  { category: "Sport", amount: 300, percentage: 15, transactions: 5, icon: "sport", color: "bg-cyan-500" },
  { category: "Transport", amount: 250, percentage: 12.5, transactions: 15, icon: "transport", color: "bg-yellow-500" },
  { category: "Trips", amount: 200, percentage: 10, transactions: 3, icon: "trips", color: "bg-purple-500" },
  { category: "Health", amount: 150, percentage: 7.5, transactions: 4, icon: "health", color: "bg-green-500" },
]

export function CategoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Percentage</TableHead>
          <TableHead>Transactions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryData.map((item) => {
          const IconComponent = categoryIcons[item.icon as keyof typeof categoryIcons]

          return (
            <TableRow key={item.category}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">{item.category}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">${item.amount}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="w-16 h-2" />
                  <span className="text-sm">{item.percentage}%</span>
                </div>
              </TableCell>
              <TableCell>{item.transactions}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
