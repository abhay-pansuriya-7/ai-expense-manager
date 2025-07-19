"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { Analysis } from "@/components/analysis"
import { AddExpenseModal } from "@/components/add-expense-modal"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 pb-20 pt-4 max-w-7xl">
              {activeTab === "dashboard" && <Dashboard />}
              {activeTab === "analysis" && <Analysis />}
            </div>

            {/* Floating Action Button */}
            <Button
              onClick={() => setShowAddModal(true)}
              className="fixed bottom-20 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50 md:bottom-6"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>

            <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <AddExpenseModal open={showAddModal} onOpenChange={setShowAddModal} />
          </div>
        </motion.div>
      </main>
    </div>
  )
}
