"use client"

import React from "react"
import { Progress } from "./ui/progress"

type ProjectionCardProps = {
  year: number
  age: number
  value: number
  change?: string // e.g. "+18,37%"
  showStripes?: boolean
}

export default function ProjectionCard({
  year,
  age,
  value,
  change,
  showStripes = false,
}: ProjectionCardProps) {
  return (
    <div className="flex flex-col items-center w-64">
      <div className="mb-2 text-center">
        <span className="font-semibold text-white">R$: {value}</span>
        {change && (
          <span className="ml-2 text-sm font-medium text-cyan-400">
            {change}
          </span>
        )}
      </div>

      <div className="w-full h-10 flex items-center justify-center">
        {!showStripes ? (
                
          <Progress value={(value/7000000)*100}  className="w-40 h-full rounded-sm bg-gradient-to-r from-cyan-400 to-indigo-900" />
        ) : (
          <div className="flex gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <Progress
                key={i*2}
                value={(value/7000000)*100}
                className="w-2 h-10 rounded-sm bg-gradient-to-b from-cyan-400 to-indigo-500"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 text-center">
        <div className="text-gray-400 text-sm">{year}</div>
        <div className="font-semibold text-blue-400">{age} anos</div>
      </div>
    </div>
  )
}
