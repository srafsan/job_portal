import { NextFunction, Request, Response, Router } from "express";
import jwt, { ITokenPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import route from "../common/routeNames";
import {
  deleteAllJWT,
  deleteJWT,
  findIntoDB,
  insertDB,
  insertJWT,
} from "../services/dbServices";
import { appConfig } from "../config/appConfig";
import verifyJWT, { getToken } from "../middleware/verifyJWT";
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

// Login get
authRouter.get(route.auth.login, (req: Request, res: Response) => {
  res.send(`<h1>Login</h1>
        <form method="post" action=${route.auth.login}>
          <input type="email" name="email" placeholder="Email" required/>
          <input type="password" name="password" placeholder="password" required/>
          <input type="submit" />
        </form>
        <a href=${route.auth.signup}>Register</a>
        `);
});

// Login Post
authRouter.post(route.auth.login, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findIntoDB(email, password);

  if (!user) {
    return res.redirect(route.auth.login);
  } else {
    const payloadToken: ITokenPayload = {
      sid: user.sid,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = tokenGenerate(payloadToken, accessTokenTimer);
    const refreshToken = tokenGenerate(payloadToken, refreshTokenTimer);

    const userInfo = {
      userEmail: user.email,
      token: accessToken,
    };

    await insertJWT(userInfo);

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    if (user.role == 1) return res.redirect(route.dashboard.admin);
    else if (user.role == 2) return res.redirect(route.dashboard.recruiter);
    else if (user.role == 3) return res.redirect(route.dashboard.applicants);
  }
});

// Registration Get
authRouter.get(route.auth.signup, (req: Request, res: Response) => {
  res.send(`<h1>Signup</h1>
      <form method="post" action=${route.auth.signup}>
        <input name="name" placeholder="name" required/>
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" />
      </form>
      <a href=${route.auth.login}>Login</a>`);
});

// Registration Post
authRouter.post(route.auth.signup, async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const isExist = await findIntoDB(email, password);
    const exits = !!isExist;

    if (!exits) {
      const newUser: any = {
        sid: uuidv4(),
        name: name,
        email: email,
        password: password,
        role: Role.applicant,
      };

      await insertDB(newUser);

      return res.redirect(route.auth.login);
    } else {
      res.send("User Exists");
    }
  }
});

// Logout
authRouter.delete(
  route.auth.logout,
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    console.log(token);

    await deleteJWT(token);

    res.sendStatus(200);
  }
);

authRouter.delete(
  route.auth.logoutAll,
  verifyJWT,
  async (req: Request, res: Response) => {
    await deleteAllJWT(req.user.email);

    res.sendStatus(200);
  }
);

// get user
authRouter.get("/get-user", [verifyJWT], (req: Request, res: Response) => {
  const username = getUserName(req.user);
  const full = getUserNameWithEmail(username, req.user.email);
  res.json(full);
});

export { authRouter };
