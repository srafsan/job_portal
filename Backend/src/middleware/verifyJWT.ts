import { NextFunction, Request, Response } from "express";
import { authProvider } from "../services/dbServices";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig";
import { decode } from "punycode";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized access" });
  }

  try {
    const accessToken: string = authorization.split(" ")[1];
    // const user = await authProvider(accessToken);

    jwt.verify(accessToken, appConfig.accessTokenSecret, (error, decoded) => {
      if (error) {
        return res
          .status(403)
          .send({ error: true, message: "Unauthorized Access" });
      }

      (<any>req)["decoded"] = decoded;

      next();
    });

    // if (!user) {
    //   return res
    //     .status(401)
    //     .json({ error: true, message: "Unauthorized access" });
    // }

    // (<any>req)["user"] = user;

    // next();
  } catch (err) {
    console.error("Error verifying JWT:", err);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

export default verifyJWT;
