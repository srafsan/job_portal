import React, {useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

const DesiredCategory = () => {
  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{my: "90px", textAlign: "center"}}>
      <Typography variant="h3" sx={{pb: "40px", fontWeight: "bold"}}>
        Choose Your Desired Category
      </Typography>
      <Box sx={{width: '100%', typography: 'body1'}}>
        <TabContext value={value}>
          <Box sx={{borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center"}}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1"/>
              <Tab label="Item Two" value="2"/>
              <Tab label="Item Three" value="3"/>
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default DesiredCategory;