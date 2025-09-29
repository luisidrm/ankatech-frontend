import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Detalles({ data }) {
  return (
    <ResponsiveContainer className="w-full max-h-[400px]  min-h-[330px]">

      <AreaChart data={data}>
        <defs>
          <linearGradient id="financeiroGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="imobilizadoGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis dataKey="year" stroke="#aaa" />
        <YAxis stroke="#aaa" className="text-[10px]"
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => `R$ ${(val / 1000000).toFixed(1)}M`}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
          formatter={(value: number) =>
            `R$ ${value.toLocaleString("pt-BR")}`
          }
        />

        <Area
          type="monotone"
          dataKey="financeiro"
          stackId="1"
          stroke="#34d399"
          fill="url(#financeiroGradient)"
        />
        <Area
          type="monotone"
          dataKey="imobilizado"
          stackId="1"
          stroke="#60a5fa"
          fill="url(#imobilizadoGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}