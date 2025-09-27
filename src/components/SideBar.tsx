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

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-black border-r border-gray-800 flex flex-col">
      <div className="flex items-center justify-center py-6">
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
          Anka
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-3 text-gray-300">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="clientes">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <Users size={18} />
                <span>Clientes</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="ml-6 flex flex-col gap-2 py-2">
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <LayoutDashboard size={16} /> Dashboard
                  </li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <LineChart size={16} /> Projeção
                  </li>
                  <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <History size={16} /> Histórico
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prospects">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <UserPlus size={18} />
                <span>Prospects</span>
              </AccordionTrigger>
              <AccordionContent className="ml-6 py-2">
                <p className="text-sm">Submenu here…</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="consolidacao">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <FileSpreadsheet size={18} />
                <span>Consolidação</span>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="crm">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <Briefcase size={18} />
                <span>CRM</span>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="captacao">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <Wallet size={18} />
                <span>Captação</span>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="financeiro">
              <AccordionTrigger className="flex items-center gap-2 hover:no-underline">
                <FileSpreadsheet size={18} />
                <span>Financeiro</span>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </nav>
      </ScrollArea>
    </aside>
  );
}
