import route from "../common/routeNames";
import {Request, Response, Router} from "express";

const rootRouter: Router = Router()
rootRouter.get(route.home.main, (req: Request, res: Response) => {
  res.send(
    `<div>
            <h1>Welcome to Job Portal</h1>
            <a href=${route.auth.login}>Login</a>
            <a href=${route.auth.signup}>Sign Up</a>
        </div>`
  );
});

export {rootRouter}