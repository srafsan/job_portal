import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import route from "./src/common/routeNames";
import adminRoute from "./src/routes/admin";
import { rootRouter } from "./src/routes/root";
import { authRouter } from "./src/routes/auth";
import { dashboardRouter } from "./src/routes/dashboard";
import { recruiterRoute } from "./src/routes/recruiter";
import { findAllJobs } from "./src/services/dbServices";
import { DecodeJwtPayload } from "./src/common/interfaces";
import { AdminMiddleware } from "./src/middleware/common";

const app: Express = express();
const port = process.env.PORT || 3000;

// Body Parser Config
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use(cookieParser());
app.use(cors());

// Routes
app.use(route.home.main, rootRouter);
app.use(route.home.main, authRouter);
app.use(route.home.main, dashboardRouter);
app.use(route.home.main, recruiterRoute);
app.use(route.home.main, adminRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
