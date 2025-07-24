"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { ThemedSelect } from "./themed-select"
import * as Icons from "lucide-react"
import { iconCategories, IconColorOptions } from "@/lib/icons"

// Comprehensive icon options organized by category
const transactionTypeOptions = [
  { value: "EXPENSE", label: "Expense", icon: <span className="text-red-500 text-lg">↓</span> },
  { value: "INCOME", label: "Income", icon: <span className="text-green-500 text-lg">↑</span> },
]

// Flatten all icons into a single array
const allIcons = Object.values(iconCategories).flat()

interface CategoryFormProps {
  category?: any
  onClose: () => void,
  type: string
}

export function CategoryForm({ category, onClose, type }: CategoryFormProps) {

  const [formData, setFormData] = useState({
    name: category?.name || "",
    type: type,
    color: category?.color || "#FF6B6B",
    icon: category?.icon || "UtensilsCrossed",
    limit: category?.limit || "",
  })

  const [selectedIconCategory, setSelectedIconCategory] = useState("All")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Render icon component
  const renderIcon = (iconName: string, size = 20) => {
    const IconComponent = (Icons as any)[iconName as keyof typeof Icons]

    return IconComponent ? <IconComponent size={size} /> : <Icons.Circle size={size} />
  }

  // Get icon options based on selected category
  const getIconOptions = () => {
    const icons = selectedIconCategory === "All" ? allIcons : (iconCategories as any)[selectedIconCategory] || []

    return icons.map((iconName: string) => ({
      value: iconName,
      label: iconName,
      icon: <div style={{ color: formData.color }}>{renderIcon(iconName, 20)}</div>,
    }))
  }

  // Get category options for icon filtering
  const iconCategoryOptions = [
    { value: "All", label: "All Icons" },
    ...Object.keys(iconCategories).map((category) => ({
      value: category,
      label: category,
    })),
  ]

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Category Type</Label>
          <ThemedSelect
            options={transactionTypeOptions}
            value={transactionTypeOptions.find((t) => t.value === formData.type) || null}
            onChange={(option: any) => handleInputChange("type", option?.value || "EXPENSE")}
            placeholder="Select transaction type"
            isSearchable={false}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <ThemedSelect
            options={IconColorOptions}
            value={IconColorOptions.find((c) => c.value === formData.color) || null}
            onChange={(option: any) => handleInputChange("color", option?.value || "#FF6B6B")}
            placeholder="Select color"
            isSearchable={false}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <div className="space-y-3">
            {/* Current selected icon */}
            <div className="flex items-center space-x-2 p-2 border rounded">
              <div style={{ color: formData.color }}>{renderIcon(formData.icon, 24)}</div>
              <span className="text-sm font-medium">{formData.icon}</span>
            </div>

            {/* Icon category filter */}
            <ThemedSelect
              options={iconCategoryOptions}
              value={iconCategoryOptions.find((c) => c.value === selectedIconCategory) || null}
              onChange={(option: any) => setSelectedIconCategory(option?.value || "All")}
              placeholder="Filter by category"
              isSearchable={false}
              size="sm"
            />

            {/* Icon selector */}
            <ThemedSelect
              options={getIconOptions()}
              value={getIconOptions().find((i: any) => i.value === formData.icon) || null}
              onChange={(option: any) => handleInputChange("icon", option?.value || "UtensilsCrossed")}
              placeholder="Search and select icon"
              isSearchable={true}
            />
          </div>
        </div>

        {formData?.type === "EXPENSE" && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="limit">Expense Limit ($)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Set a maximum limit that you want to spend on this category. You'll be notified when you reach this
                    limit.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="limit"
              type="number"
              value={formData.limit}
              onChange={(e) => handleInputChange("limit", e.target.value)}
              placeholder="Enter spending limit"
              min="0"
              step="0.01"
            />
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{category ? "Update" : "Create"} Category</Button>
        </div>
      </form>
    </TooltipProvider>
  )
}
