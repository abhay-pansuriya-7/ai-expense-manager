"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, Info, DollarSign, FileText, Repeat, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { SearchableCategorySelect } from "@/components/searchable-category-select"
import { DatePicker } from "@/components/date-picker"
import { ThemedSelect } from "@/components/themed-select"
import Link from "next/link"

// Mock categories
const expenseCategories = [
  { id: 1, name: "Food & Dining", icon: "UtensilsCrossed" },
  { id: 2, name: "Transportation", icon: "Car" },
  { id: 3, name: "Entertainment", icon: "Film" },
  { id: 4, name: "Shopping", icon: "ShoppingBag" },
  { id: 5, name: "Healthcare", icon: "Heart" },
  { id: 6, name: "Utilities", icon: "Zap" },
  { id: 7, name: "Groceries", icon: "ShoppingCart" },
  { id: 8, name: "Gas & Fuel", icon: "Fuel" },
  { id: 9, name: "Coffee & Tea", icon: "Coffee" },
  { id: 10, name: "Subscriptions", icon: "Repeat" },
]

const incomeCategories = [
  { id: 1, name: "Salary", icon: "Briefcase" },
  { id: 2, name: "Freelance", icon: "Laptop" },
  { id: 3, name: "Investment", icon: "TrendingUp" },
  { id: 4, name: "Business", icon: "Building" },
  { id: 5, name: "Side Hustle", icon: "Zap" },
  { id: 6, name: "Rental Income", icon: "Home" },
  { id: 7, name: "Dividends", icon: "PieChart" },
  { id: 8, name: "Bonus", icon: "Gift" },
]

const transactionTypeOptions = [
  { value: "EXPENSE", label: "Expense", icon: <span className="text-red-500 text-lg">↓</span> },
  { value: "INCOME", label: "Income", icon: <span className="text-green-500 text-lg">↑</span> },
]

const frequencyOptions = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "QUARTERLY", label: "Quarterly" },
  { value: "YEARLY", label: "Yearly" },
]

export default function AddTransactionPage() {
  const [formData, setFormData] = useState({
    type: "EXPENSE",
    amount: "",
    description: "",
    date: new Date(),
    category: "",
    attachments: [],
  })

  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringData, setRecurringData] = useState({
    name: "",
    frequency: "MONTHLY",
    interval: "1",
    startDate: new Date(),
    endDate: null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRecurringChange = (field: string, value: string) => {
    setRecurringData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: any) => {
    const files = Array.from(e.target.files)
    setFormData((prev: any) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }))
  }

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const transactionData = {
      ...formData,
      ...(isRecurring && { recurring: recurringData }),
    }
    console.log("Transaction submitted:", transactionData)
  }

  const currentCategories = formData.type === "EXPENSE" ? expenseCategories : incomeCategories

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary/5 dark:to-primary/20">
      <div className="container mx-auto px-4 py-6 max-w-2xl lg:max-w-4xl pb-[6rem]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
              <Link href="/categories">
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 lg:h-auto lg:w-auto lg:px-4">
                  <ArrowLeft className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">Back</span>
                </Button>
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight truncate">Add Transaction</h1>
                <p className="text-sm lg:text-base text-muted-foreground">Record a new expense or income</p>
              </div>
            </div>

            <TooltipProvider>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                      <DollarSign className="h-5 w-5" />
                      <span>Transaction Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Transaction Type */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Transaction Type</Label>
                      <ThemedSelect
                        options={transactionTypeOptions}
                        value={transactionTypeOptions.find((t) => t.value === formData.type) || null}
                        onChange={(option: any) => handleInputChange("type", option?.value || "EXPENSE")}
                        placeholder="Select transaction type"
                        isSearchable={false}
                      />
                    </div>

                    {/* Amount and Category */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="amount" className="text-sm font-medium">
                          Amount ($)
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          value={formData.amount}
                          onChange={(e) => handleInputChange("amount", e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                          className="h-12 text-lg"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Category</Label>
                        <SearchableCategorySelect
                          categories={currentCategories}
                          value={formData.category}
                          onValueChange={(value: any) => handleInputChange("category", value)}
                          placeholder="Select category..."
                          isSearchable={true}
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Date</Label>
                      <DatePicker
                        date={formData.date}
                        onDateChange={(date) => handleInputChange("date", date)}
                        placeholder="Select transaction date"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Enter transaction description..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    {/* Attachments */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Attachments</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 lg:p-8">
                        <div className="text-center">
                          <Upload className="mx-auto h-10 w-10 lg:h-12 lg:w-12 text-muted-foreground/50" />
                          <div className="mt-4">
                            <Label htmlFor="file-upload" className="cursor-pointer">
                              <span className="text-sm font-medium text-primary hover:text-primary/80">
                                Upload files
                              </span>
                              <Input
                                id="file-upload"
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB each</p>
                          </div>
                        </div>
                      </div>

                      {formData.attachments.length > 0 && (
                        <div className="space-y-2">
                          {formData.attachments.map((file: any, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <FileText className="h-4 w-4 flex-shrink-0" />
                                <span className="text-sm truncate">{file.name}</span>
                                <Badge variant="secondary" className="text-xs flex-shrink-0">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </Badge>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAttachment(index)}
                                className="h-8 w-8 p-0 flex-shrink-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Recurring Transaction */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                      <Repeat className="h-5 w-5" />
                      <span>Recurring Transaction</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Enable this for transactions that repeat regularly, such as monthly subscriptions, salary
                            deposits, or recurring bills.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
                      <Label htmlFor="recurring" className="text-sm font-medium">
                        Make this a recurring transaction
                      </Label>
                    </div>

                    {isRecurring && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 pt-4 border-t"
                      >
                        <div className="space-y-3">
                          <Label htmlFor="recurring-name" className="text-sm font-medium">
                            Recurring Name
                          </Label>
                          <Input
                            id="recurring-name"
                            value={recurringData.name}
                            onChange={(e) => handleRecurringChange("name", e.target.value)}
                            placeholder="e.g., Netflix Subscription, Monthly Salary"
                            className="h-12"
                          />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Frequency</Label>
                            <ThemedSelect
                              options={frequencyOptions}
                              value={frequencyOptions.find((f) => f.value === recurringData.frequency) || null}
                              onChange={(option: any) => handleRecurringChange("frequency", option?.value || "MONTHLY")}
                              placeholder="Select frequency"
                              isSearchable={false}
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="interval" className="text-sm font-medium">
                              Interval
                            </Label>
                            <Input
                              id="interval"
                              type="number"
                              value={recurringData.interval}
                              onChange={(e) => handleRecurringChange("interval", e.target.value)}
                              placeholder="1"
                              min="1"
                              className="h-12"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Start Date</Label>
                            <DatePicker
                              date={recurringData.startDate}
                              onDateChange={(date) => handleRecurringChange("startDate", date)}
                              placeholder="Select start date"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium">End Date (Optional)</Label>
                            <DatePicker
                              date={recurringData.endDate ?? new Date()}
                              onDateChange={(date) => handleRecurringChange("endDate", date)}
                              placeholder="Select end date"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex flex-col-reverse lg:flex-row gap-3 lg:justify-end lg:space-x-4 lg:space-y-0">
                  <Link href="/categories" className="w-full lg:w-auto">
                    <Button type="button" variant="outline" className="w-full lg:w-auto h-12 bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="w-full lg:w-auto h-12">
                    Add Transaction
                  </Button>
                </div>
              </form>
            </TooltipProvider>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
