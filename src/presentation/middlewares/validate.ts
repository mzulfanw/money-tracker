import { ZodSchema } from 'zod';
import type { ValidationTargets } from 'hono';
import { zValidator as zv } from '@hono/zod-validator';

export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          error: result.error.issues.reduce(
            (acc, issue) => {
              if (issue.path.length > 0) {
                const key = issue.path.join('.');
                acc[key] = issue.message;
              }
              return acc;
            },
            {} as Record<string, string>
          ),
        },
        400
      );
    }
  });
