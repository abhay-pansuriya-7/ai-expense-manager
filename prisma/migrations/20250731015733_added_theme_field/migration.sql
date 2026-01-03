/*
  Warnings:

  - The `theme` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserTheme" AS ENUM ('DARK', 'LIGHT', 'SYSTEM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "colorTheme" TEXT NOT NULL DEFAULT 'blue',
DROP COLUMN "theme",
ADD COLUMN     "theme" "UserTheme" NOT NULL DEFAULT 'LIGHT';
