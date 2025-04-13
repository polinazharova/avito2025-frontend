import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, ApiGetError } from '../../../../app/api/apiGet';
import { Task } from '../../../tasks/model/reducers/getTasks';

const getBoardTasks = createAsyncThunk<
  Task[],
  { url: string; signal: AbortSignal },
  { rejectValue: ApiGetError }
>('boards/getBoardTasks', async ({ url, signal }, { rejectWithValue }) => {
  try {
    return await apiGet<Task[]>(url, signal);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: error?.error,
    });
  }
});

export { getBoardTasks };
