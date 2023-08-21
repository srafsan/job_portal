import React from 'react';
import {Box, Button, Typography} from "@mui/material";

const Details = () => {
  const BoxStyled = {
    width: "80%",
    margin: "0px auto"
  };

  return (
    <Box style={BoxStyled} sx={{py: "30px"}}>
      {/* Job Detail Header */}
      <Box sx={{border: "2px solid", borderRadius: "10px", height: "18vh", p: "25px", mb: "30px"}}>
        <Typography sx={{fontSize: "12px", marginBottom: "2px"}}>SoftBD Ltd</Typography>
        <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: "5px"}}>Senior Software Engineer</Typography>
        <Typography sx={{fontSize: "14px", color: "#2b5fe3"}}>
          <strong>Salary:</strong>
          100000
        </Typography>
        <Button variant="contained" size="small" sx={{marginTop: "24px"}}>Apply Now</Button>
      </Box>

      {/* Job Detail Body */}
      <Box sx={{height: "100vh", backgroundColor: "#b6eaea", py: "35px", px: "15px"}}>
        {/* Job Summary Section */}
        <Box>
          <Typography variant="h5">Job Summary</Typography>
          <Typography sx={{fontSize: "12px"}}>
            <strong>Application Deadline:</strong> 24/10/2023
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Details;