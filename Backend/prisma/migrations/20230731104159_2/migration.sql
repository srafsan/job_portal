/*
  Warnings:

  - The primary key for the `Jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_by` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "deadline" DATETIME NOT NULL,
    "post_by" INTEGER NOT NULL,
    CONSTRAINT "Jobs_post_by_fkey" FOREIGN KEY ("post_by") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Jobs" ("description", "name") SELECT "description", "name" FROM "Jobs";
DROP TABLE "Jobs";
ALTER TABLE "new_Jobs" RENAME TO "Jobs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
