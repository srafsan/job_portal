"use client";
import React from "react";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";

const LoginPage = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  // throw new Error("Not today");
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar style={{backgroundColor: "#1bbd7e"}}>
              <LockOutlinedIcon/>
            </Avatar>
            <h2 style={{marginTop: "10px"}}>Sign In</h2>
          </Box>
          <Box>
            <Stack spacing={2}>
              <TextField
                label="Username"
                placeholder="Enter Username"
                variant="standard"
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
            </Stack>
            <FormControlLabel control={<Checkbox/>} label="Remember Me"/>
            <Button type="submit" variant="contained" color="primary" fullWidth>Sign In</Button>
          </Box>
          <Stack spacing={1} marginTop={1}>
            <Typography fontSize={14} color="primary">
              <Link href="#" >Forget Password</Link>
            </Typography>
            <Typography fontSize={14}>Do you have an account?
              <Link href="/register" style={{color: "blue"}}> Register</Link>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};

export default LoginPage;
