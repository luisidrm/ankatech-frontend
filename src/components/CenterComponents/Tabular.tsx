import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function Tabular({data}){
  return(
    <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Ano</TableHead>
                  <TableHead className="text-gray-400">Original Plan</TableHead>
                  <TableHead className="text-gray-400">Current Situation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell className="font-semibold">{row.year}</TableCell>
                    <TableCell>
                      {row.originalPlan
                        ? `R$ ${row.originalPlan.toLocaleString("pt-BR")}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {row.currentSituation
                        ? `R$ ${row.currentSituation.toLocaleString("pt-BR")}`
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
  )
}