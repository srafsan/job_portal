import express, { Request, Response, NextFunction, Router } from "express";
import { v4 as uuidv4 } from "uuid";

import route from "../common/routeNames";
import { insertJobToDB } from "../services/dbServices";
import { statusMessages } from "../common/constants";

const recruiterRoute: Router = Router();

// Recruiter Post
recruiterRoute.post(route.recruiter.addJob, async (req: any, res: any) => {
  const { name, description, image } = req.body;

  const newJob: any = {
    jobId: uuidv4(),
    name,
    description,
    image,
  };

  try {
    await insertJobToDB(newJob);
    res.sendStatus(200);
  } catch {
    res.send(statusMessages[404]).sendStatus(404);
  }
});

export { recruiterRoute };
