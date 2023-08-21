import React, {useState} from 'react';
import {Box, Tab, Grid, Paper, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import JobCard from "@/components/Shared/JobCard";
import {styled} from "@mui/material/styles";

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const jobGrid = {
  width: "80%",
  margin: "0 auto"
}

const DesiredCategory = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{my: "90px"}}>
      <Typography variant="h3" sx={{pb: "40px", fontWeight: "bold", textAlign: "center"}}>
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
          <TabPanel value="1">
            <Grid container spacing={6} style={jobGrid}>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={6} style={jobGrid}>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={6} style={jobGrid}>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
              <Grid item xs={12} md={4}>
                <JobCard/>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default DesiredCategory;