import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, ApiGetError } from '../../../../app/api/apiGet';

export interface Board {
  description: string;
  id: number;
  name: string;
  taskCount: number;
}

export const getBoards = createAsyncThunk<
  Board[],
  { url: string; signal: AbortSignal },
  { rejectValue: ApiGetError }
>('boards/getBoards', async ({ url, signal }, { rejectWithValue }) => {
  try {
    return await apiGet<Board[]>(url, signal);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: error?.error,
    });
  }
});
