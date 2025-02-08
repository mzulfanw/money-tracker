-- CreateTable
CREATE TABLE "money" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "spendType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "money_pkey" PRIMARY KEY ("id")
);
