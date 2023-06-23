/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "bgPhoto" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "vk" TEXT NOT NULL,
    "github" TEXT NOT NULL
);
INSERT INTO "new_User" ("aboutMe", "age", "bgPhoto", "email", "github", "name", "photo", "sex", "userId", "vk") SELECT "aboutMe", "age", "bgPhoto", "email", "github", "name", "photo", "sex", "userId", "vk" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
