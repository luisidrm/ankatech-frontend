"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Users,
  LayoutDashboard,
  LineChart,
  History,
  UserPlus,
  FileSpreadsheet,
  Briefcase,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-screen fixed w-64 bg-[#1B1B1B] border-r-2 rounded-r-xl border-[#1B1B1B] shadow-lg flex flex-col z-50">
      <div 
      className="flex items-center justify-center py-12 "
      >
        <div className="bg-[#1B1B1B] px-6 py-1">
          <Image
            src={"/image 8.png"}
            width={90}
            height={12}
            alt="logo"
            className="object-fit"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-3 text-gray-300">
          <Accordion type="single" collapsible className="w-40 text-sm place-self-center">
            <AccordionItem value="clientes" className="no-underline ">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <div className="flex items-center gap-2 hover:no-underline">
                  <Users size={18} />
                  <span>Clientes</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="ml-6 flex flex-col gap-2 py-2">
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <LayoutDashboard size={16} /> <Link href={"/"}>Dashboard</Link>
                  </li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <LineChart size={16} /> <Link href={"/allocations"}>Allocations</Link>
                  </li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <History size={16} /> <Link href={"/historic"}>Historic</Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prospects">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <div className="flex items-center gap-2 hover:no-underline">
                  <UserPlus size={18} />
                  <span>Prospects</span>
                </div>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="consolidacao">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <div className="flex items-center gap-2 hover:no-underline">
                  <FileSpreadsheet size={18} />
                  <span>Consolidação</span>
                </div>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="crm">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <div className="flex items-center gap-2 hover:no-underline">
                  <Briefcase size={18} />
                  <span>CRM</span>
                </div>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="captacao">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <div className="flex items-center gap-2 hover:no-underline">
                  <Wallet size={18} />
                  <span>Captação</span>
                </div>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="financeiro">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <div className="flex items-center gap-2 hover:no-underline">
                  <FileSpreadsheet size={18} />
                  <span>Financeiro</span>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </nav>
      </ScrollArea>
    </aside>
  );
}
