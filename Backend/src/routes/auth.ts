import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import route from "../common/routeNames";
import { users } from "../models/db";
import { findIntoDB, insertDB, tokenGenerate } from "../common/functions";
import { ITokenPayload } from "../common/interfaces";
import { appConfig } from "../config/appConfig";

dotenv.config();

const router: Router = Router();

const accessTokenTimer = "600s";
const refreshTokenTimer = "1h";
let refreshTokens: string[] = [];

// Generate new access token
router.post("/token", (req: Request, res: Response) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    appConfig.refreshTokenSecret,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      const newPayloadToken = {
        name: user.name,
        recruiter: user.recruiter,
        admin: user.admin,
        applicant: user.applicant,
      };
      const accessToken = tokenGenerate(newPayloadToken, accessTokenTimer);

      res.json({ accessToken: accessToken });
    }
  );
});

// Dashboard
router.get(route.home.dashboard, (req: Request, res: Response) => {
  res.send("Welcome User");
});

// Login get
router.get(route.auth.login, (req: Request, res: Response) => {
  // const authUser: IAuthProvider =
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
router.post(route.auth.login, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findIntoDB(email, password);

  if (!user) {
    return res.redirect(route.auth.login);
  } else {
    const payloadToken: ITokenPayload = {
      name: user.name,
      email: user.email,
      applicant: user.applicant,
      recruiter: user.recruiter,
      admin: user.admin,
    };

    const accessToken = tokenGenerate(payloadToken, accessTokenTimer);
    const refreshToken = tokenGenerate(payloadToken, refreshTokenTimer);
    refreshTokens.push(refreshToken);

    res.json({ accessToken: accessToken, refreshToken });
    // return res.redirect(route.home.dashboard);
  }
});

// Registration Get
router.get(route.auth.signup, (req: Request, res: Response) => {
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
router.post(route.auth.signup, async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const isExist = await findIntoDB(email, password);
    const exits = !!isExist;

    if (!exits) {
      const newUser: any = {
        name: name,
        email: email,
        password: password,
        applicant: true,
        recruiter: false,
        admin: false,
      };

      await insertDB(newUser);

      return res.redirect(route.auth.login);
    } else {
      res.send("User Exists");
    }
  }
});

// Logout
router.delete(route.auth.logout, (req: Request, res: Response) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

export { router };
