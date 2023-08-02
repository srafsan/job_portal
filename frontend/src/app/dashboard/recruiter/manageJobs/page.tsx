"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageJobs = () => {
  const [jobs, setJobs] = useState();

  useEffect(() => {
    async function fetchJobs() {
      const data = axios.get("https://localhost:3001/");
    }

    fetchJobs();
  }, []);

  return <div>This is Managing Jobs</div>;
};

export default ManageJobs;
