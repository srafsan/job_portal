import express, { NextFunction, Request, Response, Router } from "express";
import cors from "cors";

import route from "../common/routeNames";
import { findAllJobs, insertJobToDB } from "../services/dbServices";

const recruiterRoute: Router = Router();

// recruiterRoute.get(route.recruiter.addJob, (req: Request, res: Response) => {
//   res.send("This is add page");
// });

// Recruiter add job
recruiterRoute.post(
  route.recruiter.addJob,
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      salary,
      location,
      experience,
      deadline,
      post_by,
    } = req.body;

    const newJob: any = {
      id: Date.now(),
      name,
      description,
      salary,
      location,
      experience,
      deadline: JSON.parse(deadline),
      post_by,
    };
    await insertJobToDB(newJob);
    return res.sendStatus(200);
  }
);

// recruiter manage jobs
recruiterRoute.get(
  route.recruiter.manageJobs,
  async (req: Request, res: Response) => {
    const jobs = await findAllJobs();
    const j = JSON.parse(
      JSON.stringify(
        jobs,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    );
    res.json(j);
  }
);

export { recruiterRoute };
