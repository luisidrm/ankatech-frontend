import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export default function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-[#1B1B1B] text-white border-none"><EllipsisVertical /></DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1B1B1B] text-white border-none">
        <DropdownMenuLabel>Edit Simulation</DropdownMenuLabel>
        <DropdownMenuItem>Delete Simulation</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Create new Version</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
