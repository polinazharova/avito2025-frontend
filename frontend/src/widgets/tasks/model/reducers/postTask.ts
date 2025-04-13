import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPost, ApiPostError } from '../../../../app/api/apiPost';

export interface PostTask {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: string;
  title: string;
}
interface Response {
  id: number;
}

const postTask = createAsyncThunk<
  Response,
  { url: string; payload: PostTask },
  { rejectValue: ApiPostError }
>('tasks/postTask', async ({ url, payload }, { rejectWithValue }) => {
  try {
    return await apiPost<Response, PostTask>(url, payload);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      error: error?.error,
    });
  }
});

export { postTask };
