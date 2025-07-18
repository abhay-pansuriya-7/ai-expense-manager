"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"

export function AccountSummary() {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <CardContent className="p-6 space-y-4">
        {/* Account Selector */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="text-white hover:bg-blue-500/20 p-0 h-auto">
            <span className="flex items-center gap-2">
              Main Account
              <ChevronDown className="h-4 w-4" />
            </span>
          </Button>
          <Search className="h-5 w-5" />
        </div>

        {/* Account Balance */}
        <div className="space-y-2">
          <div>
            <p className="text-blue-100 text-sm">Account balance</p>
            <p className="text-3xl font-bold">10,157 $</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-blue-100 text-sm">This month</p>
            <p className="text-lg font-semibold text-green-300">+2,775$</p>
          </div>
        </div>

        {/* Other Accounts */}
        <div className="pt-2 border-t border-blue-500/30">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm">Other Accounts</p>
              <p className="text-blue-100 text-sm">Credit card</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">2000$</p>
              <p className="text-sm text-red-300">+2,000$</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
