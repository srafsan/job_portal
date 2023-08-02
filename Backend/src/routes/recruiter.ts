import express, { NextFunction, Request, Response, Router } from "express";
import cors from "cors";

import route from "../common/routeNames";
import { insertJobToDB } from "../services/dbServices";

const recruiterRoute: Router = Router();

// recruiterRoute.get(route.recruiter.addJob, (req: Request, res: Response) => {
//   res.send("This is add page");
// });

const corsOption = {
  origin: true,
  methods: "GET, PUT",
  credential: true,
  maxAge: 10,
};

// Recruiter Post
recruiterRoute.options(route.recruiter.addJob, cors(corsOption));
recruiterRoute.post(
  route.recruiter.addJob,
  cors(corsOption),
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

export { recruiterRoute };
