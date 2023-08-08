"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../Context/store";

type LoginInputs = {
  email: string;
  password: string;
};

const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 350,
  margin: "20px auto",
};

const LoginPage = () => {
  const router = useRouter();
  const { loginFunc } = useGlobalContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { email, password } = data;

    loginFunc(email, password);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                variant="standard"
                {...register("email", { required: true })}
                fullWidth
              />
              <TextField
                label="Password"
                variant="standard"
                type="password"
                {...register("password", { required: true })}
                fullWidth
              />
            </Stack>
            <FormControlLabel control={<Checkbox />} label="Remember Me" />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </form>
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
