type ApiResponse<T> = {
  code: number;
  data: T | null;
  error: { message: string; details?: Record<string, string> } | null;
};

export const createResponse = <T>(
  code: number,
  data: T | null = null,
  error: any = null
): ApiResponse<T> => {
  return {
    code,
    data,
    error: error
      ? {
          message: error.message || 'An error occurred',
          details: error.details || undefined,
        }
      : null,
  };
};
