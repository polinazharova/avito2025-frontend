import axios from 'axios';

export interface ApiGetError {
  message: string;
  error?: string;
}

export const apiGet = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
  try {
    const response = await axios.get<{ data: T }>(url, { signal });
    return response.data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw {
        message: 'AbortError',
      } satisfies ApiGetError;
    }
    if (axios.isAxiosError(error)) {
      const apiError: ApiGetError = {
        message: error.response?.data?.message || error.message,
        error: error.response?.data?.error,
      };
      throw apiError;
    }
    throw {
      message: error instanceof Error ? error.message : 'Unknown error',
    } satisfies ApiGetError;
  }
};
