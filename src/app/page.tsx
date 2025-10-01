"use client"

import Bottom from "@/components/Bottom";
import Center from "@/components/Center";
import Dropdown from "@/components/DropdownMenu";
import StatusToggle from "@/components/StatusToggle";
import Timeline from "@/components/Timeline";
import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { projectionGet } from "@/lib/request/projection";
import { userList } from "@/lib/request/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { UpdateSimulationBody } from "@/schemas/simulation.schema";
import { editSimulation } from "@/lib/request/simulation";
import UpdateSimulationForm from "@/components/forms/UpdateSimulationForm"

enum Toggle {
  Actual = "actual",
  Original = "original"
}

export default function Home() {
  const queryClient = useQueryClient()

  const [toggle, setToggle] = useState<Toggle>(Toggle.Original)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [status, setStatus] = useState<"alive" | "dead" | "invalid">("alive")
  const [updateData, setUpdateData] = useState<UpdateSimulationBody>({})

  const [openUpdate, setOpenUpdate] = useState(false)

  const [duplicateId, setDuplicateId] = useState<number | undefined>()

  const {data} = useQuery({ queryKey: ['users'], queryFn: () => userList() })

  const { data: projection } = useQuery({
    queryKey: ["projection", selectedId],
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    queryFn: () => projectionGet(selectedId!, status), // only runs if selectedId is set
    enabled: !!selectedId, // prevents query from running with null
  })

  const fillUpdateData = (item: UpdateSimulationBody) => {
    setUpdateData(item)
    setOpenUpdate(!openUpdate)
  }

  return (
    <div className="bg-[#101010] text-white h-auto">
      {openUpdate &&
        <UpdateSimulationForm
          fillUpdateData={fillUpdateData}
          openUpdate={openUpdate}
          updateData={updateData}
        />
      }
      <Top 
        data={data}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <div className="w-full h-[30px] bg-transparent flex justify-center place-items-center mb-2">
        <StatusToggle status={status} setStatus={setStatus} />
      </div>
      <Center
        projection={projection}
        toggle={toggle}
      />
      <div className="w-full h-[30px] my-4 bg-transparent flex justify-center place-items-center mb-2">
        <ToggleGroup type="single" value={toggle}
          onValueChange={(val: Toggle) => {
            if (val) setToggle(val);
          }}
        >
          <ToggleGroupItem value={Toggle.Original} aria-label="Plano Original"
            className="bg-[#1B1B1B] rounded-lg border-[#41648A] border-2 data-[state=on]:bg-transparent data-[state=on]:text-white ">
            <input type="checkbox" checked={toggle === "original"} name="original" id="original"
              className={`h-5 w-5 cursor-pointer appearance-none rounded-full border-2 
                transition-all duration-200
                ${toggle === "original"
                  ? "border-[#41648A] bg-[#41648A] ring-2 ring-offset-1 ring-offset-black ring-[#41648A]"
                  : "border-gray-500 bg-[#1B1B1B]"}
              `}
            />
            <span className="max-md:hidden">Plano Original</span>
            {/* <Button type="button" className="bg-transparent p-0 hover:bg-transparent"><EllipsisVertical /></Button> */}
            <Dropdown simulation={projection[0].id} fillUpdateData={fillUpdateData} updateData={updateData} />
          </ToggleGroupItem>
          <ToggleGroupItem value={Toggle.Actual} aria-label="Situacao"
            className="bg-[#1B1B1B] rounded-lg border-[#48F7A1] border-2 data-[state=on]:bg-transparent data-[state=on]:text-white">
            <input type="checkbox" name="actual" id="actual" checked={toggle === "actual"}
              className={`h-5 w-5 cursor-pointer appearance-none rounded-full border-2 
                transition-all duration-200
                ${toggle === "actual"
                  ? "border-[#48F7A1] bg-[#48F7A1] ring-2 ring-offset-1 ring-offset-black ring-[#48F7A1]"
                  : "border-gray-500 bg-[#1B1B1B]"}
              `}
            />
            <span className="max-md:hidden">Situacao atual {`${Date.prototype.getMonth.call(new Date())}/${Date.prototype.getFullYear.call(new Date())}`}</span>
            {/* <Button type="button" onClick={()=>setOption(!option)} className="bg-transparent p-0 hover:bg-transparent"><EllipsisVertical /></Button> */}
            <Dropdown simulation={projection[1].id} fillUpdateData={fillUpdateData} updateData={updateData} />
          </ToggleGroupItem>
          <Button className="bg-[#1B1B1B] rounded-lg bg-transparent hover:bg-transparent border-2 border-[#F7B748]">Realizado</Button>
          <Button className="bg-[#1B1B1B] rounded-lg bg-transparent hover:bg-transparent ">+ Adicionar Simulacion</Button>
        </ToggleGroup>
      </div>
      <Timeline/>
      <Bottom
        toggle={toggle}
      />
    </div >
  );
}
