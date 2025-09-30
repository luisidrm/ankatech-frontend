"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, Pencil, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { CreateAllocationFormData, UpdateAllocationFormData } from "@/schemas/allocation"

type Props = {
  items: CreateAllocationFormData[]
  open: boolean
  setOpen: (arg0: boolean) => void
  fillDuplicate: (arg0: UpdateAllocationFormData) => void
  fillUpdateData: (arg0: UpdateAllocationFormData)=>void
}

export function AllocationTimeline({ items, open, setOpen, fillDuplicate, fillUpdateData }: Props) {

  return (
    <Card className="bg-black border-gray-700 text-white w-[90%]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Timeline de alocações manuais
        </CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                Alocações:
                <Button variant="outline" className="bg-black border-gray-600 text-white rounded-full hover:bg-gray-800">
                  Todas
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-gray-700 text-white">
              <DropdownMenuItem>Todas</DropdownMenuItem>
              <DropdownMenuItem>Ativas</DropdownMenuItem>
              <DropdownMenuItem>Encerradas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setOpen(!open)} className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-2 rounded-lg border border-gray-700 p-4 z-20 bg-[#1B1B1B]"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">{item.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-900 text-green-200">
                    {item.type}
                  </Badge>
                  {item.withFinancing && (
                    <Badge variant="outline" className="bg-gray-800 text-white">
                      $ Financiado
                    </Badge>
                  )}
                </div>
                {item.startDate && (
                  <span className="text-sm text-gray-400">
                    {item.startDate}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1 border-orange-600 text-orange-500 hover:bg-orange-900"
                  onClick={()=>fillDuplicate(item)}
                >
                  <Pencil className="h-4 w-4" />
                  Atualizar
                </Button>
                <div className="text-right">
                  <div className="font-semibold">
                    R$ {item.value}
                  </div>
                  {item.downPayment && (
                    <div className="text-sm text-gray-400">
                      de R$ {item.downPayment}
                    </div>
                  )}
                  {item.interestRate && (
                    <div className="text-xs text-gray-500">
                      Última atualização: {item.interestRate}
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black border-gray-700 text-white">
                    <DropdownMenuItem onClick={() => fillUpdateData(item)}>Editar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {item.withFinancing &&
              <div className="flex flex-col gap-1 w-[60%]">
                <span className="text-xs text-gray-400">
                  Progresso: {item.value - item.downPayment}/{item.installments} parcelas
                </span>
                <Progress
                  value={(item.value - item.downPayment / item.installments) * 100}
                  className="h-2 bg-white"
                />
              </div>
            }
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
