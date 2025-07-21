/*
  Warnings:

  - You are about to drop the column `balance` on the `UserAccount` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "balance",
DROP COLUMN "name",
ALTER COLUMN "currency" SET DEFAULT 'INR';
