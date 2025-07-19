"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

const data = [
  { month: "Jan", income: 800, expenses: 400 },
  { month: "Feb", income: 600, expenses: 300 },
  { month: "Mar", income: 700, expenses: 500 },
  { month: "Apr", income: 634, expenses: 400 },
  { month: "May", income: 500, expenses: 200 },
  { month: "Jun", income: 600, expenses: 350 },
]

export function ComparisonChart() {
  return (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Comparison Chart</h3>
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Income</Badge>
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Expenses</Badge>
        </div>
      </div>

      {/* Chart */}
      <ChartContainer
        config={{
          income: {
            label: "Income",
            color: "#22c55e",
          },
          expenses: {
            label: "Expenses",
            color: "#ef4444",
          },
        }}
        className="h-[200px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Apr</p>
          <p className="font-semibold text-red-600">$634,673</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Apr</p>
          <p className="font-semibold text-green-600">$504,343</p>
        </div>
      </div>
    </div>
  )
}
