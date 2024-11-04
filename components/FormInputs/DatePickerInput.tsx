"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DatePickerInputProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void; // Updated to handle undefined
  selectedHour: string | undefined;
  setSelectedHour: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedMinute: string | undefined;
  setSelectedMinute: React.Dispatch<React.SetStateAction<string | undefined>>;
  className?: string;
  title: string;
};

export function DatePickerInput({
  date,
  setDate,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  className = "col-span-full",
  title,
}: DatePickerInputProps) {
  const handleDateChange = (day: Date | undefined) => {
    if (day) {
      const newDate = new Date(day); // Clone the selected date
      const hour = selectedHour ? parseInt(selectedHour) : 0;
      const minute = selectedMinute ? parseInt(selectedMinute) : 0;

      // Set the time explicitly
      newDate.setHours(hour);
      newDate.setMinutes(minute);
      newDate.setSeconds(0); // Set seconds to 0 to avoid unwanted values

      setDate(newDate);
    } else {
      setDate(undefined);
    }
  };

  // Function to disable past dates
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of day for comparison
    return date < today;
  };

  return (
    <div className={cn("grid", className)}>
      <h2 className="text-normal font-normal">{title}</h2>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date
              ? `${format(date, "PPP")} at ${selectedHour || "HH"}:${selectedMinute || "MM"}`
              : "Pick a date and time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => {
              // Call handleDateChange when a date is selected
              handleDateChange(day || undefined);
            }}
            initialFocus
            disabled={isPastDate} // Pass the function to disable past dates
          />
          <div className="flex space-x-2 mt-2 p-2">
            <Select
              onValueChange={(value) => {
                setSelectedHour(value);
                if (date) handleDateChange(date); // Update date when hour changes
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(24)].map((_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => {
                setSelectedMinute(value);
                if (date) handleDateChange(date); // Update date when minute changes
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                {["00", "15", "30", "45"].map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
