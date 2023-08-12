"use client";
import React from "react";
import Link from "next/link";
import {useForm, SubmitHandler} from "react-hook-form";
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
import {useGlobalContext} from "@/context/myContext";

type SignupInputs = {
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

const Register = () => {
  const {registerFunc} = useGlobalContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = async (data: any) => {
    const {name, email, password, cPassword} = data;

    if (password !== cPassword) {
      alert("Password do not match");
      return;
    }

    await registerFunc(name, email, password);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <TextField
                label="Name"
                variant="standard"
                {...register("name", {required: true})}
                fullWidth
              />
              <TextField
                label="Email"
                variant="standard"
                type="email"
                {...register("email", {required: true})}
                fullWidth
              />
              <TextField
                label="Password"
                variant="standard"
                type="password"
                {...register("password", {required: true})}
                fullWidth
              />
              <TextField
                label="Confirm Password"
                variant="standard"
                type="password"
                {...register("cPassword", {required: true})}
                fullWidth
              />
            </Stack>
            <FormControlLabel
              control={<Checkbox/>}
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
              <Link href="/login" style={{color: "blue"}}>
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

export default Register;