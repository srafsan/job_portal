"use client";
import React from "react";
import MuiButton from "@/components/muiComponents/MuiButton";
import { MuiSelect } from "@/components/muiComponents/MuiSelect";
import { MuiTextFeild } from "@/components/muiComponents/MuiTextFeild";
import { MuiTypography } from "@/components/muiComponents/MuiTypography";
import MuiRating from "@/components/muiComponents/MuiRating";

const MuiPage = () => {
  // throw new Error("Not today");
  return (
    <>
      <MuiTypography />
      <MuiButton />
      <MuiTextFeild />
      <MuiSelect />
      <MuiRating />
    </>
  );
};

export default MuiPage;
