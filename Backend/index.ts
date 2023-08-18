import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";

import route from "./src/common/routeNames";
import adminRoute from "./src/routes/admin";
import {rootRouter} from "./src/routes/root";
import {authRouter} from "./src/routes/auth";
import {dashboardRouter} from "./src/routes/dashboard";
import {recruiterRoute} from "./src/routes/recruiter";

const app: Express = express();
const port = process.env.PORT || 3000;

// Body Parser Config
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Multer Setup
export const storage = multer.diskStorage({
  destination:(req: Request, file, cb) => {
    cb(null, "uploads"); // Destination folder
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueFilename = `${Date.now()}${ext}`;
    cb(null, uniqueFilename);
  }
})

// Middlewares
app.use(cors());
const upload = multer({storage})

app.get("/", (req: Request, res: Response) => {
  res.send(`
  <form method="POST" action="/uploads" encType="multipart/form-data">
        <input type="file" name="image" />
        <input type="submit" />
      </form>`)
})

// Routes
app.post("/uploads", upload.single("image"), (req: Request, res: Response) => {
  res.send("UPLOADED")
})
app.use(route.home.main, rootRouter);
app.use(route.home.main, authRouter);
app.use(route.home.main, dashboardRouter);
app.use(route.home.main, recruiterRoute);
app.use(route.home.main, adminRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
