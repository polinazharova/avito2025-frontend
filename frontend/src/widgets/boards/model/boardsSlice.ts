import { createSlice } from '@reduxjs/toolkit';
import { getBoards } from './reducers/getBoards';
import { getBoardTasks } from './reducers/getBoardTasks';
import { Board } from './reducers/getBoards';
import { Task } from '../../tasks/model/reducers/getTasks';

interface BoardsState {
  boards: {
    boards: Board[] | null;
    status: string;
    error: null | string;
  };
  boardTasks: {
    boardTasks: Task[] | null;
    status: string;
    error: null | string;
  };
}

const initialState: BoardsState = {
  boards: {
    boards: null,
    status: 'idle',
    error: null,
  },
  boardTasks: {
    boardTasks: null,
    status: 'idle',
    error: null,
  },
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState: initialState,
  reducers: {
    updateBoardTasks: (state, action) => {
      const tasks = state.boardTasks.boardTasks ? [...state.boardTasks.boardTasks] : [];
      const taskIndex = tasks.findIndex((task) => Number(task.id) === Number(action.payload.id));
      if (taskIndex !== -1) {
        state.boardTasks.boardTasks = tasks.map((task, index) =>
          index === taskIndex ? { ...task, ...action.payload } : task,
        );
      } else {
        state.boardTasks.boardTasks = [...tasks, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.boards.status = 'loading';
      state.boards.error = null;
    });
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards.boards = action.payload;
      state.boards.status = 'succeeded';
    });
    builder.addCase(getBoards.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.boards.error = message;
      state.boards.status = 'rejected';
    });

    builder.addCase(getBoardTasks.pending, (state) => {
      state.boardTasks.status = 'loading';
      state.boardTasks.error = null;
    });
    builder.addCase(getBoardTasks.fulfilled, (state, action) => {
      state.boardTasks.boardTasks = action.payload;
      state.boardTasks.status = 'succeeded';
    });
    builder.addCase(getBoardTasks.rejected, (state, action) => {
      if (action.payload?.message === 'AbortError') {
        return;
      }
      const message = action.payload?.message as string;
      state.boardTasks.error = message;
      state.boardTasks.status = 'rejected';
    });
  },
});

export const { updateBoardTasks } = boardsSlice.actions;
export default boardsSlice.reducer;
