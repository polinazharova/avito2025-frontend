import { getTask } from './reducers/getTask';
import { getTasks, Task } from './reducers/getTasks';
import { postTask } from './reducers/postTask';
import { putTask } from './reducers/putTask';
import { putTaskStatus } from './reducers/putTaskStatus';
import { createSlice } from '@reduxjs/toolkit';

interface TasksState {
  tasks: {
    tasks: Task[] | null;
    status: string;
    error: null | string;
  };
  task: {
    task: Task | null;
    status: string;
    error: null | string;
  };
  taskCreation: {
    id: number | null;
    status: string;
    error: null | string;
  };
  taskUpdate: {
    message: string | null;
    status: string;
    error: null | string;
  };
  taskUpdateStatus: {
    message: string | null;
    status: string;
    error: null | string;
  };
}

const initialState: TasksState = {
  tasks: {
    tasks: null,
    status: 'idle',
    error: null,
  },
  task: {
    task: null,
    status: 'idle',
    error: null,
  },
  taskCreation: {
    id: null,
    status: 'idle',
    error: null,
  },
  taskUpdate: {
    message: null,
    status: 'idle',
    error: null,
  },
  taskUpdateStatus: {
    message: null,
    status: 'idle',
    error: null,
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    pushTask: (state, action) => {
      state.tasks.tasks
        ? state.tasks.tasks.push(action.payload)
        : (state.tasks.tasks = [action.payload]);
    },
    updateTask: (state, action) => {
      const tasks = state.tasks.tasks ? [...state.tasks.tasks] : [];
      const taskIndex = tasks.findIndex((task) => Number(task.id) === Number(action.payload.id));
      if (taskIndex !== -1) {
        state.tasks.tasks = tasks.map((task, index) =>
          index === taskIndex ? { ...task, ...action.payload } : task,
        );
      } else {
        state.tasks.tasks = [...tasks, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.tasks.status = 'loading';
      state.tasks.error = null;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks.tasks = action.payload;
      state.tasks.status = 'succeeded';
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.tasks.error = message;
      state.tasks.status = 'rejected';
    });

    builder.addCase(getTask.pending, (state) => {
      state.task.status = 'loading';
      state.task.error = null;
    });
    builder.addCase(getTask.fulfilled, (state, action) => {
      state.task.task = action.payload;
      state.task.status = 'succeeded';
    });
    builder.addCase(getTask.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.task.error = message;
      state.task.status = 'rejected';
    });

    builder.addCase(postTask.pending, (state) => {
      state.taskCreation.status = 'loading';
      state.taskCreation.error = null;
      state.taskUpdate.status = 'idle';
    });
    builder.addCase(postTask.fulfilled, (state, action) => {
      state.taskCreation.id = action.payload.id;
      state.taskCreation.status = 'succeeded';
    });
    builder.addCase(postTask.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.taskCreation.error = message;
      state.taskCreation.status = 'rejected';
    });

    builder.addCase(putTask.pending, (state) => {
      state.taskUpdate.status = 'loading';
      state.taskUpdate.error = null;
      state.taskCreation.status = 'idle';
    });
    builder.addCase(putTask.fulfilled, (state, action) => {
      state.taskUpdate.message = action.payload?.message;
      state.taskUpdate.status = 'succeeded';
    });
    builder.addCase(putTask.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.taskUpdate.error = message;
      state.taskUpdate.status = 'rejected';
    });

    builder.addCase(putTaskStatus.pending, (state) => {
      state.taskUpdateStatus.status = 'loading';
      state.taskUpdateStatus.error = null;
    });
    builder.addCase(putTaskStatus.fulfilled, (state, action) => {
      state.taskUpdateStatus.message = action.payload?.message;
      state.taskUpdateStatus.status = 'succeeded';
    });
    builder.addCase(putTaskStatus.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.taskUpdateStatus.error = message;
      state.taskUpdateStatus.status = 'rejected';
    });
  },
});

export const { pushTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
