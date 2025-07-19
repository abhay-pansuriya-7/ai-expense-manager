"use client"
import { motion } from "framer-motion"
import { Analysis } from "@/components/analysis"

const Analytics = () => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary/5 dark:to-primary/20">
          <div className="container mx-auto px-4 pb-20 pt-4 max-w-7xl">
            <Analysis />
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default Analytics;