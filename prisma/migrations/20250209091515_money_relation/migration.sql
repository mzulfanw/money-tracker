/*
  Warnings:

  - Added the required column `authId` to the `money` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "money" ADD COLUMN     "authId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "money" ADD CONSTRAINT "money_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
