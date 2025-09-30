"use client"

import { AllocationTimeline } from "@/components/AllocationComponent";
import type { Allocation } from "../../types/allocation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import AllocationForm from "@/components/forms/AllocationForms";
import { getAllocations } from "@/lib/request/allocation";
import { UpdateAllocationFormData } from "@/schemas/allocation";

export default function Page() {
  const [open, setOpen] = useState(false)

    const [updateData,setUpdate] = useState<UpdateAllocationFormData>({})
    const [openUpdate, setOpenUpdate] = useState(false)
  
    const fillUpdateData=(item:UpdateAllocationFormData)=>{
      setUpdate(item)
      setOpen(!open)
    }

  //   const { data, isLoading, isError } = useQuery({
  //   queryKey: ["allocations"],
  //   queryFn: (id:number)=> getAllocations(id),
  // })

  // if (isLoading) return <p className="text-white">Loading...</p>
  // if (isError) return <p className="text-white">Error loading allocations</p>


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
    <div className="w-full h-full bg-[#101010] text-white md:p-4 p-0 space-y-4 flex justify-center place-items-center">
      {open&&<AllocationForm
        open={open}
        setOpen={setOpen}
      />}
      <div 
      className="w-[70%] h-auto flex-justify-center place-items-center border-2 py-8
       border-gray-700 rounded-lg p-4">
        <div className="flex justify-center gap-8 pb-6 items-center mb-4 w-full">
          <Link href={"/allocations"}  className="font-semibold text-sm text-white">Allocations</Link>
          <Link href={"/"} className="font-semibold text-sm text-white">Projection</Link>
          <Link href={"/"} className="font-semibold text-sm text-white">Historic</Link>
        </div>
        <AllocationTimeline items={items} open={open} setOpen={setOpen} />
      </div>
        {/* <span className="fixed w-2 h-96 top-36 rounded-xl z-10 bg-gray-400" /> */}
    </div>
  )
}