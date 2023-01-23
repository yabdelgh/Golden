/*
  Warnings:

  - Added the required column `blueCornerScore` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redCornerScore` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "blueCornerScore" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "redCornerScore" INTEGER NOT NULL;
