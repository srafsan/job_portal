import { Request, Response, Router } from "express";
import jwt, { ITokenPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import route from "../common/routeNames";
import { findIntoDB, insertUserToDB, insertJWT } from "../services/dbServices";
import { appConfig } from "../config/appConfig";
import verifyJWT from "../middleware/verifyJWT";
import { getUserName, getUserNameWithEmail } from "../services/authService";
import { tokenGenerate } from "../services/jwtServices";
import {
  Role,
  accessTokenTimer,
  refreshTokenTimer,
  refreshTokens,
  statusMessages,
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

authRouter.get(route.auth.login, (req: Request, res: Response) => {
  res.send(
    `<h1>Login</h1>
        <form method="post" action=${route.auth.login}>
          <input type="text" name="username" placeholder="Username" required/>
          <input type="password" name="password" placeholder="password" required/>
          <input type="submit" />
        </form>
        <a href=${route.auth.signup}>Register</a>
        `
  );
});

// Login Post
authRouter.post(route.auth.login, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findIntoDB(email, password);

  if (!user) {
    console.log("Users does not exist");

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

    const userInfo = {
      token: refreshToken,
    };

    await insertJWT(userInfo);

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    if (user.role == 1)
      return res.send({
        status: 200,
        role: "admin",
        token: { accessToken, refreshToken },
      });
    else if (user.role == 2)
      return res.send({
        status: 200,
        role: "recruiter",
        token: { accessToken, refreshToken },
      });
    else if (user.role == 3)
      return res.send({
        status: 200,
        role: "applicant",
        token: { accessToken, refreshToken },
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

      await insertUserToDB(newUser);

      return res.sendStatus(200);
    } else {
      return res.send("User Exists");
    }
  } else {
    return res.send("no data found").status(301);
  }
});

// Logout
// authRouter.delete(
//   route.auth.logout,
//   verifyJWT,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const token = getToken(req);
//     console.log(token);

//     await deleteJWT(token);

//     res.sendStatus(200);
//   }
// );

// authRouter.delete(
//   route.auth.logoutAll,
//   verifyJWT,
//   async (req: Request, res: Response) => {
//     await deleteAllJWT(req.user.email);

//     res.sendStatus(200);
//   }
// );

// get user
authRouter.get("/get-user", [verifyJWT], (req: Request, res: Response) => {
  const username = getUserName(req.user);
  const full = getUserNameWithEmail(username, req.user.email);
  res.json(full);
});

export { authRouter };
