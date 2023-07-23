import express, { Express } from "express";
import bodyParser from "body-parser";

import route from "./src/common/routeNames";
import { router as authRouter } from "./src/routes/auth";
import { rootRouter } from "./src/routes/root";
import { dashboardRouter } from "./src/routes/dashboard";

const app: Express = express();
const port = process.env.PORT || 3000;

// Body Parser Config
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.use(route.home.main, rootRouter);
app.use(route.home.main, authRouter);
app.use(route.home.main, dashboardRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
