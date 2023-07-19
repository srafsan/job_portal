import dotenv from "dotenv";
dotenv.config()

interface IApp {
  sessionLifeTime: string | number,
  sessionName: string,
  sessionSecret: string,
  apiPath?: string,
  appDesc?: string,
  port?: string | number,
}

export const appConfig: IApp = {
  sessionLifeTime: process.env.SESSION_SECRET_LIFETIME || 3600,
  sessionName: process.env.SESSION_SECRET_NAME || "session_name",
  sessionSecret: process.env.SESSION_SECRET_PASSWORD || "secret",
  port: process.env.PORT || 3000,
  apiPath: "/api",

  appDesc: "This is a boilerplate of expressjs"
}