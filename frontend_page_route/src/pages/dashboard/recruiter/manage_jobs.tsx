import React, {useState, useEffect} from 'react';
import ManageJobs from "@/components/Dashboard/Recruiter/ManageJobs/ManageJobs";

import apiClient, {setClientAuthHeader} from "@/utils/apiClient";
import {IJobs} from "@/utils/interfaces";
import Dashboard from "@/pages/dashboard";

async function fetchInstructorJobs(): Promise<IJobs[]> {
  setClientAuthHeader();
  const res = await apiClient.get("/dashboard/recruiter/manage_jobs");
  return res.data;
}

const ManageJobsLayout = () => {
  const [jobs, setJobs] = useState<IJobs[]>([]);

  useEffect(() => {
    async function fetchData() {
      const instructorsJobs = await fetchInstructorJobs();
      setJobs(instructorsJobs);
    }

    fetchData();
  }, []);


  return (
    <Dashboard>
      <ManageJobs jobs={jobs}/>
    </Dashboard>
  );
};

export default ManageJobsLayout;
