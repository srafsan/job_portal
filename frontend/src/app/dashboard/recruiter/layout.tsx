import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Recruiter",
  description: "This is about page",
};

const RecruiterDashboardLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default RecruiterDashboardLayout;
