import { createSlice } from '@reduxjs/toolkit';

interface DraftState {
  draftTitle: string | null;
  draftDescription: string | null;
}

const initialState: DraftState = {
  draftTitle: null,
  draftDescription: null,
};

const draftSlice = createSlice({
  name: 'draft',
  initialState: initialState,
  reducers: {
    setDraftTitle: (state, action) => {
      state.draftTitle = action.payload;
    },
    setDraftDesc: (state, action) => {
      state.draftDescription = action.payload;
    },
  },
});

export const { setDraftTitle, setDraftDesc } = draftSlice.actions;
export default draftSlice.reducer;
