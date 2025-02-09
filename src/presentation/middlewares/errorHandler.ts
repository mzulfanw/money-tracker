import { Context } from 'hono';
import { ZodError } from 'zod';

export const errorHandler = (error: unknown, c: Context) => {
  // if (error instanceof ZodError) {
  //   return c.json(
  //     {
  //       success: false,
  //       message: 'Validation failed',
  //       errors: error.errors.map(err => ({
  //         field: err.path[0],
  //         message: err.message,
  //       })),
  //     },
  //     400
  //   );
  // }

  if (error instanceof Error) {
    return c.json(
      {
        success: false,
        message: error.message || 'Internal Server Error',
      },
      500
    );
  }

  return c.json(
    {
      success: false,
      message: 'An unexpected error occurred',
    },
    500
  );
};
