"use client"

import type React from "react"

import { forwardRef } from "react"
import Select, { components, type StylesConfig, type GroupBase } from "react-select"
import { ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
  icon?: React.ReactNode
  color?: string
  disabled?: boolean
}

interface ThemedSelectProps {
  options: Option[]
  value?: Option | Option[] | null
  onChange: (value: Option | Option[] | null) => void
  placeholder?: string
  isSearchable?: boolean
  isMulti?: boolean
  isDisabled?: boolean
  isClearable?: boolean
  className?: string
  error?: boolean
  size?: "sm" | "md" | "lg"
}

// Custom components
const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
    </components.ClearIndicator>
  )
}

const Option = (props: any) => {
  const { data, isSelected, isFocused } = props
  return (
    <components.Option {...props}>
      <div className="flex items-center space-x-3 w-full">
        {data.icon && <div className="flex-shrink-0">{data.icon}</div>}
        <span className="flex-1 truncate">{data.label}</span>
        {data.color && <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: data.color }} />}
      </div>
    </components.Option>
  )
}

const SingleValue = (props: any) => {
  const { data } = props
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center space-x-3">
        {data.icon && <div className="flex-shrink-0">{data.icon}</div>}
        <span className="truncate">{data.label}</span>
        {data.color && (
          <div className="w-3 h-3 rounded-full flex-shrink-0 ml-auto" style={{ backgroundColor: data.color }} />
        )}
      </div>
    </components.SingleValue>
  )
}

const MultiValue = (props: any) => {
  const { data } = props
  return (
    <components.MultiValue {...props}>
      <div className="flex items-center space-x-2">
        {data.icon && <div className="flex-shrink-0">{data.icon}</div>}
        <span className="truncate">{data.label}</span>
      </div>
    </components.MultiValue>
  )
}

export const ThemedSelect = forwardRef<any, ThemedSelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select...",
      isSearchable = false,
      isMulti = false,
      isDisabled = false,
      isClearable = false,
      className,
      error = false,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "min-h-[36px]",
      md: "min-h-[48px]",
      lg: "min-h-[56px]",
    }

    const customStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
      control: (provided, state) => ({
        ...provided,
        minHeight: size === "sm" ? "36px" : size === "lg" ? "56px" : "48px",
        height: "auto",
        borderRadius: "8px",
        borderColor: error ? "hsl(var(--destructive))" : state.isFocused ? "hsl(var(--ring))" : "hsl(var(--border))",
        backgroundColor: "hsl(var(--background))",
        boxShadow: state.isFocused ? "0 0 0 2px hsl(var(--ring) / 0.2)" : "none",
        "&:hover": {
          borderColor: state.isFocused ? "hsl(var(--ring))" : "hsl(var(--border))",
        },
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: size === "sm" ? "2px 12px" : size === "lg" ? "8px 16px" : "4px 12px",
        fontSize: size === "sm" ? "14px" : size === "lg" ? "16px" : "14px",
      }),
      input: (provided) => ({
        ...provided,
        color: "hsl(var(--foreground))",
        fontSize: size === "sm" ? "14px" : size === "lg" ? "16px" : "14px",
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "hsl(var(--muted-foreground))",
        fontSize: size === "sm" ? "14px" : size === "lg" ? "16px" : "14px",
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "hsl(var(--foreground))",
        fontSize: size === "sm" ? "14px" : size === "lg" ? "16px" : "14px",
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: "hsl(var(--secondary))",
        borderRadius: "6px",
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: "hsl(var(--secondary-foreground))",
        fontSize: size === "sm" ? "12px" : "14px",
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: "hsl(var(--secondary-foreground))",
        "&:hover": {
          backgroundColor: "hsl(var(--destructive))",
          color: "hsl(var(--destructive-foreground))",
        },
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: "hsl(var(--popover))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        zIndex: 50,
      }),
      menuList: (provided) => ({
        ...provided,
        padding: "4px",
        maxHeight: "200px",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "hsl(var(--primary))"
          : state.isFocused
            ? "hsl(var(--accent))"
            : "transparent",
        color: state.isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--popover-foreground))",
        borderRadius: "6px",
        margin: "2px 0",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: size === "sm" ? "14px" : "14px",
        "&:active": {
          backgroundColor: state.isSelected ? "hsl(var(--primary))" : "hsl(var(--accent))",
        },
      }),
      noOptionsMessage: (provided) => ({
        ...provided,
        color: "hsl(var(--muted-foreground))",
        fontSize: "14px",
        padding: "12px",
      }),
      loadingMessage: (provided) => ({
        ...provided,
        color: "hsl(var(--muted-foreground))",
        fontSize: "14px",
        padding: "12px",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "hsl(var(--muted-foreground))",
        padding: size === "sm" ? "4px" : "8px",
        "&:hover": {
          color: "hsl(var(--foreground))",
        },
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }),
      clearIndicator: (provided) => ({
        ...provided,
        color: "hsl(var(--muted-foreground))",
        padding: size === "sm" ? "4px" : "8px",
        "&:hover": {
          color: "hsl(var(--foreground))",
        },
      }),
    }

    const handleChange = (newValue: any) => {
      if (isMulti) {
        // Convert readonly array to regular array for multi-select
        onChange(newValue ? [...newValue] : null)
      } else {
        // Single select - pass through as is
        onChange(newValue)
      }
    }

    return (
      <div className={cn("w-full", className)}>
        <Select
          ref={ref}
          options={options}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          isSearchable={isSearchable}
          isMulti={isMulti}
          isDisabled={isDisabled}
          isClearable={isClearable}
          styles={customStyles}
          components={{
            DropdownIndicator,
            ClearIndicator,
            Option,
            SingleValue,
            MultiValue,
          }}
          classNamePrefix="themed-select"
          noOptionsMessage={() => "No options found"}
          loadingMessage={() => "Loading..."}
          {...props}
        />
      </div>
    )
  },
)

ThemedSelect.displayName = "ThemedSelect"
