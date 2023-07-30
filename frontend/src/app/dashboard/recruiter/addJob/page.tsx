/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import axios from "axios";

type Inputs = {
  name: string;
  description: string;
  image: string;
};

const RecruiterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, description, image } = data;
    const jobData = {
      id: uuid(),
      name,
      description,
      image,
    };

    console.log(jobData);

    try {
      await axios.post(
        "http://localhost:3001/dashboard/recruiter/addJob",
        jobData
      );

      console.log("Job data posted successfully");
    } catch (error) {
      console.log("Error posting the job data", error);
    }
  };

  return (
    <Paper>
      <Grid container spacing={2}>
        {/* Image Column */}
        <Grid item xs={12} sm={4}>
          <img
            width={13}
            src="https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8am9ifGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt="Product"
          />
        </Grid>

        {/* Form Column */}
        <Grid item xs={12} sm={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h5">Add Job</Typography>
              <TextField
                label="Job Name"
                variant="outlined"
                {...register("name", { required: true })}
              />
              <TextField
                label="Job Description"
                variant="outlined"
                multiline
                rows={4}
                {...register("description", { required: true })}
              />
              <TextField
                label="Job image"
                variant="outlined"
                {...register("image", { required: true })}
              />
              <Button type="submit" variant="contained" color="primary">
                Add Job
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecruiterPage;
