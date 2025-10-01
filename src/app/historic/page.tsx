import { SimulationHistory } from "@/components/HistoricComponent";
import { userList } from "@/lib/request/users";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
      const {data} = useQuery({ queryKey: ['users'], queryFn: () => userList() })
    
  return(
    <div className="w-full h-full bg-[#101010] text-white p-4 space-y-4 flex justify-center place-items-center">
      <SimulationHistory data={data} simulations={simulations} />
    </div>
  )
}