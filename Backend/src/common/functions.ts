import {IAuthProvider, ITokenPayload} from "./interfaces";
import jwt, {JwtPayload} from "jsonwebtoken";
import {appConfig} from "../config/appConfig";

export function tokenGenerate(payload: ITokenPayload, user: any): string {
  return jwt.sign(payload, appConfig.accessTokenSecret, {expiresIn: `${appConfig.tokenLifeTime}s`});
}

export function tokenChecker(token: string): JwtPayload | string | boolean {
  try {
    return jwt.verify(token, appConfig.accessTokenSecret)
  } catch (err) {
    return false
  }
}

export function authProvider(token: string): IAuthProvider {
  const tokenPayload = tokenChecker(token)
  const user = {
    id: 1,
    sid: '121hdkfhd',
    username: 'rafsan123',
    firstname: 'rafsan',
    lastname: 'hasan',
    role: 'admin',
    email: 'rafsan@gmail.com',
    phone: '',
    last_login: ''

  }
  return user
}

