import { createSlice } from '@reduxjs/toolkit';

const defaultFilterState = {
  status: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: defaultFilterState,
  reducers: {
    setFilter(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
