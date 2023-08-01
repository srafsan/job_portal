import express, { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";

import route from "../common/routeNames";
import { insertJobToDB } from "../services/dbServices";

const recruiterRoute: Router = Router();

// recruiterRoute.get(route.recruiter.addJob, (req: Request, res: Response) => {
//   res.send("This is add page");
// });

// Recruiter Post
recruiterRoute.post(
  route.recruiter.addJob,
  async (req: Request, res: Response) => {
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
      deadline,
      post_by,
    };

    try {
      console.log("NEW JOB", newJob);

      console.log("Went to insert into the database");
      const isInserted = await insertJobToDB(newJob);
      console.log("Insert successfully done into the database", isInserted);
      return res.sendStatus(200);
    } catch (err) {
      return res.send(err).sendStatus(404);
    }
  }
);

export { recruiterRoute };
