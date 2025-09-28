import { SimulationHistory } from "@/components/HistoricComponent";
import { Simulation } from "@/types/simulation";

export default function Page() {
  const simulations:Simulation = [
    { id: "1", title: "Simulação A", color: "linear-gradient(to right,#3b82f6,#9333ea)" },
    { id: "2", title: "Simulação B", color: "linear-gradient(to right,#10b981,#3b82f6)" },
    { id: "3", title: "Simulação C", color: "linear-gradient(to right,#f59e0b,#ef4444)",
      versions: [
        { date: "2023-01-01", patrimonio: 100000, retirementAge: 65, version: 1 },
        { date: "2023-06-01", patrimonio: 120000, retirementAge: 64, version: 2 },
        { date: "2024-01-01", patrimonio: 150000, retirementAge: 63, version: 3 },
      ]
     },
  ]



  return(
    <div className="w-full h-full bg-[#101010] text-white p-4 space-y-4 flex justify-center place-items-center">
      <SimulationHistory simulations={simulations} />
    </div>
  )
}