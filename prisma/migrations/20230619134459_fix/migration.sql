-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER,
    "photo" TEXT,
    "bgPhoto" TEXT,
    "aboutMe" TEXT,
    "sex" TEXT,
    "email" TEXT NOT NULL,
    "vk" TEXT,
    "github" TEXT
);
INSERT INTO "new_User" ("aboutMe", "age", "bgPhoto", "email", "github", "name", "password", "photo", "sex", "userId", "vk") SELECT "aboutMe", "age", "bgPhoto", "email", "github", "name", "password", "photo", "sex", "userId", "vk" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
