import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, ApiGetError } from '../../../../app/api/apiGet';
import { Task } from './getTasks';

const getTask = createAsyncThunk<Task, string, { rejectValue: ApiGetError }>(
  'tasks/getTask',
  async (url, { rejectWithValue }) => {
    try {
      return await apiGet<Task>(url);
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: error?.error,
      });
    }
  },
);

export { getTask };
