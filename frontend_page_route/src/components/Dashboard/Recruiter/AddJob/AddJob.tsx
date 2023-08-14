/* eslint-disable @next/next/no-img-element */
import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {IInputs} from "@/utils/interfaces";
// import apiClient, {setClientAuthHeader} from "@/utils/apiClient";
import {useGlobalContext} from "@/context/myContext";

const AddJob = () => {
  const {userId} = useGlobalContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<IInputs>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files;
    console.log(imageFile)
    // setValue('image', imageFile);
  };

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    const {name, description, salary, location, experience, deadline} = data;
    console.log(data)
    const jobData = {
      name,
      description,
      salary: Number(salary),
      location,
      experience: Number(experience),
      deadline: JSON.stringify(deadline),
      post_by: userId,
    };

    // try {
    //   setClientAuthHeader();
    //   const res = await apiClient.post("/dashboard/recruiter/add_job", jobData);
    //
    //   if (res.status === 200) {
    //     alert("Job Added Successfully");
    //   } else {
    //     alert("Something went wrong");
    //   }
    // } catch (error) {
    //   console.log("Error posting the job data", error);
    // }
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
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Stack direction="column" spacing={2}>
              <Typography variant="h5">Add Job</Typography>
              <TextField
                label="Job Name"
                variant="outlined"
                {...register("name", {
                  required: {value: true, message: "Name is required"},
                })}
              />
              <TextField
                label="Job Description"
                variant="outlined"
                multiline
                rows={4}
                {...register("description", {required: true})}
              />
              <TextField
                label="Salary"
                variant="outlined"
                type="number"
                {...register("salary", {required: true})}
              />
              <TextField
                label="Location"
                variant="outlined"
                {...register("location", {required: true})}
              />
              <TextField
                label="Experience(In Years)"
                variant="outlined"
                type="number"
                {...register("experience", {required: true})}
              />
              <TextField
                label="Deadline"
                variant="outlined"
                type="date"
                {...register("deadline", {required: true})}
              />
              <TextField
                label="Upload Image"
                {...register('image', {required: true})} type="file" id="image"
                onChange={handleImageChange}
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

export default AddJob;