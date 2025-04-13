import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, ApiGetError } from '../../../../app/api/apiGet';

export interface User {
  avatarUrl: string;
  description: string;
  email: string;
  fullName: string;
  id: number;
  tasksCount: number;
  teamId: number;
  teamName: string;
}

export const getUsers = createAsyncThunk<
  User[],
  { url: string; signal: AbortSignal },
  { rejectValue: ApiGetError }
>('users/getUsers', async ({ url, signal }, { rejectWithValue }) => {
  try {
    return await apiGet<User[]>(url, signal);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: error?.error,
    });
  }
});
