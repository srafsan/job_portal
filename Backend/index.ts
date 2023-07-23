import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import route from "./src/common/routeNames";
import { router as authRouter } from "./src/routes/auth";
import { rootRouter } from "./src/routes/root";
import { users } from "./src/models/db";
import verifyJWT from "./src/middleware/verifyJWT";

const app: Express = express();
const port = process.env.PORT || 3000;

// Body Parser Config
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get("/users", verifyJWT, (req: Request, res: Response) => {
  res.send(users);
});
app.use(route.home.main, rootRouter);
app.use(route.home.main, authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
