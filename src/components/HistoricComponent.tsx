"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type{ UpdateSimulationBody } from "@/schemas/simulation.schema"
import { getHistoric } from "@/lib/request/historic"

type Props = {
  data: unknown[]
  simulations: UpdateSimulationBody[]
}

export function SimulationHistory({ data, simulations }: Props) {
  return (
    <Card className="bg-black text-white border-gray-800 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <Select onValueChange={(val:number)=>getHistoric(val)}>
          <SelectTrigger className="w-[220px] rounded-full bg-black border-gray-600 text-white">
            <SelectValue placeholder="Selecione usuário" />
          </SelectTrigger>
          <SelectContent className="bg-black border-gray-700 text-white">
            {data.map(item => (
              <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
            ))
            }
          </SelectContent>
        </Select>
      </div>

      <h2 className="text-lg font-semibold mb-4">Histórico de simulações</h2>
      <hr className="border-gray-700 mb-4" />

      <div className="flex flex-col gap-4">
        {simulations.map((sim) => (
          <div
            key={sim.id}
            className="rounded-xl border border-gray-700 p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`h-6 w-6 rounded-full`}
                  style={{
                    background: sim.color ?? "linear-gradient(to right,#3b82f6,#9333ea)",
                  }}
                />
                <span className="font-medium">{sim.name}</span>
              </div>
              <Button
                variant="outline"
                className="rounded-full border-none text-gray-300 bg-gray-800"
              >
                Ver no gráfico
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-6 mt-6 text-gray-400">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-800"
        >
          <ChevronLeft />
        </Button>
        <span>Página 1 de 10</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-800"
        >
          <ChevronRight />
        </Button>
      </div>
    </Card >
  )
}
