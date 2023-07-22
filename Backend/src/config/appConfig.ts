import dotenv from "dotenv";

dotenv.config()

interface IApp {
  tokenLifeTime: string | number,
  accessTokenSecret: string,
  refreshTokenSecret: string,
  apiPath?: string,
  appDesc?: string,
  port?: string | number,
}

export const appConfig: IApp = {
  tokenLifeTime: process.env.SECRET_LIFETIME || 3600,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "secret",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "secret",
  port: process.env.PORT || 3000,
  apiPath: "/api",
  appDesc: "This is a boilerplate of expressjs"
}