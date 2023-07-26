import React from "react";
import { Typography } from "@mui/material";

export const MuiTypography = () => {
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Heading h1
      </Typography>
      <Typography variant="h2">Heading h2</Typography>
      <Typography variant="h3">Heading h3</Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        Heading h4
      </Typography>
      <Typography variant="h5">Heading h5</Typography>
      <Typography variant="h6">Heading h6</Typography>

      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>

      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolor
        inventore quas repellendus aut odit commodi praesentium, esse in quasi
        modi sint! Laboriosam earum dolores quasi, odit debitis repudiandae at.
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolor
        inventore quas repellendus aut odit commodi praesentium, esse in quasi
        modi sint! Laboriosam earum dolores quasi, odit debitis repudiandae at.
      </Typography>
    </div>
  );
};
