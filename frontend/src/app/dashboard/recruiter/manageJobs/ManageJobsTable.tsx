import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";

import { Jobs } from "./interface";

export default function ManageJobsTable({ jobs }: { jobs: Jobs[] }) {
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
          {jobs?.map((job: any) => (
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
                  <Button variant="contained" color="info">
                    Update
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
