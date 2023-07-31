import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "This is signup page",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
