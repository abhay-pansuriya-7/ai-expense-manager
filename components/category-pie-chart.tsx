"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  { name: "Shopping", value: 800.5, color: "#3b82f6" },
  { name: "Home", value: 400.52, color: "#22c55e" },
  { name: "Food & Drink", value: 300.48, color: "#ef4444" },
  { name: "Trips", value: 69.0, color: "#a855f7" },
]

const COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#a855f7"]

export function CategoryPieChart() {
  const total = data.reduce((sum, entry) => sum + entry.value, 0)

  return (
    <div className="relative">
      <ChartContainer
        config={{
          value: {
            label: "Amount",
          },
        }}
        className="h-[250px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Center Amount Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
          <p className="text-2xl font-bold">${total.toLocaleString()}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
