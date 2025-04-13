import { createSlice } from '@reduxjs/toolkit';

interface TasksFilterState {
  board: string | null;
  status: string | null;
}

const initialState: TasksFilterState = {
  board: null,
  status: null,
};

const tasksFilterSlice = createSlice({
  name: 'tasksFilter',
  initialState: initialState,
  reducers: {
    setBoardFilter: (state, action) => {
      state.board = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setBoardFilter, setStatusFilter } = tasksFilterSlice.actions;
export default tasksFilterSlice.reducer;
