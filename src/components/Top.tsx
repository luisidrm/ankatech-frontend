"use client"

import { Card, CardContent, CardDescription } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import ProjectionCard from "./ProjectionCard";
import type{ User } from "@/types/user";

type Props={
  data: User[]
  selectedId: string|null
  setSelectedId: (arg0: string)=>void
}

export default function Top({data, selectedId, setSelectedId}:Props) {

  return (
    <div className="bg-transaparent text-white flex justify-between w-full h-[230px] pl-12 pt-12">
      <div className="bg-transaparent text-white">
        <Select onValueChange={(val) => setSelectedId(val)}>
          <SelectTrigger className="w-[250px] h-8 bg-black border-white text-white border-1-white rounded-2xl">
            <SelectValue className="text-xl" />
          </SelectTrigger>
          <SelectContent  className="bg-black border-white text-white overflow-y-scroll scrollbar text-xl">
          {data.map(data=>(
            <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
          ))
        }
        </SelectContent>
        </Select>
        <Card className="bg-transparent h-12 border-none pt-6 pl-2">
          <CardDescription className="text-[10px] text-slate-500 font-bold">Patrimonio Liquido Total</CardDescription>
          <CardContent className="font-bold pl-0 text-xl text-white">
            <span className="text-slate-500">R$ </span>
            2.000.000,00
            <span className="absolute text-[10px] mt-2 ml-1 text-blue-500">+54%</span>
          </CardContent>
        </Card>
      </div>
      <main className="flex gap-6 bg-transparent ">
        <ProjectionCard year={2025} age={45} value={2000000}/>

        <ProjectionCard
          year={2035}
          age={55}
          value={2000000}
          change="+18,37%"
          showStripes
        />

        <div className="opacity-50">
          <ProjectionCard
            year={2045}
            age={65}
            value={2000000}
            change="-10,3%"
            showStripes
          />
        </div>
      </main>
    </div>
  );
}
