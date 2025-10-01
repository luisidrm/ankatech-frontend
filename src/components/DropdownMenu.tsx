import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteSimulation, newVersion } from "@/lib/request/simulation";
import type{ UpdateSimulationBody } from "@/schemas/simulation.schema";
import { EllipsisVertical } from "lucide-react";

type Props ={
  simulation: number
  fillUpdateData: (arg0: UpdateSimulationBody)=>void
  updateData: UpdateSimulationBody
}

export default function Dropdown({simulation,fillUpdateData, updateData}:Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-[#1B1B1B] text-white border-none"><EllipsisVertical /></DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1B1B1B] text-white border-none">
        <DropdownMenuItem onClick={()=>fillUpdateData(updateData)}>Edit Simulation</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>deleteSimulation(simulation)}>Delete Simulation</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>newVersion(simulation)}>Create new Version</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
