/*
  Warnings:

  - You are about to drop the column `aboutMe` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER,
    "photo" TEXT,
    "bgPhoto" TEXT,
    "status" TEXT,
    "sex" TEXT,
    "email" TEXT NOT NULL,
    "vk" TEXT,
    "github" TEXT
);
INSERT INTO "new_User" ("age", "bgPhoto", "email", "github", "name", "password", "photo", "sex", "userId", "vk") SELECT "age", "bgPhoto", "email", "github", "name", "password", "photo", "sex", "userId", "vk" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
