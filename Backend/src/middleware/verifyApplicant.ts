import { NextFunction, Request, Response } from "express";
import { Role } from "../common/constants";

const verifyApplicant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.decoded;
  if (role !== Role.applicant) {
    return res
      .status(406)
      .send({ error: true, message: "unauthorized access for applicant" });
  }
  next();
};

export default verifyApplicant;
