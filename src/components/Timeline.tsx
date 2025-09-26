"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "CLT", start: 2025, end: 2035, value: 0 },
  { name: "CLT", start: 2035, end: 2045, value: 0 },
  { name: "CLT", start: 2045, end: 2050, value: 0 },
  { name: "CLT", start: 2025, end: 2050, value: 0 },
];

const transformedData = data.flatMap((d) => [
  { name: d.name, year: d.start, value: 0 },
  { name: d.name, year: d.end, value: d.value },
]);

export default function TimelineChart() {
  return (
    <div className="w-full h-[50px] pr-8 my-8">
      <ResponsiveContainer className="">
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 40, left: 80, bottom: 20 }}
        >
          <XAxis
            type="number"
            dataKey="year"
            domain={[2025, 2060]}
            ticks={[2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060]}
          />
          <YAxis type="category" dataKey="name"
            tickLine={false}
            axisLine={false}
          />
          <Bar
            dataKey="value"
            barSize={20}
            fill="#2563eb"
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
