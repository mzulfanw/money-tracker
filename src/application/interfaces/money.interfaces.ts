import { Money } from '@prisma/client';

export interface IMoney {
  getAmount(): Promise<Money[]>;
  postAmount(value: number, spendType: string): Promise<void>;
  getAmountById(id: number): Promise<Money | null>;
  updateAmount(id: number, value: number, spendType: string): Promise<void>;
  deleteAmountById(id: number): Promise<void>;
}
