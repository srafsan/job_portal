"use client";
import "./globals.css";
import React from "react";
import {Inter} from "next/font/google";
import Navbar from "../components/muiComponents/Navbar";
import {usePathname} from "next/navigation";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  const currentRoute = usePathname();
  const shouldRenderNavbar = currentRoute !== '/dashboard';

  return (
    <html lang="en">
    <body className={inter.className}>
      {shouldRenderNavbar && <Navbar/>}
      {children}
    </body>
    </html>
  );
}
