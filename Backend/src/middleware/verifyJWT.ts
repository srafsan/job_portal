import { NextFunction, Request, Response } from "express";
import { authProvider } from "../services/dbServices";

export const getToken = (req: Request) => {
  return req.cookies.refreshToken;
};

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized access" });
  }

  try {
    const user = await authProvider(accessToken);

    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Unauthorized access" });
    }

    (<any>req)["user"] = user;

    next();
  } catch (err) {
    console.error("Error verifying JWT:", err);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

export default verifyJWT;
