import express, {Request, Response, Router} from "express";
import route from "../common/routeNames";
import exp from "constants";
import {users} from "../models/db";

const router: Router = Router()

// Login get
router.get(route.auth.login, (req: Request, res: Response) => {

  res.send(
    `<h1>Login</h1>
        <form method="post" action=${route.auth.login}>
          <input type="email" name="email" placeholder="Email" required/>
          <input type="password" name="password" placeholder="password" required/>
          <input type="submit" />
        </form>
        <a href=${route.auth.signup}>Register</a>
        `
  );
});

// Login Post
router.post(route.auth.login, (req: Request, res: Response) => {
  const {email, password} = req.body;

  if(email && password) {
    const user = users.find((user)=>user.user_email === email && user.user_password)
    console.log(user, "logged in")
  }
  res.send("Successful")
})

export {router}