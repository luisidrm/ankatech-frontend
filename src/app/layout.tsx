"use client"

import type { Metadata } from "next";
import localFont from "next/font/local";
import Inter from "next/font/google";
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
      <ReactQueryProvider>s
        <body
          className={"antialiased w-full"}
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
