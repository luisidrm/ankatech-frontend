import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function Tabular({data}){
  return(
    <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Ano</TableHead>
                  <TableHead className="text-gray-400">Financeiro</TableHead>
                  <TableHead className="text-gray-400">Imobilizado</TableHead>
                  <TableHead className="text-gray-400">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell className="font-semibold">{row.year}</TableCell>
                    <TableCell>
                      {row.financeiro
                        ? `R$ ${row.financeiro.toLocaleString("pt-BR")}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {row.imobilizado
                        ? `R$ ${row.imobilizado.toLocaleString("pt-BR")}`
                        : "—"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {row.total
                        ? `R$ ${row.total.toLocaleString("pt-BR")}`
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
  )
}