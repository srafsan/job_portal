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
    res.send(`
    <h1>Hello Admin</h1>
    <form action="${route.auth.logout}" method="POST">
      <button type="submit">Logout</button>
    </form>
    `);
  }
);

dashboardRouter.get(
  route.dashboard.recruiter,
  RecruiterMiddleware,
  (req: Request, res: Response) => {
    res.send(`
      <h1>Hello Recruiter</h1>
    `);
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
