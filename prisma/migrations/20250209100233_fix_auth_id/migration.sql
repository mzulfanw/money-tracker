/*
  Warnings:

  - You are about to drop the column `authId` on the `money` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "money" DROP CONSTRAINT "money_authId_fkey";

-- AlterTable
ALTER TABLE "money" DROP COLUMN "authId";
