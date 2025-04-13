import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, ApiGetError } from '../../../../app/api/apiGet';

export interface Task {
  assignee: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
  };
  boardId: number;
  boardName: string;
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}

const getTasks = createAsyncThunk<
  Task[],
  { url: string; signal: AbortSignal },
  { rejectValue: ApiGetError }
>('tasks/getTasks', async ({ url, signal }, { rejectWithValue }) => {
  try {
    return await apiGet<Task[]>(url, signal);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: error.error,
    });
  }
});

export { getTasks };
