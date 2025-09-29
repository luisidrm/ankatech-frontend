"use client"


type Event = {
  year: number
  age: number
  label: string
  value: string
  color: "green" | "red"
}

const salaryEvents: Event[] = [
  { year: 2025, age: 45, label: "CLT", value: "R$ 15.000", color: "green" },
  { year: 2030, age: 50, label: "CLT+Autônomo", value: "R$ 20.000", color: "green" },
  { year: 2035, age: 55, label: "Autônomo", value: "R$ 35.000", color: "green" },
  { year: 2045, age: 65, label: "Aposentadoria", value: "", color: "green" },
]

const costEvents: Event[] = [
  { year: 2025, age: 45, label: "Custo de vida", value: "R$ 8.000", color: "red" },
  { year: 2030, age: 50, label: "", value: "R$ 12.000", color: "red" },
  { year: 2040, age: 60, label: "", value: "R$ 20.000", color: "red" },
  { year: 2045, age: 65, label: "", value: "R$ 10.000", color: "red" },
  { year: 2055, age: 75, label: "", value: "R$ 15.000", color: "red" },
]

const years = [2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060]

export default function Timeline() {
  return (
    <div className="w-[90%] bg-transparent place-self-center text-white p-6 mb-8 rounded-lg">
      <h2 className="text-green-500 font-semibold mb-12">Timeline</h2>

      <div className="relative">
        <div className="flex items-center relative mb-12">
          <span className="absolute -top-6 text-green-500 font-medium">Salário</span>
          <div className="flex-1 border-t border-gray-600 relative">
            {salaryEvents.map((e) => (
              <div
                key={e.label}
                className="absolute flex flex-col items-center"
                style={{ left: `${((e.year - 2025) / (2060 - 2025)) * 100}%` }}
              >
                <div className="text-xs text-green-400 mb-1">{e.label} {e.value}</div>
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
            {costEvents.map((e, i) => (
              <div
                key={e.label}
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
