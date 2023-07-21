import { Request, Response, Router } from "express";
import route from "../common/routeNames";
import { users } from "../models/db";
import dotenv from "dotenv";
import { tokenGenerate } from "../common/functions";
import verifyJWT from "../middleware/verifyJWT";
import { ITokenPayload } from "../common/interfaces";

dotenv.config();
const fsPromises = require("fs").promises;

const router: Router = Router();

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
router.post(route.auth.login, (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) =>
      user.user_email.toLowerCase() === email.toLowerCase() &&
      user.user_password === password
  );

  if (!user) {
    return res.redirect(route.auth.login);
  } else {
    const payloadToken: ITokenPayload = {
      name: user.user_name,
      email: user.user_email,
      applicant: user.applicant,
      recruiter: user.recruiter,
      admin: user.admin,
    };

    const accessToken = tokenGenerate(payloadToken);
    console.log(accessToken);

    res.json({ accessToken: accessToken });
    // return res.redirect(route.home.dashboard);
  }
});

// Registration Get
router.get(route.auth.signup, (req: Request, res: Response) => {
  res.send(`<h1>Registration</h1>
      <form method="post" action=${route.auth.signup}>
        <input name="name" placeholder="name" required/>
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" placeholder="password" required/>
        <input type="submit" />
      </form>
      <a href=${route.auth.login}>Login</a>`);
});

// Registration Post
router.post(route.auth.signup, (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const exists = users.some((user) => user.user_email === email);

    if (!exists) {
      const newUser: any = {
        user_id: users.length + 1,
        user_name: name,
        user_email: email,
        user_password: password,
        role: "normal",
      };

      users.push(newUser);

      return res.redirect(route.auth.login);
    }
  }
});

export { router };
