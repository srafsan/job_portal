import React from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Material UI",
  description: "This is Material UI page",
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
