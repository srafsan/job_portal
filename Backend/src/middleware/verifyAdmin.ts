import { NextFunction, Request, Response } from "express";
import { Role } from "../common/constants";

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.decoded;

  if (role !== Role.admin) {
    return res
      .status(404)
      .send({ error: true, message: "unauthorized access for admin" });
  }
  next();
};

export default verifyAdmin;
