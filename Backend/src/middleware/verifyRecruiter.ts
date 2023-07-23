import { NextFunction, Request, Response } from "express";
import { Role } from "../common/constants";

const verifyRecruiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  if (user?.role !== Role.recruiter) {
    return res
      .status(405)
      .send({ error: true, message: "unauthorized access for recruiter" });
  }
  next();
};

export default verifyRecruiter;
