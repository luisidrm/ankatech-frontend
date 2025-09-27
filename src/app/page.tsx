"use client"

import Bottom from "@/components/Bottom";
import Center from "@/components/Center";
import StatusToggle from "@/components/StatusToggle";
import TimelineChart from "@/components/Timeline";
import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

enum Toggle {
  Actual = "actual",
  Original = "original"
}

export default function Home() {
  const [toggle, setToggle] = useState<Toggle>(Toggle.Original)

  console.log(toggle);


  return (
    <div className="bg-[#101010] text-white h-auto">
      <Top />
      <div className="w-full h-[30px] bg-transparent flex justify-center place-items-center mb-2">
        <StatusToggle />
      </div>
      <Center toggle={toggle} />
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
          </ToggleGroupItem>
          <Button className="bg-[#1B1B1B] rounded-lg bg-transparent hover:bg-transparent border-2 border-[#F7B748]">Realizado</Button>
          <Button className="bg-[#1B1B1B] rounded-lg bg-transparent hover:bg-transparent ">+ Adicionar Simulacion</Button>
        </ToggleGroup>
      </div>
      <TimelineChart />
      <Bottom 
        toggle={toggle}
        />
    </div >
  );
}
