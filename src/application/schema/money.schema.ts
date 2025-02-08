import { z } from 'zod';

export const addMoneySchema = z.object({
  amount: z.number().min(1, { message: 'Amount must be greater than 0' }),
});

export const addSpendSchema = z.object({
  amount: z.number().min(1, { message: 'Amount must be greater than 0' }),
  reason: z.string().min(1, { message: 'Reason must not be empty' }),
});
