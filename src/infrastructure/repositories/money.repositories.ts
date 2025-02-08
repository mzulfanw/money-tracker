import { prisma } from '../db/prisma';
import { IMoney } from '../../application/interfaces/money.interfaces';
import { Money } from '@prisma/client';

export class MoneyRepositories implements IMoney {
  async getAmount(): Promise<Money[]> {
    return await prisma.money.findMany();
  }

  async postAmount(value: number, spendType: string): Promise<void> {
    await prisma.money.create({
      data: {
        amount: value,
        spendType: spendType,
      },
    });
  }

  async getAmountById(id: number): Promise<Money | null> {
    return await prisma.money.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateAmount(
    id: number,
    value: number,
    spendType: string
  ): Promise<void> {
    await prisma.money.update({
      where: {
        id: id,
      },
      data: {
        amount: value,
        spendType: spendType,
      },
    });
  }

  async deleteAmountById(id: number): Promise<void> {
    await prisma.money.delete({
      where: {
        id: id,
      },
    });
  }
}
