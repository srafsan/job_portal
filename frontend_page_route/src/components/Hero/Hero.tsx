import React from 'react';
import {Grid} from "@mui/material";
import Image from "next/image";

const Hero = () => {

  return (
    <>
      <Grid container spacing={2} style={{marginTop: "10px"}}>
        <Grid item xs={3}>
          <img
            src="https://reactjob.codebasket.xyz/assets/img/banner/banner-21.png"
            width={450}
            // height={300}
            alt="This is the Hero banner"
          />
        </Grid>
        <Grid item xs={9}>
          <h1>Our Excellent Find Job Best Solution</h1>
        </Grid>
      </Grid>
    </>
  );
};

export default Hero;