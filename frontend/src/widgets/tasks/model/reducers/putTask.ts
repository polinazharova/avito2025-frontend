import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPut, ApiPutError } from '../../../../app/api/apiPut';

export interface PutTask {
  assigneeId: number;
  description: string;
  priority: string;
  status: string;
  title: string;
}

interface Response {
  message: string;
}

const putTask = createAsyncThunk<
  Response,
  { url: string; payload: PutTask },
  { rejectValue: ApiPutError }
>('tasks/putTask', async ({ url, payload }, { rejectWithValue }) => {
  try {
    return await apiPut<Response, PutTask>(url, payload);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: error?.error,
    });
  }
});

export { putTask };
