import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();
  const newUser = {
    name: "sakib",
    email: "sakib@gmail.com",
    password: "secret",
  };
  const user = await prisma.user.create({ data: newUser });
  // const users = await prisma.user.findMany();
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
