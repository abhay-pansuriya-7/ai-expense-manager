"use client"
import { motion } from "framer-motion"
import { Analysis } from "@/components/analysis"

const Analytics = () => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 pb-20 pt-4">
            <Analysis />
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default Analytics;