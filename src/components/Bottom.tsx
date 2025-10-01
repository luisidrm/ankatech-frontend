import { ArrowDownIcon, ArrowUpIcon, CirclePlus, EllipsisVerticalIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useState } from "react";
import { Button } from "./ui/button";
import CreateTransactionForm from "./forms/CreateTransactionForm";
import UpdateTransactionForm from "./forms/UpdateTransactionForm"
import type { UpdateTransaction } from "@/schemas/transaction.schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

enum Selector {
  Finance = "finance",
  RealEstate = "real_estate"
}

export default function Bottom({ toggle }: Readonly<{ toggle: string }>) {
  const [selector, setSelector] = useState<Selector>(Selector.Finance)

  const [updateData, setUpdateData] = useState<UpdateTransaction>({})

  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  const fillUpdateData =(item:UpdateTransaction)=>{
    setUpdateData(item)
    setOpenUpdate(!openUpdate)
  }

  const items:UpdateTransaction[]=[{

    id:1,
    type: "INCOME",
    value:2000,
    frequency: "ONE_TIME",
    startDate:"23/03/2020",
    endDate:"23/03/2025"
  }

  ]

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
        {items.map(item=>(

          <Card key={item.id} className={`bg-[#1D1F1E] rounded-lg hover:border-4 border-2 p-4 ${toggle === "actual" ? "border-[#48F7A1]" : "border-[#67AEFA]"}  h-[172px] text-gray-100`}>
          <CardTitle className="pl-2 pb-1 text-[#C9C9C9] flex justify-between pr-2 place-items-center">
            {item.startDate} - {item.endDate}
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-transparent text-white border-none"><EllipsisVerticalIcon/></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1B1B1B] text-white border-none">
              <DropdownMenuItem onClick={()=>fillUpdateData(item)}>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </CardTitle>
          <CardContent className="p-0 w-[60%]">
            <h1 className="font-semibold pl-2 pt-1 text-[#C9C9C9]">Frequency: {item.frequency}</h1>
            <h1 className="font-semibold pl-2 pt-1 text-[#C9C9C9]">{item.type}</h1>
          </CardContent>
          <CardFooter className="w-full flex justify-end pb-3">
            <span className={`flex place-items-center font-semibold text-xl ${item.type==="INCOME"?"text-green-600":"text-red-600"} `}>{item.type==="INCOME"?<><ArrowUpIcon />{item.value}</>:<><ArrowDownIcon/>{item.value}</>}</span>
          </CardFooter>
        </Card>
          ))
        }
      </div>
      <div className="items-center p-4 ">
        <h1 className={`font-semibold text-2xl ${toggle === "actual" ? "text-[#48F7A1]" : "text-[#67AEFA]"}`}>Insurance</h1>
      </div>

      <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2">
        <Card className={`bg-[#1D1F1E] rounded-lg hover:border-4 border-2 p-4 ${toggle === "actual" ? "border-[#48F7A1]" : "border-[#67AEFA]"} h-[172px] text-gray-100`}>
          <CardTitle className="pl-2 pb-1 text-[#C9C9C9]">Herencia</CardTitle>
          <CardContent className="p-0 w-[60%]">
            <h1 className="font-semibold pl-2 pt-2 text-[#C9C9C9]">09/12/23-02/12/45</h1>
            <h1 className="font-semibold pl-2 pt-1 text-[#C9C9C9]">Frequency: Unique</h1>
            <h1 className="font-semibold pl-2 pt-1 text-[#C9C9C9]">Dependante</h1>
          </CardContent>
          <CardFooter className="w-full flex justify-end pb-3">
            <span className="flex place-items-center font-semibold text-xl text-red-600"><ArrowDownIcon />220,000</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}