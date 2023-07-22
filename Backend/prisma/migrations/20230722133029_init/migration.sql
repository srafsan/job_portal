-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "applicant" BOOLEAN NOT NULL,
    "recruiter" BOOLEAN NOT NULL,
    "admin" BOOLEAN NOT NULL
);
