import React from 'react';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

export default function UserDashboard() {

  return (
    <Box
      component="main"
      sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
    >
      <Toolbar/>
      <h1>This is User dashboard</h1>
    </Box>
  );
}
