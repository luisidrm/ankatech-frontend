import { ArrowDownIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useState } from "react";

enum Selector{
  Finance = "finance",
  RealEstate = "real_estate"
}

export default function Bottom({toggle}: Readonly<{toggle: string}>) {
  const [selector, setSelector] = useState<Selector>(Selector.Finance)

  return (
    <div className="w-full h-auto bg-transparent mb-2">
      <div className="flex justify-between items-center p-4 ">
        <h1 className={`font-semibold text-2xl ${toggle==="actual"?"text-[#48F7A1]":"text-[#67AEFA]"}`}>Movements</h1>
        <ToggleGroup 
        defaultValue={selector}
        type="single" value={selector} className="bg-transparent"
        aria-label="Text alignment"
        onValueChange={(val: Selector) => {
            if (val) setSelector(val);
          }}
        >
          <ToggleGroupItem value={Selector.Finance} className="data-[state=on]:bg-white bg-gray-800 data-[state=on]:text-black rounded-full">
            Financieiras
          </ToggleGroupItem>
          <ToggleGroupItem value={Selector.RealEstate} className="data-[state=on]:bg-white bg-gray-800 data-[state=on]:text-black rounded-full">
            Real Estate
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={`bg-[#1D1F1E] rounded-lg hover:border-4 border-2 p-4 ${toggle==="actual"?"border-[#48F7A1]":"border-[#67AEFA]"}  h-[172px] text-gray-100`}>
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
      <div className="items-center p-4 ">
        <h1 className={`font-semibold text-2xl ${toggle==="actual"?"text-[#48F7A1]":"text-[#67AEFA]"}`}>Insurance</h1>
      </div>

      <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2">
        <Card className={`bg-[#1D1F1E] rounded-lg hover:border-4 border-2 p-4 ${toggle==="actual"?"border-[#48F7A1]":"border-[#67AEFA]"} h-[172px] text-gray-100`}>
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