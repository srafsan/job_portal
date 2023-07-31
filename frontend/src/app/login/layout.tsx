import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "This is Signin page",
};

export default function LoginLayout({
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
