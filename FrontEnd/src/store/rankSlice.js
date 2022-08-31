import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentRank: {},
};

const createStudentSlice = createSlice({
  name: 'Student',
  initialState,
  reducers: {
    studentRankHandler: (state, action) => {
      state.studentRank = action.payload;
    },
  },
});

export const { studentRankHandler } = createStudentSlice.actions;

export default createStudentSlice.reducer;
