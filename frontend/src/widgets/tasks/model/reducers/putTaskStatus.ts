import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPut, ApiPutError } from '../../../../app/api/apiPut';

interface Status {
  status: string;
}

interface Response {
  message: string;
}

const putTaskStatus = createAsyncThunk<
  Response,
  { url: string; payload: Status },
  { rejectValue: ApiPutError }
>('tasks/putTaskStatus', async ({ url, payload }, { rejectWithValue }) => {
  try {
    return await apiPut<Response, Status>(url, payload);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: error?.error,
    });
  }
});

export { putTaskStatus };
