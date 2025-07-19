"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, ShoppingBag, Car, Utensils, Plane, Heart, Dumbbell, Baby, Gamepad2, Shirt } from "lucide-react"

interface AddExpenseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categories = [
  { id: "home", name: "Home", icon: Home, color: "bg-green-500" },
  { id: "food", name: "Food & Drink", icon: Utensils, color: "bg-red-500" },
  { id: "shopping", name: "Shopping", icon: ShoppingBag, color: "bg-blue-500" },
  { id: "trips", name: "Trips", icon: Plane, color: "bg-purple-500" },
  { id: "transport", name: "Transport", icon: Car, color: "bg-yellow-500" },
  { id: "health", name: "Health & Beauty", icon: Heart, color: "bg-green-500" },
  { id: "sport", name: "Sport", icon: Dumbbell, color: "bg-cyan-500" },
  { id: "kids", name: "Kids", icon: Baby, color: "bg-gray-500" },
  { id: "leisure", name: "Leisure", icon: Gamepad2, color: "bg-teal-500" },
  { id: "clothing", name: "Clothing", icon: Shirt, color: "bg-sky-500" },
]

export function AddExpenseModal({ open, onOpenChange }: AddExpenseModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (type: "expense" | "income") => {
    // Handle form submission
    console.log({ type, category: selectedCategory, amount, description })
    onOpenChange(false)
    // Reset form
    setSelectedCategory("")
    setAmount("")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="expense" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expense">Expense</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>

          <TabsContent value="expense" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className="h-auto p-3 flex flex-col items-center gap-2"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs">{category.name}</span>
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button onClick={() => handleSubmit("expense")} className="w-full" disabled={!amount || !selectedCategory}>
              Add Expense
            </Button>
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="income-amount">Amount</Label>
              <Input
                id="income-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income-description">Description (Optional)</Label>
              <Input
                id="income-description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button onClick={() => handleSubmit("income")} className="w-full" disabled={!amount}>
              Add Income
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
