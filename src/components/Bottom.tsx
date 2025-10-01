import { ArrowDownIcon, ArrowUpIcon, CirclePlus, EllipsisVerticalIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useState } from "react";
import { Button } from "./ui/button";
import CreateTransactionForm from "./forms/CreateTransactionForm";
import UpdateTransactionForm from "./forms/UpdateTransactionForm"
import type { UpdateTransaction } from "@/schemas/transaction.schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction, getTransaction } from "@/lib/request/transaction";
import type { UpdateInsuranceBody } from "@/schemas/insurance.schema";
import { getInsurance, deleteInsurance } from "@/lib/request/insurance";
import CreateInsuranceForm from "./forms/CreateInsuranceForm";
import UpdateInsuranceForm from "./forms/UpdateInsuranceForm";

enum Selector {
  Finance = "finance",
  RealEstate = "real_estate"
}

export default function Bottom({ selectedId, toggle }: Readonly<{ toggle: string }>) {
  const queryClient = useQueryClient()

  const [selector, setSelector] = useState<Selector>(Selector.Finance)

  const [updateData, setUpdateData] = useState<UpdateTransaction>({})
  const [updateDataIn, setUpdateDataIn] = useState<UpdateInsuranceBody>({})

  const [openIn, setOpenIn] = useState(false)
  const [updateIn, setUpdateIn] = useState(false)


  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  const fillUpdateData = (item: UpdateTransaction) => {
    setUpdateData(item)
    setOpenUpdate(!openUpdate)
  }
    const fillUpdateDataIn = (item: UpdateInsuranceBody) => {
    setUpdateDataIn(item)
    setUpdateIn(!updateIn)
  }

  const transaction = useQuery({ queryKey: ["transaction"], queryFn: () => getTransaction(selectedId) })
  const insurance = useQuery({ queryKey: ["insurance"], queryFn: () => getInsurance(selectedId) })


  const items: UpdateTransaction[] = [{
    id: 1,
    type: "INCOME",
    value: 2000,
    frequency: "ONE_TIME",
    startDate: "23/03/2020",
    endDate: "23/03/2025"
  }
  ]
  // const insurance: UpdateInsuranceBody[] = [{
  //   id: 2,
  //   name: "NoSe",
  //   startDate: "20/12/2020",
  //   type: "LIFE",
  //   premium: 2300,
  //   endDate:"20/12/2024",
  //   insuredValue: 5000000

  // }]

  const mutation = useMutation(
    {
      mutationFn: (id: number) => deleteTransaction(id),
      onSuccess: () => {
        // refetch transactions after success
        queryClient.invalidateQueries({ queryKey: ["transactions"] })
      },
      onError: (error: unknown) => {
        console.error("❌ Error saving allocation:", error)
      },
    }
  )

  const deleteInsuranceMutation = useMutation(
    {
      mutationFn: (id: number) => deleteInsurance(id),
      onSuccess: () => {
        // refetch transactions after success
        queryClient.invalidateQueries({ queryKey: ["insurance"] })
      },
      onError: (error: unknown) => {
        console.error("❌ Error saving allocation:", error)
      },
    }
  )

  const deleteThis = (id: number) => {
    mutation.mutate(id)
  }

  const confirmDeletion = (id: number) => {
    deleteInsuranceMutation.mutate(id)
  }

  return (
    <div className="w-full h-auto bg-transparent mb-2">
      {open && <CreateTransactionForm
        open={open}
        setOpen={setOpen}
      />}
      {openUpdate && <UpdateTransactionForm
        updateData={updateData}
        fillUpdateData={fillUpdateData}
      />}
      {openIn && <CreateInsuranceForm
        openIn={openIn}
        selectedId={selectedId}
        setOpenIn={setOpenIn}
      />}
      {updateIn&&<UpdateInsuranceForm
        openIn={updateIn}
        selectedId={selectedId}
        updateInsuranceData={updateDataIn}
        fillUpdateDataIn={fillUpdateDataIn}
      />
      }
      <div className="flex justify-between items-center p-4 ">
        <h1 className={`font-semibold text-2xl ${toggle === "actual" ? "text-[#48F7A1]" : "text-[#67AEFA]"}`}>Movements</h1>
        <ToggleGroup
          defaultValue={selector}
          type="single" value={selector} className="bg-transparent"
          aria-label="Text alignment"
          onValueChange={(val: Selector) => {
            if (val) setSelector(val);
          }}
        >
          <Button onClick={() => setOpen(!open)} className="bg-white rounded-full hover:bg-white"><CirclePlus stroke="#000000" /></Button>
          <ToggleGroupItem value={Selector.Finance} className="data-[state=on]:bg-white bg-gray-800 data-[state=on]:text-black rounded-full">
            Financieiras
          </ToggleGroupItem>
          <ToggleGroupItem value={Selector.RealEstate} className="data-[state=on]:bg-white bg-gray-800 data-[state=on]:text-black rounded-full">
            Real Estate
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {transaction.isSuccess &&
          transaction.data.map(item => (

            <Card key={item.id} className={`bg-[#1D1F1E] rounded-lg hover:border-4 border-2 p-4 ${toggle === "actual" ? "border-[#48F7A1]" : "border-[#67AEFA]"}  h-[172px] text-gray-100`}>
              <CardTitle className="pl-2 pb-1 text-[#C9C9C9] flex justify-between pr-2 place-items-center">
                {item.type}
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-transparent text-white border-none"><EllipsisVerticalIcon /></DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1B1B1B] text-white border-none">
                    <DropdownMenuItem onClick={() => fillUpdateData(item)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteThis(item.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
              <CardContent className="p-0 w-[60%]">
                <h1 className="font-semibold pl-2 pt-1 text-[#C9C9C9]">Frequency: {item.frequency}</h1>
                <h1 className="font-semibold pl-2 pt-1 text-[#C9C9C9]"> {item.startDate} - {item.endDate}</h1>
              </CardContent>
              <CardFooter className="w-full flex justify-end pb-3">
                <span className={`flex place-items-center font-semibold text-xl ${item.type === "INCOME" ? "text-green-600" : "text-red-600"} `}>{item.type === "INCOME" ? <><ArrowUpIcon />{item.value}</> : <><ArrowDownIcon />{item.value}</>}</span>
              </CardFooter>
            </Card>
          ))
        }
        {!transaction.isSuccess && <p className="text-white">Ocurrio un Error</p>}
      </div>
      <div className="flex justify-between place-items-center p-4 ">
        <h1 className={`font-semibold text-2xl ${toggle === "actual" ? "text-[#48F7A1]" : "text-[#67AEFA]"}`}>Insurance</h1>
        <Button onClick={() => setOpenIn(!openIn)} className="bg-white rounded-full hover:bg-white"><CirclePlus stroke="#000000" /></Button>
      </div>

      <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2">
        {
          insurance.isSuccess &&
          insurance.data.map(item => (

            <Card key={item.id} className={`bg-[#1D1F1E] rounded-lg hover:border-4 border-2 p-4 ${toggle === "actual" ? "border-[#48F7A1]" : "border-[#67AEFA]"} h-[172px] text-gray-100`}>
              <CardTitle className="pl-2 pb-1 text-[#C9C9C9]">
                {item.name}
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-transparent text-white border-none"><EllipsisVerticalIcon /></DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1B1B1B] text-white border-none">
                    <DropdownMenuItem onClick={() => fillUpdateData(item)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => confirmDeletion(item.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
              <CardContent className="p-0 w-[60%]">
                <h1 className="font-semibold pl-2 pt-2 text-[#C9C9C9]">{item.startDate}-{item.endDate}</h1>
                <h1 className="font-semibold pl-2 pt-1 text-[#C9C9C9]">{item.type}</h1>
                <h1 className="font-semibold pl-2 pt-1 text-[#C9C9C9]">{item.premium}</h1>
              </CardContent>
              <CardFooter className="w-full flex justify-end pb-3">
                <span className="flex place-items-center font-semibold text-xl text-violet-900">{item.insuredValue}</span>
              </CardFooter>
            </Card>
          ))
        }
        {!insurance.isSuccess && <p className="text-white">Ocurrio un Error</p>}

      </div>
    </div>
  )
}