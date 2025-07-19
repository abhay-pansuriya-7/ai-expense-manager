"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, PieChart, Home, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"


export function BottomNavigation() {

  const [activeTab, setActiveTab] = useState("");

  const pathname = usePathname();
  const path = pathname?.substring(1) || "dashboard";

  useEffect(() => {
    const currentPath = path;

    setActiveTab(currentPath);
  }, [path]);

  const router = useRouter()
  const onTabChange = (tab: string) => {
    router.push("/" + tab);
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "categories", label: "Categories", icon: PieChart },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activeTab === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 ${isActive ? "text-primary dark:text-primary" : "text-gray-600 dark:text-gray-400"
                }`}
            >
              <IconComponent className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
