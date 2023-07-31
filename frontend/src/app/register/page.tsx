"use client";
import React from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  password: string;
  cPassword: string;
};

const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 300,
  margin: "20px auto",
};

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password, cPassword } = data;

    if (password !== cPassword) {
      alert("Password do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    console.log(userData);

    try {
      const url = "http://localhost:3001/signup";
      const res = await axios.post(url, userData);
      console.log(res.data);

      if (res.data == "OK") {
        router.push("/login");
      }
    } catch {
      console.log("Error registering the user data");
    }
  };

  // throw new Error("Not today");
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={{ margin: "10px" }}>Register Now</h2>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <TextField
                label="Name"
                variant="standard"
                {...register("name", { required: true })}
                fullWidth
              />
              <TextField
                label="Email"
                variant="standard"
                type="email"
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
              <TextField
                label="Confirm Password"
                variant="standard"
                type="password"
                {...register("cPassword", { required: true })}
                fullWidth
              />
            </Stack>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography fontSize={14}>
                  I accept the terms and conditions
                </Typography>
              }
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
          <Stack spacing={1} marginTop={1}>
            <Typography fontSize={14}>
              Already have an account?
              <Link href="/login" style={{ color: "blue" }}>
                {" "}
                Login
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};

export default RegisterPage;
