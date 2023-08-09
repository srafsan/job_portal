"use client";
import React from "react";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from "../Context/store";

const drawerWidth = 240;

export default function DashboardPage() {
  const { userRole } = useGlobalContext();

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      <Typography paragraph>Hello {userRole}</Typography>
    </Box>
  );
}
