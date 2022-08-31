import { configureStore } from '@reduxjs/toolkit';

import rankSliceReducer from './rankSlice';

const store = configureStore({
  reducer: rankSliceReducer,
});

export default store;
