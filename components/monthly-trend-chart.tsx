"use client"

import { ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

const data = [
  { date: "Feb 01", amount: 500 },
  { date: "Feb 03", amount: 400 },
  { date: "Feb 05", amount: 600 },
  { date: "Feb 07", amount: 450 },
  { date: "Feb 09", amount: 550 },
  { date: "Feb 11", amount: 500 },
  { date: "Feb 13", amount: 650 },
  { date: "Feb 15", amount: 580 },
  { date: "Feb 17", amount: 520 },
  { date: "Feb 19", amount: 600 },
  { date: "Feb 21", amount: 480 },
  { date: "Feb 23", amount: 550 },
  { date: "Feb 25", amount: 620 },
  { date: "Feb 27", amount: 590 },
]

export function MonthlyTrendChart() {
  return (
    <div className="space-y-4">
      {/* Header with date navigation */}
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">Feb 01 - 28, 2023</p>
          <p className="text-lg font-semibold">+$910,565</p>
        </div>
      </div>

      {/* Chart */}
      <ChartContainer
        config={{
          amount: {
            label: "Amount",
            color: "#3b82f6",
          },
        }}
        className="h-[200px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="amount" stroke="#3b82f6" fill="url(#colorGradient)" strokeWidth={2} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Time period buttons */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm">
          Week
        </Button>
        <Button variant="default" size="sm">
          Month
        </Button>
        <Button variant="outline" size="sm">
          Year
        </Button>
        <Button variant="outline" size="sm">
          All
        </Button>
      </div>
    </div>
  )
}
