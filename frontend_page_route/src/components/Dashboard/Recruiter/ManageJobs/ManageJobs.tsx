import React, {useEffect, useState} from "react";
import ManageJobsTable from "@/components/Dashboard/Recruiter/ManageJobs/ManageJobsTable";

const ManageJobs = ({jobs}: any) => {

  return (
    <div>
      <h1>Job List</h1>
      <ManageJobsTable jobs={jobs}/>
    </div>
  );
};

export default ManageJobs;