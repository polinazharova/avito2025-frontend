import axios from 'axios';

export interface ApiPutError {
  message: string;
  error?: string;
}

export const apiPut = async <T, D>(url: string, payload: D): Promise<T> => {
  try {
    const response = await axios.put<{ data: T }>(url, payload);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiPutError = {
        message: error.response?.data?.message || error.message,
        error: error.response?.data?.error,
      };
      throw apiError;
    }
    throw {
      message: error instanceof Error ? error.message : 'Unknown error',
    } satisfies ApiPutError;
  }
};
