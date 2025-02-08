import { IMoney } from '../application/interfaces/money.interfaces';

export class Money implements IMoney {
  private _amount: number;
  private _spentAmount: number;
  private _listOfSpent: string[] = [];

  constructor(amount: number, spentAmount: number) {
    this._amount = amount;
    this._spentAmount = spentAmount;
  }

  public getAmount(): number {
    return this._amount;
  }

  spendMoney(value: number, reason: string) {
    this._amount -= value;
    this._spentAmount += value;
    this._listOfSpent.push(reason);
  }

  addMoney(value: number) {
    this._amount += value;
  }

  public getListSpend(): string[] {
    return this._listOfSpent;
  }
}
