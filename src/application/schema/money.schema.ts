import { z } from 'zod';

export const schemaAmount = z.object({
  amount: z.number().min(1, { message: 'Amount must be greater than 0' }),
  spendType: z.string().min(1, { message: 'Spend type must be provided' }),
});
