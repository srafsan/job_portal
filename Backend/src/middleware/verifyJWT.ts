import {NextFunction, Request, Response} from "express";
import {tokenChecker} from "../common/functions";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({error: true, message: "unauthorized access"});
  }
  const token = authorization.split(" ")[1];
  const payload = tokenChecker(token)
  if (!payload) {
    return res
      .status(401)
      .send({error: true, message: "unauthorized access"});
  }
  (<any>req)['decoded'] = payload;
  next();
};

export default verifyJWT;