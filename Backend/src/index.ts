import express, { Express, Request, Response } from "express";
import route from "./common/routeNames";
import { router as authRouter } from "./routes/auth";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use()

app.get(route.home.main, (req: Request, res: Response) => {
  res.send(
    `<div>
            <h1>Welcome to Job Portal</h1>
            <a href=${route.auth.login}>Login</a>
        </div>`
  );
});

app.use(route.home.main, authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
