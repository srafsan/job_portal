import express, { Express, Request, Response } from 'express';
import route from "./common/routeNames";
import {router as authRouter} from "./routes/auth";


const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use(route.home.main, authRouter)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});