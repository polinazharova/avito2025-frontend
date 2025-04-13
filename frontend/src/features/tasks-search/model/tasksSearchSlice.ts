import { createSlice } from '@reduxjs/toolkit';

interface TasksSearchState {
  text: string | null;
}

const initialState: TasksSearchState = {
  text: null,
};

const tasksSearchSlice = createSlice({
  name: 'tasksSearch',
  initialState: initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setSearchText } = tasksSearchSlice.actions;
export default tasksSearchSlice.reducer;
