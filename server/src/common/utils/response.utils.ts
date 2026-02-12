export interface SuccessResponse<T = any> {
  status: 'success';
  message: string;
  data?: T;
}

export interface ErrorResponse {
  status: 'error';
  message: string;
  errors?: string;
}

export const successResponse = <T>(
  message: string,
  data?: T,
): SuccessResponse<T> => {
  return {
    status: 'success',
    message,
    data,
  };
};

export const errorResponse = (
  message: string,
  errors?: string,
): ErrorResponse => {
  return {
    status: 'error',
    message,
    errors,
  };
};
