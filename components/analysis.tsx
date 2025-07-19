"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComparisonChart } from "@/components/comparison-chart"
import { MonthlyTrendChart } from "@/components/monthly-trend-chart"
import { CategoryPieChart } from "@/components/category-pie-chart"
import { TransactionsList } from "@/components/transactions-list"
import { CategoryTable } from "@/components/category-table"
import { AccountSummary } from "@/components/account-summary"
import { CashFlowSummary } from "@/components/cash-flow-summary"
import { Calendar, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react"

export function Analysis() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          </div>
          <Button variant="ghost" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          February 2023
        </Button>
      </div>

      {/* Account Summary */}
      <AccountSummary />

      {/* General Balance Card */}
      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
        <CardContent className="p-6 text-center">
          <p className="text-emerald-100 text-sm mb-2">General Balance</p>
          <p className="text-4xl font-bold mb-4">+$4,000</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUpRight className="h-4 w-4 text-green-300" />
                <span className="text-sm text-emerald-100">Income</span>
              </div>
              <p className="text-xl font-bold">$6,000</p>
              <p className="text-xs text-emerald-200">4 Transactions</p>
            </div>

            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <ArrowDownRight className="h-4 w-4 text-red-300" />
                <span className="text-sm text-emerald-100">Expenses</span>
              </div>
              <p className="text-xl font-bold">$2,000</p>
              <p className="text-xs text-emerald-200">4 Transactions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Comparison Chart */}
        <Card>
          <CardContent className="p-6">
            <ComparisonChart />
          </CardContent>
        </Card>

        {/* Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Pie Chart Categories
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-100 text-green-700 hover:bg-green-100 h-6 px-2 text-xs">
                  Income
                </Button>
                <Button size="sm" className="bg-red-100 text-red-700 hover:bg-red-100 h-6 px-2 text-xs">
                  Expenses
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart />
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card>
        <CardContent className="p-6">
          <MonthlyTrendChart />
        </CardContent>
      </Card>

      {/* Cash Flow Summary */}
      <CashFlowSummary />

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">View Transactions</TabsTrigger>
          <TabsTrigger value="categories">Category Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
