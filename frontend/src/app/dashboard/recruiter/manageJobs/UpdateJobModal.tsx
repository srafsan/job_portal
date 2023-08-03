"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { IInputs, IUpdateModal } from "@/utils/interfaces";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateJobModal = ({ open, handleClose, job }: IUpdateModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>();

  const updateFunc: SubmitHandler<IInputs> = async (data) => {
    const { name, description, salary, location, experience, deadline } = data;

    console.log("Update Data", data);

    const updatedJobData = {
      name,
      description,
      salary: Number(salary),
      location,
      experience: Number(experience),
      deadline: JSON.stringify(deadline),
      post_by: 1,
    };

    try {
      const res = await axios.patch(
        `http://localhost:3001/dashboard/recruiter/update_job/${job?.id}`,
        updatedJobData
      );

      if (res.status === 200) {
        alert("Job updated successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log("Error while updating the job", error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update the <strong>{job?.name}</strong>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(updateFunc)}>
              <Stack direction="column" spacing={2}>
                <TextField
                  label="Job Name"
                  variant="outlined"
                  defaultValue={job?.name}
                  disabled={true}
                  {...register("name")}
                />

                <TextField
                  label="Job Description"
                  variant="outlined"
                  multiline
                  defaultValue={job?.description}
                  rows={4}
                  {...register("description", { required: true })}
                />
                <TextField
                  label="Salary"
                  variant="outlined"
                  type="number"
                  defaultValue={job?.salary}
                  {...register("salary", { required: true })}
                />
                <TextField
                  label="Location"
                  variant="outlined"
                  defaultValue={job?.location}
                  {...register("location", { required: true })}
                />
                <TextField
                  label="Experience(In Years)"
                  variant="outlined"
                  type="number"
                  defaultValue={job?.experience}
                  {...register("experience", { required: true })}
                />
                <TextField
                  label="Deadline"
                  variant="outlined"
                  type="date"
                  defaultValue={job?.deadline}
                  {...register("deadline", { required: true })}
                />
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </Stack>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateJobModal;
