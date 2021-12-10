import { configureStore } from '@reduxjs/toolkit';

import {  apiSlice } from '../features/weather-api-slice';
import screenReducer from '../features/screen-width-slice';

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
