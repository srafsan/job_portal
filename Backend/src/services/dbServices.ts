import { ITokenPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { IAuthProvider } from "../common/interfaces";
import { tokenChecker } from "./jwtServices";

const prisma = new PrismaClient();

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function insertUserToDB(userInfo: any): Promise<Boolean> {
  const user = await prisma.user.create({ data: userInfo });
  return !!user;
}

export async function insertJobToDB(jobInfo: any): Promise<boolean> {
  const job = await prisma.jobs.create({
    data: {
      ...jobInfo,
      image: {
        create: {
          data: jobInfo.image, // Store image data
          mimetype: 'image/jpeg' // Set appropriate mimetype
        }
      }
    }
  });
  return !!job;
}


export async function updateJobOnDB(
  jobId: number,
  data: any
): Promise<Boolean> {
  const job = await prisma.jobs.update({
    where: {
      id: jobId,
    },
    data,
  });

  return !!job;
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

export async function findAllJobs() {
  const jobs = await prisma.jobs.findMany();

  return jobs;
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

export async function insertBlackListJWT(token: string): Promise<Boolean> {
  const isBlackListed = await prisma.blackListToken.create({ data: { token } });

  return !!isBlackListed;
}

export async function findBlackListJWT(token: string): Promise<Boolean> {
  const isPresent = await prisma.blackListToken.findFirst({
    where: { token: token },
  });

  return !!isPresent;
}
