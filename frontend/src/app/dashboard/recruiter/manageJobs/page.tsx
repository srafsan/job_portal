"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import ManageJobsTable from "./ManageJobsTable";
import { IJobs } from "@/utils/interfaces";

const ManageJobs = () => {
  const [jobs, setJobs] = useState<IJobs[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get(
          "http://localhost:3001/dashboard/recruiter/manage_jobs"
        );

        setJobs(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job List</h1>
      <ManageJobsTable jobs={jobs} />
    </div>
  );
};

export default ManageJobs;
