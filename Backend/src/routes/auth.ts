import { Request, Response, Router } from "express";
import jwt, { ITokenPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import route from "../common/routeNames";
import {
  findBlackListJWT,
  findIntoDB,
  insertBlackListJWT,
  insertUserToDB,
} from "../services/dbServices";
import { appConfig } from "../config/appConfig";
import verifyJWT from "../middleware/verifyJWT";
import { getUserName, getUserNameWithEmail } from "../services/authService";
import { tokenGenerate } from "../services/jwtServices";
import {
  Role,
  accessTokenTimer,
  refreshTokenTimer,
  refreshTokens,
} from "../common/constants";

dotenv.config();

const authRouter: Router = Router();

// Generate new access token
authRouter.post("/token", (req: Request, res: Response) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    appConfig.refreshTokenSecret,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      const newPayloadToken = {
        sid: user.sid,
        name: user.name,
        role: user.role,
      };
      const accessToken = tokenGenerate(newPayloadToken, accessTokenTimer);

      res.json({ accessToken: accessToken });
    }
  );
});

// Login Post
authRouter.post(route.auth.login, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findIntoDB(email, password);

  if (!user) {
    return res.sendStatus(404);
  } else {
    const payloadToken: ITokenPayload = {
      sid: user.sid,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = tokenGenerate(payloadToken, accessTokenTimer);
    const refreshToken = tokenGenerate(payloadToken, refreshTokenTimer);
    const isBlackListed = await findBlackListJWT(refreshToken);

    if (isBlackListed) {
      return res.status(404).send("Blacklisted");
    }

    if (user.role == 1)
      return res.send({
        userId: user.id.toString(),
        status: 200,
        role: "admin",
        token: { accessToken, refreshToken },
        options: [
          {
            id: 1,
            label: "Manage Users",
            route: "/dashboard/admin/manageUsers",
          },
          {
            id: 2,
            label: "Manage Jobs",
            route: "/dashboard/admin/manageJobs",
          },
          {
            id: 3,
            label: "Manage Payments",
            route: "/dashboard/admin/managePayments",
          },
        ],
      });
    else if (user.role == 2)
      return res.send({
        userId: user.id.toString(),
        status: 200,
        role: "recruiter",
        token: { accessToken, refreshToken },
        options: [
          { id: 1, label: "Add Job", route: "/dashboard/recruiter/addJob" },
          {
            id: 2,
            label: "Manage Jobs",
            route: "/dashboard/recruiter/manageJobs",
          },
          {
            id: 3,
            label: "View Applicants",
            route: "/dashboard/recruiter/viewApplicants",
          },
        ],
      });
    else if (user.role == 3)
      return res.send({
        userId: user.id.toString(),
        status: 200,
        role: "applicant",
        token: { accessToken, refreshToken },
        options: [
          { id: 1, label: "View Profile", route: "/dashboard/user/profile" },
          { id: 2, label: "My Cart", route: "/dashboard/user/cart" },
          {
            id: 3,
            label: "Applied Jobs",
            route: "/dashboard/user/appliedJobs",
          },
        ],
      });
    else return res.sendStatus(404);
  }
});

// Registration Post
authRouter.post(route.auth.signup, async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const isExist = await findIntoDB(email, password);
    const exits = !!isExist;

    if (!exits) {
      const newUser: any = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        role: Role.applicant,
        sid: uuidv4(),
      };

      const response = await insertUserToDB(newUser);

      if (response) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(401);
      }
    } else {
      return res.send("User Exists");
    }
  } else {
    return res.send("no data found").status(301);
  }
});

// Logout
authRouter.post(
  route.auth.logout,
  verifyJWT,
  async (req: Request, res: Response) => {
    const token = req.body.refreshToken;
    console.log("Logout", token);

    await insertBlackListJWT(token);

    res.sendStatus(200);
  }
);

export { authRouter };
