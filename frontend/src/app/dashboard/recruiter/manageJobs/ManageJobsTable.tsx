"use client";
import { useState } from "react";
import {
  Button,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import UpdateJobModal from "./UpdateJobModal";
import { IJobs } from "@/utils/interfaces";

export default function ManageJobsTable({ jobs }: { jobs: IJobs[] }) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const handleOpen = (jobId: number) => {
    setSelectedJobId(jobId);
  };
  const handleClose = () => {
    setSelectedJobId(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Salary</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Experience</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Posted By</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs?.map((job: IJobs) => (
            <TableRow
              key={job.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {job.id}
              </TableCell>
              <TableCell scope="row">{job.name}</TableCell>
              <TableCell align="center">
                {job.description.slice(0, 20)}...
              </TableCell>
              <TableCell align="center">{job.salary}</TableCell>
              <TableCell align="center">{job.location}</TableCell>
              <TableCell align="center">{job.experience}</TableCell>
              <TableCell align="center">{job.deadline}</TableCell>
              <TableCell align="center">{job.post_by}</TableCell>
              <TableCell align="center">
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleOpen(job.id)}
                  >
                    Update
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedJobId !== null && (
        <UpdateJobModal
          open={true}
          handleClose={handleClose}
          job={jobs.find((job) => job.id === selectedJobId)}
        />
      )}
    </TableContainer>
  );
}
