/*
  Warnings:

  - You are about to drop the column `age` on the `Dogs` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dogs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "weight" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "dateVisited" DATETIME NOT NULL,
    "notes" TEXT NOT NULL,
    "vetId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "ownerName" TEXT NOT NULL,
    CONSTRAINT "Dogs_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Dogs" ("birthDate", "breed", "dateVisited", "id", "isActive", "name", "notes", "ownerName", "sex", "updatedAt", "vetId", "weight") SELECT "birthDate", "breed", "dateVisited", "id", "isActive", "name", "notes", "ownerName", "sex", "updatedAt", "vetId", "weight" FROM "Dogs";
DROP TABLE "Dogs";
ALTER TABLE "new_Dogs" RENAME TO "Dogs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
