import { z } from 'zod';

export const schemaAuth = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(1, { message: 'Password must be provided' }),
});
