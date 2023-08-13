import React from 'react';
import {Box, Button, InputBase, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Hero = () => {
  const text: string = "Find you desired Job";
  const imageUrl: string = "https://images.unsplash.com/photo-1503846421671-def6281a166c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Semi-transparent overlay */}
        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}/>

        <Typography variant="h2" sx={{fontWeight: "bold", filter: "brightness(1)"}}>{text}</Typography>

        <Box sx={{mt: 10, display: "flex", alignItems: "center"}}>
          <InputBase
            placeholder="Search..."
            sx={{
              width: "1000px",
              backgroundColor: "white",
              padding: "18.9px",
              borderRadius: "4px 0 0 4px",
              flexGrow: 1
            }}/>
          <Button variant="contained" color="primary" sx={{
            borderRadius: "0 4px 4px 0",
            minWidth: "80px",
            height: "70px"
          }}>
            <SearchIcon/>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Hero;