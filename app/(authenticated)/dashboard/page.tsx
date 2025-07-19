"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { AddExpenseModal } from "@/components/add-expense-modal"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary/5 dark:to-primary/20">
          <div className="mx-auto px-2 sm:px-4 pb-20 pt-4 max-w-7xl">
            <Dashboard />
          </div>
          {/* Floating Action Button */}
          <Button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-24 right-4 sm:right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50 md:bottom-6"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>

          <AddExpenseModal open={showAddModal} onOpenChange={setShowAddModal} />
        </div>
      </motion.div>
    </main>
  )
}
