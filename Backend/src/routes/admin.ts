import { Router, Request, Response } from "express";
import { AdminMiddleware } from "../middleware/common";
import { findAllJobs, getAllUsers } from "../services/dbServices";
import route from "../common/routeNames";

const adminRoute: Router = Router();

// Manage Users
adminRoute.get(
  route.admin.manageUsers,
  AdminMiddleware,
  async (req: Request, res: Response) => {
    const users = await getAllUsers();
    const updatedUsers = JSON.parse(
      JSON.stringify(
        users,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    );
    res.send(updatedUsers);
  }
);

adminRoute.get(
  route.admin.manageJobs,
  AdminMiddleware,
  async (req: Request, res: Response) => {
    const jobs = await findAllJobs();
    const updatedJobs = JSON.parse(
      JSON.stringify(jobs, (key, value) =>
        typeof value == "bigint" ? value.toString() : value
      )
    );

    res.send(updatedJobs);
  }
);

export default adminRoute;
