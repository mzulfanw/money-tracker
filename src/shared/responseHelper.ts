type ApiResponse<T> = {
  code: number;
  data: T | null;
  message?: string;
  error: { message: string; details?: Record<string, string> } | null;
};

export const createResponse = <T>(
  code: number,
  data: T | null = null,
  message: string = '',
  error: any = null
): ApiResponse<T> => {
  return {
    code,
    data,
    message,
    error: error
      ? {
          message: error.message || 'An error occurred',
          details: error.details || undefined,
        }
      : null,
  };
};
