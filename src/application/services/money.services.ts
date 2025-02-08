import { IMoney } from '../interfaces/money.interfaces';
import { Money } from '@prisma/client';

export class MoneyServices {
  private _money: IMoney;

  constructor(money: IMoney) {
    this._money = money;
  }

  async getAmount(): Promise<Money[]> {
    return this._money.getAmount();
  }

  async postAmount(value: number, spendType: string): Promise<void> {
    await this._money.postAmount(value, spendType);
  }

  async getAmountById(id: number): Promise<Money | null> {
    return this._money.getAmountById(id);
  }

  async updateAmount(
    id: number,
    value: number,
    spendType: string
  ): Promise<void> {
    await this._money.updateAmount(id, value, spendType);
  }

  async deleteAmountById(id: number): Promise<void> {
    await this._money.deleteAmountById(id);
  }
}
