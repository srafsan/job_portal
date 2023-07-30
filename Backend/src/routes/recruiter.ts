import express, { Request, Response, NextFunction, Router } from "express";

import route from "../common/routeNames";

const recruiterRoute: Router = Router();

// Recruiter Post
recruiterRoute.post(route.recruiter.addJob, (req: any, res: any) => {
  //   const data = req.body;
  console.log(req.body);
  console.log("Job added successfully");

  res.send("Add Job Page");
});

export { recruiterRoute };
