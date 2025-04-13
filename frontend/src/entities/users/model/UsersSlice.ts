import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../../widgets/tasks/model/reducers/getTasks';
import { User } from './reducers/getUsers';
import { getUsers } from './reducers/getUsers';
import { getUserTasks } from './reducers/getUserTasks';

interface UsersState {
  users: {
    users: User[] | null;
    status: string;
    error: null | string;
  };
  userTasks: {
    userTasks: Task[] | null;
    status: string;
    error: null | string;
  };
}

const initialState: UsersState = {
  users: {
    users: null,
    status: 'idle',
    error: null,
  },
  userTasks: {
    userTasks: null,
    status: 'idle',
    error: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.users.status = 'loading';
      state.users.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users.users = action.payload;
      state.users.status = 'succeeded';
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.users.error = message;
      state.users.status = 'rejected';
    });

    builder.addCase(getUserTasks.pending, (state) => {
      state.userTasks.status = 'loading';
      state.userTasks.error = null;
    });
    builder.addCase(getUserTasks.fulfilled, (state, action) => {
      state.userTasks.userTasks = action.payload;
      state.userTasks.status = 'succeeded';
    });
    builder.addCase(getUserTasks.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.userTasks.error = message;
      state.userTasks.status = 'rejected';
    });
  },
});

export default usersSlice.reducer;
