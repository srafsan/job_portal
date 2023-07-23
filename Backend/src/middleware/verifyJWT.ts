import { NextFunction, Request, Response } from "express";
import { authProvider } from "../services/dbServices";

export const getToken = (req: Request) => {
  const authorization = <string>req.headers.authorization;
  return authorization.split(" ")[1];
};
const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  const user = await authProvider(token);

  if (!user) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  (<any>req)["user"] = user;
  next();
};

export default verifyJWT;
