"use client"

import { Card, CardContent, CardDescription } from "./ui/card";
import { XAxis, YAxis, BarChart, ResponsiveContainer, ReferenceLine, Bar, Cell, LabelList } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Top() {

  const data = [
    { label: "2025", value: 2679930 },
    { label: "Hoje", value: 2679930 },
    { label: "2035", value: 3173960 },
    { label: "2045", value: 2173960 },
    // Ejemplo con negativo para mostrar barra debajo de la línea:
    // { label: "2055", value: -150000 },
  ];


  return (
    <div className="bg-transaparent text-white flex w-full h-[230px] pl-12 pt-12">
      <div className="bg-transaparent text-white">
        <Select>
          <SelectTrigger className="w-[250px] h-8 bg-black border-white text-white border-1-white rounded-2xl">
            <SelectValue className="text-xl" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white text-white overflow-y-scroll scrollbar text-xl">
            <SelectItem value="option1">Matheus Silvera</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
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
      <div className="w-[70%] text-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={200}
            height={200}
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 8, left: 8, bottom: 28 }} // espacio para labels debajo
          >
            <XAxis dataKey="value" tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              domain={["auto", "auto"]}
            />
            <ReferenceLine y={0} stroke="#e5e7eb" />
            <Bar dataKey="value" barSize={24}>
              {data.map((entry) => (
                <Cell key={entry.value} fill={entry.value >= 0 ? "#1e40af" : "#dc2626"} />
              ))}
              {/* muestra el valor exacto encima de cada barra */}
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
