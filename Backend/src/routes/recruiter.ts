import { NextFunction, Request, Response, Router } from "express";

import route from "../common/routeNames";
import {
  findAllJobs,
  insertJobToDB,
  updateJobOnDB,
} from "../services/dbServices";
import { RecruiterMiddleware } from "../middleware/common";
import multer from "multer";
import {storage} from "../../index";

const recruiterRoute: Router = Router();

const upload = multer({storage})

// Recruiter add job
recruiterRoute.post(
  route.recruiter.addJob,
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      salary,
      location,
      experience,
      deadline,
      post_by
    } = req.body;

    const newJob: any = {
      name,
      description,
      salary,
      location,
      experience,
      deadline: JSON.parse(deadline),
      post_by: BigInt(post_by),
      image: req.file?.filename
    };
    await insertJobToDB(newJob);
    return res.sendStatus(200);
  }
);

// recruiter manage jobs
recruiterRoute.get(
  route.recruiter.manageJobs,
  RecruiterMiddleware,
  async (req: Request, res: Response) => {
    const jobs = await findAllJobs();
    const updatedJobs = JSON.parse(
      JSON.stringify(
        jobs,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    );
    res.json(updatedJobs);
  }
);

// recruiter update job
recruiterRoute.patch(
  route.recruiter.updateJob,
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const {
      name,
      description,
      salary,
      location,
      experience,
      deadline,
      post_by,
    } = req.body;

    const updatedJob: any = {
      name,
      description,
      salary,
      location,
      experience,
      deadline: JSON.parse(deadline),
      post_by,
    };

    const response = await updateJobOnDB(id, updatedJob);

    if (response) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  }
);

export { recruiterRoute };
