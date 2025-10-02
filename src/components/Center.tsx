"use client";

import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart
} from "recharts";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Tabular from "./CenterComponents/Tabular";
import { useState } from "react";
import Detalles from "./CenterComponents/Detalles";

enum Vista {
  original = "original",
  tabular = "tabular",
  detalles = "detalles"
}
type Props={
  projection: []
  toggle: Readonly<{ toggle?: string }>
}

export default function Center({ projection, toggle }: Props) {
  const [vista, setVista] = useState<Vista>(Vista.original)
  

  return (
    <div className="bg-transparent text-white md:flex block w-auto px-[60px] min-h-[350px] h-auto">
      <div className=" w-auto md:w-full bg-[#1B1B1B] rounded-xl min-h-[330px] py-4">
        <h1 className="w-full flex justify-between place-items-center sm:px-6 py-3 ">
          <Button onClick={()=>setVista(Vista.original)} className="text-xl bg-transparent hover:bg-transparent ">
            Patrimonial Project
          </Button>
          <span className="gap-2 flex place-items-center">
            <Button variant={"custom"} onClick={() => setVista(Vista.detalles)} type="button" className="bg-transparent">Details</Button>
            <Button variant={"custom"} onClick={() => setVista(Vista.tabular)} type="button" className="bg-transparent">Tabular</Button>
          </span>
        </h1>
        {vista === Vista.original &&
          <ResponsiveContainer className="w-full max-h-[400px]  min-h-[330px]">
            <LineChart data={projection} height={300} width={600} className="pt-2 pb-2">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" hide />
              <YAxis dataKey={"total"} className="text-[10px] w-full font-bold flex justify-center" domain={[0, "auto"]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `R$ ${(val / 1000000).toFixed(1)}M`}
              />
              <Line
                type="monotone"
                dataKey="originalPlan"
                stroke="#49F3A5"
                fill="#49F3A5"
                fillOpacity={0.5}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="currentSituation"
                stroke="#67AEFA"
                fill="#67AEFA"
                fillOpacity={0.4}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />

            </LineChart>
          </ResponsiveContainer>
        }
        {vista === Vista.tabular &&
          <Tabular
            data={projection}
          />
        }
        {vista===Vista.detalles &&
          <Detalles data={projection}/>
        }
      </div>
      {toggle === "actual" && <div className="md:w-[40%] w-full md:pl-8 md:space-y-4 max-md:mt-4 max-md:space-x-4 md:block flex">
        <Card className="bg-[#1B1B1B] h-[150px] border-none pt-2 flex flex-col justify-between">
          <CardTitle className="text-[10px] h-[10%] w-11 font-bold bg-[#26503B] ml-3 text-[#37A36E] rounded-sm">Sugestao</CardTitle>
          <CardContent className="p-0 px-3 pt-2 h-[60%] text-[12px] py-2 text-white">Economize R$ 4.110 por 24 meses para voltar ao plano original</CardContent>
          <CardFooter className="w-full h-[20%] flex justify-end">
            <Button type="button" variant={"custom"} className="rounded-3xl">Aceitar</Button>
          </CardFooter>
        </Card>
        <Card className="bg-[#1B1B1B] h-[150px] border-none pt-2 flex flex-col justify-between">
          <CardTitle className="text-[10px] w-11 h-[10%] font-bold bg-[#26503B] ml-3 text-[#37A36E] rounded-md">Sugestao</CardTitle>
          <CardContent className="p-0 px-3 pt-2 text-[12px] h-[60%] py-2 text-white">Economize R$ 4.110 por 24 meses para voltar ao plano original</CardContent>
          <CardFooter className="w-full h-[20%] flex justify-end">
            <Button type="button" variant={"custom"} className="rounded-3xl">Aceitar</Button>
          </CardFooter>
        </Card>
      </div>}

    </div>
  )
}
