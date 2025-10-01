"use client"

import "./globals.css";
import ReactQueryProvider from "@/components/TanStackWrapper";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "lucide-react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body
          className={"antialiased w-full h-auto bg-[#101010]"}
        >
          {open && <SideBar />}
          <Button
            className={`fixed left-8 top-2 ${open&& "left-52"} z-50 bg-transparent p-0 hover:bg-transparent  text-white rounded-lg`}
            onClick={() => setOpen(!open)}
          >
            <Sidebar/>
          </Button>
          {children}
        </body>
      </ReactQueryProvider>
    </html >
  );
}
