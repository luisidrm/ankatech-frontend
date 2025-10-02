"use client"

import { getTransaction } from "@/lib/request/transaction"
import { useQuery } from "@tanstack/react-query"


const years = [2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060]

type Props={
  id: number|undefined
}

export default function Timeline({id}:Props) {
  const {data} = useQuery({
    queryKey:["income", "expense"],
    queryFn:()=>getTransaction(id!),
    enabled: !!id
  })

  return (
    <div className="w-[90%] bg-transparent place-self-center text-white p-6 mb-8 rounded-lg">
      <h2 className="text-green-500 font-semibold mb-12">Timeline</h2>

      <div className="relative">
        <div className="flex items-center relative mb-12">
          <span className="absolute -top-6 text-green-500 font-medium">Salário</span>
          <div className="flex-1 border-t border-gray-600 relative">
            {data.income.map((e) => (
              <div
                key={e.label}
                className="absolute flex flex-col items-center"
                style={{ left: `${((e.year - 2025) / (2060 - 2025)) * 100}%` }}
              >
                <div className="text-xs text-green-400 mb-1">{e.value}</div>
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center relative mb-12">
          <div className="flex-1 flex justify-between text-center">
            {years.map((y, i) => (
              <div key={y} className="flex flex-col items-center">
                <span className="font-bold">{y}</span>
                <span className="text-sm text-gray-400">{45 + i * 5}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center relative mt-6">
          <span className="absolute -top-6 text-red-400 font-medium">Custo de vida</span>
          <div className="flex-1 border-t border-gray-600 relative">
            {data.expenses.map((e) => (
              <div
                key={e.id}
                className="absolute flex flex-col items-center"
                style={{ left: `${((e.year - 2025) / (2060 - 2025)) * 100}%` }}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full mb-1" />
                <div className="text-xs text-red-400">{e.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
