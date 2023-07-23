import { Request, Response, Router } from "express";
import route from "../common/routeNames";
import {
  AdminMiddleware,
  ApplicantMiddleware,
  RecruiterMiddleware,
} from "../middleware/common";

const dashboardRouter: Router = Router();
dashboardRouter.get(
  route.dashboard.admin,
  AdminMiddleware,
  (req: Request, res: Response) => {
    res.send("This is for admin");
  }
);

dashboardRouter.get(
  route.dashboard.recruiter,
  RecruiterMiddleware,
  (req: Request, res: Response) => {
    res.send("This is for recruiter");
  }
);

dashboardRouter.get(
  route.dashboard.applicants,
  ApplicantMiddleware,
  (req: Request, res: Response) => {
    res.send("This is for applicant");
  }
);

export { dashboardRouter };
