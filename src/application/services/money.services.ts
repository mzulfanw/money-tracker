import { IMoney } from '../interfaces/money.interfaces';

export class MoneyServices {
  private _money: IMoney;

  constructor(money: IMoney) {
    this._money = money;
  }

  getBalance(): number {
    return this._money.getAmount();
  }

  addMoney(value: number): void {
    this._money.addMoney(value);
  }

  spendMoney(value: number, reason: string): void {
    this._money.spendMoney(value, reason);
  }

  getListSpend(): string[] {
    return this._money.getListSpend();
  }
}
