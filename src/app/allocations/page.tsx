import { AllocationTimeline } from "@/components/AllocationComponent";
import { Allocation } from "@/types/allocation";
import Link from "next/link";

export default function Page() {
  const items: Allocation = [
    {
      id: 1,
      title: 'Alocação 1',
      start: '2023-01-01',
      end: '2023-06-30',
      category: 'Categoria A',
      financed: true,
      progress: { current: 50, total: 100 },
      amount: 5000,
      totalAmount: 10000,
      lastUpdate: '2023-05-01'
    },
    {
      id: 2,
      title: 'Alocação 2',
      start: '2024-01-01',
      end: '2028-06-30',
      category: 'Categoria B',
      financed: true,
      progress: { current: 30, total: 100 },
      amount: 30000,
      totalAmount: 100000,
      lastUpdate: '2024-05-01'
    }
  ]
  return (
    <div className="w-full h-full bg-[#101010] text-white p-4 space-y-4 flex justify-center place-items-center">
      <div 
      className="w-[70%] h-auto flex-justify-center place-items-center border-2 py-8
       border-gray-700 rounded-lg p-4">
        <div className="flex justify-center gap-8 pb-6 items-center mb-4 w-full">
          <Link href={"/allocations"}  className="font-semibold text-sm text-white">Allocations</Link>
          <Link href={"/"} className="font-semibold text-sm text-white">Projection</Link>
          <Link href={"/"} className="font-semibold text-sm text-white">Historic</Link>
        </div>
        <AllocationTimeline items={items} />
      </div>
        {/* <span className="fixed w-2 h-96 top-36 rounded-xl z-10 bg-gray-400" /> */}
    </div>
  )
}