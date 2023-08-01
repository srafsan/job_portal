/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import axios from "axios";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DatePickerFormField from "@/components/DatePickerFormField/DatePickerFormField";

type Inputs = {
  name: string;
  description: string;
  salary: string;
  location: string;
  experience: number;
  deadline: Date;
};

const RecruiterPage = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, description, salary, location, experience, deadline } = data;

    const jobData = {
      name,
      description,
      salary: Number(salary),
      location,
      experience: Number(experience),
      deadline: JSON.stringify(deadline),
      post_by: 1,
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/dashboard/recruiter/addJob",
        jobData
      );

      console.log("Add Job Res", res);

      if (res.status === 200) {
        alert("Job Added Successfully");
      } else {
        alert("Something went wrong");
      }
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
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
              />
              <TextField
                label="Job Description"
                variant="outlined"
                multiline
                rows={4}
                {...register("description", { required: true })}
              />
              <TextField
                label="Salary"
                variant="outlined"
                type="number"
                {...register("salary", { required: true })}
              />
              <TextField
                label="Location"
                variant="outlined"
                {...register("location", { required: true })}
              />
              <TextField
                label="Experience(In Years)"
                variant="outlined"
                type="number"
                {...register("experience", { required: true })}
              />
              <Controller
                name="deadline"
                control={control}
                rules={{ required: "Deadline is required" }}
                render={({ field, fieldState }) => (
                  <DatePickerFormField
                    label="Deadline"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    error={fieldState.error}
                  />
                )}
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
