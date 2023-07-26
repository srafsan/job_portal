import React from "react";
import MuiButton from "@/components/muiComponents/MuiButton";
import { MuiSelect } from "@/components/muiComponents/MuiSelect";
import { MuiTextFeild } from "@/components/muiComponents/MuiTextFeild";
import { MuiTypography } from "@/components/muiComponents/MuiTypography";

const MuiPage = () => {
  // throw new Error("Not today");
  return (
    <>
      <MuiTypography />
      <MuiButton />
      <MuiTextFeild />
      <MuiSelect />
    </>
  );
};

export default MuiPage;
