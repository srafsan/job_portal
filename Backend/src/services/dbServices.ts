import { ITokenPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { IAuthProvider } from "../common/interfaces";
import { tokenChecker } from "./jwtServices";

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

export async function authProvider(
  token: string
): Promise<IAuthProvider | null> {
  const tokenPayload: ITokenPayload = tokenChecker(token);
  if (!tokenPayload) {
    throw Error("user not found");
  }
  const user = await prisma.user.findFirst({
    where: { sid: tokenPayload.sid },
  });
  return user;
}

export async function insertJWT(userInfo: any): Promise<Boolean> {
  const user = await prisma.blackListToken.create({ data: userInfo });

  return !!user;
}

export async function findJWT(token: string): Promise<any> {
  const isPresent = await prisma.blackListToken.findFirst({
    where: { token: token },
  });

  return isPresent;
}

export async function deleteJWT(token: string): Promise<Boolean> {
  const isDeleted = await findJWT(token);
  console.log(isDeleted);

  await prisma.blackListToken.delete({
    where: {
      tokenId: isDeleted?.tokenId,
    },
  });

  return !!isDeleted;
}

export async function deleteAllJWT(email: string): Promise<Boolean> {
  const isDeleted = await prisma.blackListToken.deleteMany({
    where: {
      userEmail: email,
    },
  });

  return !!isDeleted;
}
