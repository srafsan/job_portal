import express, {Request, Response, Router} from "express";
import route from "../common/routeNames";
import exp from "constants";

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

export {router}