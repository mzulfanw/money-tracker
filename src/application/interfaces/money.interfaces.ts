export interface IMoney {
  getAmount(): number;
  addMoney(value: number): void;
  spendMoney(value: number, reason: string): void;
  getListSpend(): string[];
}
