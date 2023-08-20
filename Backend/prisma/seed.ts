import {users, blackListToken, jobs} from "./jsonData/exportAllJson";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let user of users) {
    await prisma.user.create({
      data: user
    })
  }

  for (let job of jobs) {
    await prisma.jobs.create({
      data: job
    })
  }

  for (let blackTokens of blackListToken) {
    await prisma.blackListToken.create({
      data: blackTokens
    })
  }
}

main().catch(e => {
  console.log(e);
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})