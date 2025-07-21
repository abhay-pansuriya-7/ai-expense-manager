"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function DatePicker({ date, onDateChange, placeholder = "Pick a date" }: { date: Date, onDateChange: (date: any) => void, placeholder: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full h-12 justify-start text-left font-normal px-4", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-3 h-4 w-4 flex-shrink-0" />
          <span className="truncate">{date ? format(date, "PPP") : placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            onDateChange(selectedDate)
            setOpen(false)
          }}
          initialFocus
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}
