import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, ApiGetError } from '../../../../app/api/apiGet';
import { Task } from '../../../../widgets/tasks/model/reducers/getTasks';

const getUserTasks = createAsyncThunk<Task[], string, { rejectValue: ApiGetError }>(
  'users/getUserTasks',
  async (url, { rejectWithValue }) => {
    try {
      return await apiGet<Task[]>(url);
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: error?.error,
      });
    }
  },
);

export { getUserTasks };
