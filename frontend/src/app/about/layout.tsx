import React from "react";
import { Metadata } from "next";

import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "This is about page",
};

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default AboutLayout;
