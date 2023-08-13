import React, {useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";

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
      <Box sx={{width: '100%'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Item One"/>
          <Tab value="two" label="Item Two"/>
          <Tab value="three" label="Item Three"/>
        </Tabs>
      </Box>
    </Box>
  );
};

export default DesiredCategory;