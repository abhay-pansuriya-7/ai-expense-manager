"use client"

import * as Icons from "lucide-react"
import { ThemedSelect } from "./themed-select"

const renderIcon = (iconName: string, size = 16) => {
  const IconComponent = (Icons as any)[iconName as keyof typeof Icons]
  return IconComponent ? <IconComponent size={size} /> : <Icons.Circle size={size} />
}

export function SearchableCategorySelect({
  categories,
  value,
  onValueChange,
  placeholder = "Select category...",
  isSearchable = true,
}: any) {
  const options = categories.map((category: any) => ({
    value: category.id.toString(),
    label: category.name,
    icon: renderIcon(category.icon, 20),
  }))

  const selectedOption = options.find((option: any) => option.value === value) || null

  const handleChange = (selectedOption: any) => {
    onValueChange(selectedOption ? selectedOption.value : "")
  }

  return (
    <ThemedSelect
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable
      size="md"
    />
  )
}
