import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { IAuthProvider, ITokenPayload } from "./interfaces";
import { appConfig } from "../config/appConfig";

const prisma = new PrismaClient();

export async function insertDB(userInfo: any): Promise<Boolean> {
  const user = await prisma.user.create({ data: userInfo });

  return !!user;
}

export async function findIntoDB(
  userEmail: string,
  userPassword: string
): Promise<any> {
  const isPresent = await prisma.user.findFirst({
    where: { email: userEmail, password: userPassword },
  });

  return isPresent;
}

export function tokenGenerate(payload: ITokenPayload, timer: string): string {
  return jwt.sign(payload, appConfig.accessTokenSecret, {
    expiresIn: timer,
  });
}

export function tokenChecker(token: string): JwtPayload | string | boolean {
  try {
    return jwt.verify(token, appConfig.accessTokenSecret);
  } catch (err) {
    return false;
  }
}

export function authProvider(token: string): IAuthProvider {
  const tokenPayload = tokenChecker(token);
  const user = {
    id: 1,
    sid: "121hdkfhd",
    username: "rafsan123",
    firstname: "rafsan",
    lastname: "hasan",
    role: "admin",
    email: "rafsan@gmail.com",
    phone: "",
    last_login: "",
  };
  return user;
}
