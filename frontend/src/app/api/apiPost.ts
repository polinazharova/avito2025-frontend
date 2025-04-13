import axios from 'axios';

export interface ApiPostError {
  message: string;
  error?: string;
}

export const apiPost = async <T, D>(url: string, payload: D): Promise<T> => {
  try {
    const response = await axios.post<{ data: T }>(url, payload);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiPostError = {
        message: error.response?.data?.message || error.message,
        error: error.response?.data?.error,
      };
      throw apiError;
    }
    throw {
      message: error instanceof Error ? error.message : 'Unknown error',
    } satisfies ApiPostError;
  }
};
