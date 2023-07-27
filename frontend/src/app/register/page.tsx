"use client";
import React from "react";
import Link from "next/link";
import {
  Grid,
  Paper,
  Avatar,
  Box,
  TextField,
  Stack,
  FormControlLabel,
  Checkbox,
  Button,
  Typography
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const LoginPage = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "20px auto",
  };
  // throw new Error("Not today");
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar style={{backgroundColor: "#1bbd7e"}}>
              <AddCircleOutlineOutlinedIcon/>
            </Avatar>
            <h2 style={{margin: "10px"}}>Register Now</h2>
          </Box>
          <Box>
            <Stack spacing={1}>
              <TextField
                label="Name"
                placeholder="Enter Name"
                variant="standard"
                fullWidth
                required
              />
              <TextField
                label="Email"
                placeholder="Enter Email"
                variant="standard"
                type="email"
                fullWidth
                required
              />
              <TextField
                label="Password"
                placeholder="Enter Password"
                variant="standard"
                type="password"
                fullWidth
                required
              />
              <TextField
                label="Confirm Password"
                placeholder="Enter Password"
                variant="standard"
                type="password"
                fullWidth
                required
              />
            </Stack>
            <FormControlLabel control={<Checkbox/>} label={<Typography fontSize={14}>I accept the terms and conditions</Typography>}/>
            <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
          </Box>
          <Stack spacing={1} marginTop={1}>
            <Typography fontSize={14}>Already have an account?
              <Link href="/login" style={{color: "blue"}}> Login</Link>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};

export default LoginPage;
