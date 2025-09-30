"use client"

import { AllocationTimeline } from "@/components/AllocationComponent";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import AllocationForm from "@/components/forms/AllocationForms";
import { getAllocations } from "@/lib/request/allocation";
import type{ UpdateAllocationFormData } from "@/schemas/allocation";
import UpdateAllocationForm from "@/components/forms/UpdateAllocationForm";
import DuplicateAllocationForm from "@/components/forms/DuplicateAllocationForm";

export default function Page() {
  const [open, setOpen] = useState(false)

  const [updateData, setUpdate] = useState<UpdateAllocationFormData>({})
  const [openUpdate, setOpenUpdate] = useState(false)
  const [duplicate, setDuplicate] = useState(false)

  const fillUpdateData = (item: UpdateAllocationFormData) => {
    setUpdate(item)
    setOpenUpdate(!openUpdate)
  }

  const fillDuplicate=(item:UpdateAllocationFormData)=>{
    setUpdate(item)
    setDuplicate(!duplicate)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allocations"],
    queryFn: (id: number) => getAllocations(id),
  })

  if (isLoading) return <p className="text-white absolute place-items-center">Loading...</p>
  if (isError) return <p className="text-white absolute place-items-center">Error loading allocations</p>

  return (
    <div className="w-full h-full bg-[#101010] text-white md:p-4 p-0 space-y-4 flex justify-center place-items-center">
      {open && <AllocationForm
        open={open}
        setOpen={setOpen}
      />}
      {
        openUpdate && <UpdateAllocationForm
          openUpdate={openUpdate}
          fillUpdateData={fillUpdateData}
          updateData={updateData}
        />
      }
      {duplicate&&<DuplicateAllocationForm
        fillDuplicate={fillDuplicate}
        duplicate={duplicate}
        updateData={updateData}

      />}
      <div
        className="w-[70%] h-auto flex-justify-center place-items-center border-2 py-8
       border-gray-700 rounded-lg p-4">
        <div className="flex justify-center gap-8 pb-6 items-center mb-4 w-full">
          <Link href={"/allocations"} className="font-semibold text-sm text-white">Allocations</Link>
          <Link href={"/"} className="font-semibold text-sm text-white">Projection</Link>
          <Link href={"/"} className="font-semibold text-sm text-white">Historic</Link>
        </div>
        <AllocationTimeline
          items={data}
          open={open}
          setOpen={setOpen}
          openUpdate={openUpdate}
          fillUpdateData={fillUpdateData}
        />
      </div>
    </div>
  )
}