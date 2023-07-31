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
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import api from "@/utils/api";

const LoginPage = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      let username = data.get("username"),
        password = data.get("password");

      const user: string = await api.post("/login", { username, password });

      // Redirect to the appropriate dashboard route after successful login
      if (user) {
        window.location.href = `/dashboard/${user}`;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // throw new Error("Not today");
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={{ marginTop: "10px" }}>Sign In</h2>
          </Box>
          <Box component="form" onSubmit={handleLogin} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Username"
                name="username"
                placeholder="Enter Username"
                variant="standard"
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                placeholder="Enter Password"
                variant="standard"
                type="password"
                fullWidth
                required
              />
            </Stack>
            <FormControlLabel control={<Checkbox />} label="Remember Me" />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </Box>
          <Stack spacing={1} marginTop={1}>
            <Typography fontSize={14} color="primary">
              <Link href="#">Forget Password</Link>
            </Typography>
            <Typography fontSize={14}>
              Do you have an account?
              <Link href="/register" style={{ color: "blue" }}>
                {" "}
                Register
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};

export default LoginPage;
