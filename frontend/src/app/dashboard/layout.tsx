import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "About",
  description: "This is about page",
};

const dashboardLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default dashboardLayout;
