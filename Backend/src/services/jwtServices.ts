import jwt, { ITokenPayload } from "jsonwebtoken";
import { appConfig } from "../config/appConfig";

export function tokenGenerate(payload: ITokenPayload, timer: string): string {
  return jwt.sign(payload, appConfig.accessTokenSecret, {
    expiresIn: timer,
  });
}

export function tokenChecker(token: string): ITokenPayload {
  try {
    const payload = <jwt.ITokenPayload>(
      jwt.verify(token, appConfig.accessTokenSecret)
    );
    return payload;
  } catch (err) {
    throw err;
  }
}
