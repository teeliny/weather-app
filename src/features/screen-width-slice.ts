import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SizeState } from '../typings/weather.typing';

const initialState: SizeState = {
  mobile_view: false,
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    toggleView(state, action: PayloadAction<boolean>) {
      state.mobile_view = action.payload;
    },
  },
});

export const { toggleView } = screenSlice.actions;
export default screenSlice.reducer;