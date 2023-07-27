"use client";
import "./globals.css";
import React from "react";
import {Inter} from "next/font/google";
import Navbar from "../components/Navbar/Navbar";
import {usePathname} from "next/navigation";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  const regex = /^\/dashboard(\/.*)?$/;

  const currentRoute = usePathname();
  let showNav = regex.test(currentRoute)

  return (
    <html lang="en">
    <body className={inter.className}>
      {!showNav && <Navbar/>}
      {children}
    </body>
    </html>
  );
}
