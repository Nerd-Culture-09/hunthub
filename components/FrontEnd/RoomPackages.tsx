import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a package" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Room Packages</SelectLabel>
          <SelectItem value="apple">M250 / night STANDARD</SelectItem>
          <SelectItem value="banana">M350 / night </SelectItem>
          <SelectItem value="blueberry">M100 / 2 hours STANDARD</SelectItem>
          <SelectItem value="grapes">M150 /  2 Hours</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
