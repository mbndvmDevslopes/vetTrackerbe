-- CreateTable
CREATE TABLE "Dogs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "dogsConditions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conditionId" TEXT NOT NULL,
    "dogId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Conditions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conditionName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
