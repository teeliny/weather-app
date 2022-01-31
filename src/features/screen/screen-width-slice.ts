import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SizeState } from './screen.typing';

const initialState: SizeState = {
  size_view: 1,
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    toggleView(state, action: PayloadAction<number>) {
      state.size_view = action.payload;
    },
  },
});

export const { toggleView } = screenSlice.actions;
export default screenSlice.reducer;