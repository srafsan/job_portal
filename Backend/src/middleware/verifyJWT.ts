import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized access" });
  }

  try {
    const accessToken: string = authorization.split(" ")[1];

    jwt.verify(accessToken, appConfig.accessTokenSecret, (error, decoded) => {
      if (error) {
        return res
          .status(403)
          .send({ error: true, message: "Unauthorized Access" });
      }

      (<any>req)["decoded"] = decoded;

      next();
    });
  } catch (err) {
    console.error("Error verifying JWT:", err);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

export default verifyJWT;
